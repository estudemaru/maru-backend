import test from "node:test";
import assert from "node:assert/strict";
import { createMaruHandler } from "../supabase/functions/maru-api/index.js";
import { createAuth } from "../supabase/functions/maru-api/auth.js";

const browser = "browser-5115a7df-2bfc-494c-8704-b757b724c723";

test("Edge API keeps the browser contract and rejects stale account writes", async () => {
  const calls = [];
  const handler = createMaruHandler({
    repository: {
      async read(id) { calls.push(["read", id]); return { xp: { total: 20 } }; },
      async write(id, snapshot) { calls.push(["write", id, snapshot]); return snapshot; }
    },
    auth: {
      googleEnabled: true,
      async session(request) {
        return { user: request.headers.has("x-test-account") ? { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", name: "Pessoa", email: "pessoa@example.test" } : null, access: "", cookies: [] };
      },
      assertSameOrigin(request) {
        if (request.headers.get("origin") !== "https://maru.example") throw Object.assign(new Error("Origem inválida"), { status: 403 });
      }
    },
    speech: { prepare: async () => ({ url: "https://audio1.tts.quest/v1/data/abc/audio.mp3s" }) }
  });
  const base = "https://example.supabase.co/functions/v1/maru-api/api";
  assert.equal((await (await handler(new Request(base + "/health"))).json()).ok, true);
  assert.equal((await (await handler(new Request(base + "/content"))).json()).lessons.length, 40);
  const audio = await handler(new Request(base + "/audio", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: "こんにちは" })
  }));
  assert.equal(audio.status, 200);
  assert.equal((await audio.json()).url, "https://audio1.tts.quest/v1/data/abc/audio.mp3s");
  assert.equal((await handler(new Request(base + "/audio"))).status, 405);
  assert.equal((await handler(new Request(base + "/missing"))).status, 404);
  const guest = await handler(new Request(base + "/progress", { headers: { "x-maru-user": browser } }));
  assert.equal((await guest.json()).xp.total, 20);
  assert.deepEqual(calls[0], ["read", browser]);
  const missing = await handler(new Request(base + "/progress"));
  assert.equal(missing.status, 400);
  const badOrigin = await handler(new Request(base + "/progress", {
    method: "PUT", headers: { "x-maru-user": browser, origin: "https://other.example" }, body: "{}"
  }));
  assert.equal(badOrigin.status, 403);
  const stale = await handler(new Request(base + "/progress", {
    method: "PUT", headers: { "x-test-account": "1", "x-maru-account": "other" }, body: "{}"
  }));
  assert.equal(stale.status, 409);
  const saved = await handler(new Request(base + "/progress", {
    method: "PUT", headers: { "x-test-account": "1", "x-maru-account": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", origin: "https://maru.example" },
    body: JSON.stringify({ xp: { total: 40 } })
  }));
  assert.equal(saved.status, 200);
  assert.equal(calls.at(-1)[1], "account:aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
});

test("Supabase Auth login uses PKCE and keeps provider tokens in HttpOnly cookies", async () => {
  const requests = [];
  const auth = createAuth({
    supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://maru.example", googleEnabled: true,
    fetchImpl: async (input, options) => {
      requests.push({ url: String(input), options });
      if (String(input).includes("grant_type=pkce")) return Response.json({ access_token: "aaa.bbb.ccc", refresh_token: "r".repeat(40), expires_in: 3600 });
      if (String(input).endsWith("/user")) return Response.json({ id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", email: "pessoa@example.test", user_metadata: { name: "Pessoa" } });
      return Response.json({});
    }
  });
  const login = await auth.begin();
  const url = new URL(login.url);
  assert.equal(url.searchParams.get("provider"), "google");
  assert.equal(url.searchParams.get("code_challenge_method"), "s256");
  assert.equal(url.searchParams.get("redirect_to"), "https://maru.example/api/auth/google/callback");
  const verifier = login.cookies[0].match(/maru_oauth=([^;]+)/)[1];
  const callback = await auth.callback(new Request("https://maru.example/api/auth/google/callback?code=code", {
    headers: { cookie: `maru_oauth=${verifier}` }
  }), new URLSearchParams("code=code"));
  assert.ok(callback.cookies.every(value => value.includes("HttpOnly")));
  assert.ok(callback.cookies.every(value => value.includes("Secure")));
  assert.equal(JSON.parse(requests[0].options.body).code_verifier, verifier);
  const session = await auth.session(new Request("https://maru.example/api/account", { headers: { cookie: "maru_access=aaa.bbb.ccc" } }));
  assert.equal(session.user.email, "pessoa@example.test");
});

test("email account routes validate origin and keep Supabase sessions in HttpOnly cookies", async () => {
  const calls = [];
  const auth = createAuth({
    supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://maru.example",
    fetchImpl: async (input, options) => {
      calls.push({ url: String(input), options });
      if (String(input).includes("grant_type=password") || String(input).includes("grant_type=refresh_token")) {
        return Response.json({ access_token: "aaa.bbb.ccc", refresh_token: "r".repeat(40), expires_in: 3600,
          user: { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", email: "pessoa@example.test" } });
      }
      return Response.json({});
    }
  });
  const handler = createMaruHandler({ auth, repository: {}, speech: {} });
  const base = "https://example.supabase.co/functions/v1/maru-api/api/auth/email";
  const post = (path, body, origin = "https://maru.example") => handler(new Request(base + path, {
    method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body)
  }));
  assert.equal((await post("/signup", { email: " pessoa@example.test ", password: "password123" })).status, 200);
  assert.match(calls[0].url, /signup\?redirect_to=https%3A%2F%2Fmaru\.example/);
  assert.equal(JSON.parse(calls[0].options.body).email, "pessoa@example.test");
  assert.equal((await post("/signup", { email: "pessoa@example.test", password: "short" })).status, 400);
  assert.equal((await post("/login", { email: "pessoa@example.test", password: "password123" }, "https://evil.example")).status, 403);
  const login = await post("/login", { email: "pessoa@example.test", password: "password123" });
  assert.equal(login.status, 200);
  assert.equal((await login.json()).user.email, "pessoa@example.test");
  assert.ok(login.headers.get("set-cookie").includes("HttpOnly"));
  assert.ok(login.headers.get("set-cookie").includes("Secure"));
  assert.equal((await post("/recover", { email: "pessoa@example.test" })).status, 200);
  assert.match(calls.at(-1).url, /recover\?redirect_to=https%3A%2F%2Fmaru\.example/);
  assert.equal((await post("/complete", { refreshToken: "v1." + "r".repeat(37) })).status, 200);
});
