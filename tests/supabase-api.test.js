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
  assert.equal(JSON.parse(requests.find(request => request.url.includes("grant_type=pkce")).options.body).code_verifier, verifier);
  const session = await auth.session(new Request("https://maru.example/api/account", { headers: { cookie: "maru_access=aaa.bbb.ccc" } }));
  assert.equal(session.user.email, "pessoa@example.test");
});

test("Supabase provider settings enable Google and Discord without separate app switches", async () => {
  let settingsReads = 0, time = 100, available = true;
  const auth = createAuth({
    supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://estudemaru.com.br",
    allowedOrigins: ["https://www.estudemaru.com.br"], now: () => time,
    fetchImpl: async (input) => {
      assert.equal(String(input), "https://example.supabase.co/auth/v1/settings");
      settingsReads++;
      return Response.json({ external: { google: available, discord: available, email: true } });
    }
  });
  const handler = createMaruHandler({ auth, repository: {}, speech: {} });
  const account = await handler(new Request("https://example.supabase.co/functions/v1/maru-api/api/account"));
  assert.deepEqual(await account.json(), { user: null, googleEnabled: true, discordEnabled: true, emailEnabled: true });
  for (const provider of ["google", "discord"]) {
    const response = await handler(new Request("https://example.supabase.co/functions/v1/maru-api/api/auth/" + provider, {
      headers: { referer: "https://www.estudemaru.com.br/" }
    }));
    assert.equal(response.status, 303);
    const url = new URL(response.headers.get("location"));
    assert.equal(url.origin, "https://example.supabase.co");
    assert.equal(url.searchParams.get("provider"), provider);
    assert.equal(url.searchParams.get("redirect_to"), "https://www.estudemaru.com.br/api/auth/" + provider + "/callback");
    assert.equal(url.searchParams.get("code_challenge_method"), "s256");
    assert.match(response.headers.get("set-cookie"), /HttpOnly; SameSite=Lax; Max-Age=600; Secure/);
  }
  assert.equal(settingsReads, 1);
  available = false; time += 300001;
  await assert.rejects(() => auth.begin("discord"), error => error.status === 503);
  assert.equal(settingsReads, 2);
  await assert.rejects(() => auth.begin("unknown"), error => error.status === 400);
});

test("OAuth callbacks clear failed PKCE cookies and exchange Discord sessions on the server", async () => {
  let exchangedVerifier;
  const auth = createAuth({
    supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://estudemaru.com.br",
    allowedOrigins: ["https://www.estudemaru.com.br"],
    fetchImpl: async (input, options) => {
      if (String(input).endsWith("settings")) return Response.json({ external: { discord: true } });
      exchangedVerifier = JSON.parse(options.body).code_verifier;
      return Response.json({ access_token: "aaa.bbb.ccc", refresh_token: "r".repeat(40) });
    }
  });
  const handler = createMaruHandler({ auth, repository: {}, speech: {} });
  const begin = await auth.begin("discord", new Request("https://example.supabase.co/api/auth/discord", { headers: { referer: "https://www.estudemaru.com.br/" } }));
  const base = new URL(begin.url).searchParams.get("redirect_to");
  assert.equal(new URL(base).origin, "https://www.estudemaru.com.br");
  assert.ok(!begin.cookies[0].includes("Domain="));
  const failure = await handler(new Request(base + "?code=code"));
  assert.equal(failure.headers.get("location"), "/#/settings/login-failed");
  assert.match(failure.headers.get("set-cookie"), /maru_oauth=;.*Max-Age=0/);
  const success = await handler(new Request(base + "?code=code", { headers: { cookie: begin.cookies[0].split(";")[0] } }));
  assert.equal(success.headers.get("location"), "/#/settings/login-success");
  assert.match(success.headers.get("set-cookie"), /maru_access=aaa.bbb.ccc;.*HttpOnly/);
  assert.ok(!success.headers.get("location").includes("token"));
  assert.equal(exchangedVerifier, begin.cookies[0].split(";")[0].split("=")[1]);
});

test("disabled Supabase providers override legacy enabled switches, including after an outage", async () => {
  let time = 100, outage = false;
  const auth = createAuth({
    supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://estudemaru.com.br",
    googleEnabled: true, discordEnabled: true, now: () => time,
    fetchImpl: async () => {
      if (outage) throw new Error("offline");
      return Response.json({ external: { google: false, discord: false, email: true } });
    }
  });
  assert.deepEqual(await auth.capabilities(), { googleEnabled: false, discordEnabled: false, emailEnabled: true });
  for (const provider of ["google", "discord"]) await assert.rejects(() => auth.begin(provider), error => error.status === 503);
  time += 300001; outage = true;
  assert.equal((await auth.capabilities()).discordEnabled, false);
  await assert.rejects(() => auth.begin("google"), error => error.status === 503);
});

test("trusted custom domains work while foreign origins cannot write or redirect login", async () => {
  const auth = createAuth({
    supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://estudemaru.com.br",
    allowedOrigins: ["https://www.estudemaru.com.br"],
    fetchImpl: async () => Response.json({ external: { google: true } })
  });
  assert.doesNotThrow(() => auth.assertSameOrigin(new Request("https://example.supabase.co/api", { headers: { origin: "https://www.estudemaru.com.br" } })));
  assert.throws(() => auth.assertSameOrigin(new Request("https://example.supabase.co/api", { headers: { origin: "https://evil.example" } })), error => error.status === 403);
  assert.throws(() => auth.assertSameOrigin(new Request("https://example.supabase.co/api", { headers: { origin: "https://estudemaru.com.br", "sec-fetch-site": "cross-site" } })), error => error.status === 403);
  const login = await auth.begin("google", new Request("https://example.supabase.co/api", { headers: { referer: "https://evil.example/", "x-forwarded-host": "evil.example" } }));
  assert.equal(new URL(login.url).searchParams.get("redirect_to"), "https://estudemaru.com.br/api/auth/google/callback");
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

test('signup returns a cookie session when Supabase does not require confirmation', async () => {
  const auth = createAuth({supabaseUrl:'https://example.supabase.co',anonKey:'public-key',publicOrigin:'https://maru.example',fetchImpl:async()=>Response.json({access_token:'aaa.bbb.ccc',refresh_token:'r'.repeat(40),user:{id:'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',email:'pessoa@example.test'}})});
  const result=await auth.signUp(new Request('https://maru.example/api/auth/email/signup',{headers:{origin:'https://maru.example'}}),{email:'pessoa@example.test',password:'password123'});
  assert.equal(result.user.email,'pessoa@example.test');
  assert.equal(result.cookies.length,2);
  assert.ok(result.cookies.every(cookie=>cookie.includes('HttpOnly') && cookie.includes('Secure')));
});
test('recovery does not falsely claim delivery on SMTP failure or rate limits', async () => {
  for(const status of [429,500]) {
    const auth=createAuth({supabaseUrl:'https://example.supabase.co',anonKey:'public-key',publicOrigin:'https://maru.example',fetchImpl:async()=>Response.json({error:'mail failed'},{status})});
    await assert.rejects(()=>auth.recover(new Request('https://maru.example/api/auth/email/recover',{headers:{origin:'https://maru.example'}}),{email:'pessoa@example.test'}),error=>error.status===(status===429?429:503));
  }
});
