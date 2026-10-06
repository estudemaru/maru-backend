import test from "node:test";
import assert from "node:assert/strict";
import { createAuth } from "../supabase/functions/maru-api/auth.js";
import { createMaruHandler } from "../supabase/functions/maru-api/index.js";

const user = { id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", email: "pessoa@example.test" };
const refresh = "r".repeat(40);
const renewed = { access_token: "new.access.token", refresh_token: "s".repeat(40), expires_in: 3600, user };
const authWith = fetchImpl => createAuth({
  supabaseUrl: "https://example.supabase.co", anonKey: "public-key", publicOrigin: "https://maru.example", fetchImpl
});
const request = (pathname = "/account", options = {}) => new Request("https://maru.example/api" + pathname, {
  ...options, headers: { cookie: `maru_access=old.access.token; maru_refresh=${refresh}`, ...options.headers }
});

test("login and renewal persist across visits while access tokens remain short-lived", async () => {
  const auth = authWith(async input => String(input).endsWith("/user")
    ? Response.json({ code: "bad_jwt" }, { status: 401 }) : Response.json(renewed));
  const login = await auth.signIn(request("/auth/email/login", { headers: { origin: "https://maru.example" } }), {
    email: user.email, password: "password123"
  });
  const session = await auth.session(request());
  const reopened = await auth.session(new Request("https://maru.example/api/account", { headers: { cookie: `maru_refresh=${refresh}` } }));
  for (const result of [login, session, reopened]) {
    assert.equal(result.user.id, user.id);
    assert.match(result.cookies[0], /maru_access=new\.access\.token;.*Max-Age=3600/);
    assert.match(result.cookies[1], /maru_refresh=s+;.*Max-Age=31536000/);
    for (const value of result.cookies) assert.match(value, /HttpOnly; SameSite=Lax;.*Secure/);
  }
});

test("temporary access verification failures preserve cookies and never rotate a valid session", async () => {
  for (const status of [409, 429, 500, 502, 503]) {
    let calls = 0;
    const auth = authWith(async input => {
      calls++;
      assert.match(String(input), /\/user$/);
      return Response.json({ code: "temporarily_unavailable" }, { status });
    });
    await assert.rejects(auth.session(request()), error => error.status === 503);
    assert.equal(calls, 1);
  }
  const malformed = authWith(async () => Response.json({}));
  await assert.rejects(malformed.session(request()), error => error.status === 503);
  const offline = authWith(async () => { throw new TypeError("Network unavailable"); });
  await assert.rejects(offline.session(request()), error => error.status === 503);
});

test("refresh outages cannot clear login cookies or read and write an anonymous progress profile", async () => {
  for (const status of [400, 401, 409, 429, 500, 503]) {
    const auth = authWith(async input => String(input).endsWith("/user")
      ? Response.json({ code: "bad_jwt" }, { status: 401 })
      : Response.json({ code: status === 409 ? "conflict" : "unknown_failure" }, { status }));
    const handler = createMaruHandler({ auth, repository: {
      async read() { assert.fail("A temporary auth failure must not read guest progress"); },
      async write() { assert.fail("A temporary auth failure must not write guest progress"); }
    } });
    for (const [pathname, method] of [["/account", "GET"], ["/progress", "GET"], ["/progress", "PUT"]]) {
      const response = await handler(request(pathname, {
        method, headers: { origin: "https://maru.example", "x-maru-user": "browser-5115a7df-2bfc-494c-8704-b757b724c723", "x-maru-account": user.id },
        ...(method === "PUT" ? { body: "{}" } : {})
      }));
      assert.equal(response.status, 503);
      assert.equal(response.headers.get("set-cookie"), null);
    }
  }
});

test("malformed refresh responses and network failures keep credentials for a later retry", async () => {
  for (const reply of [
    () => Response.json({}),
    () => Response.json(null),
    () => Response.json([]),
    () => Response.json({ ...renewed, user: {} }),
    () => Response.json({ ...renewed, refresh_token: "invalid" }),
    () => new Response("not JSON", { status: 200 }),
    () => { throw new TypeError("Network unavailable"); }
  ]) {
    const auth = authWith(async input => String(input).endsWith("/user")
      ? Response.json({}, { status: 401 }) : reply());
    const handler = createMaruHandler({ auth, repository: {} });
    const response = await handler(request());
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("set-cookie"), null);
  }
});

test("confirmed revoked or expired sessions still clear cookies", async () => {
  const errors = ["refresh_token_not_found", "refresh_token_already_used", "session_not_found", "session_expired", "user_not_found", "user_banned"]
    .map(error_code => ({ error_code }));
  errors.push({ error_code: "validation_failed", msg: "Refresh token is not valid" });
  for (const error of errors) {
    const auth = authWith(async input => String(input).endsWith("/user")
      ? Response.json({}, { status: 401 }) : Response.json(error, { status: 400 }));
    const session = await auth.session(request());
    assert.equal(session.user, null);
    assert.equal(session.access, "");
    assert.equal(session.cookies.length, 2);
    for (const value of session.cookies) assert.match(value, /Max-Age=0/);
  }
});

test("an unrelated validation failure cannot end the session", async () => {
  const auth = authWith(async input => String(input).endsWith("/user")
    ? Response.json({}, { status: 401 }) : Response.json({ error_code: "validation_failed", msg: "Request could not be validated" }, { status: 400 }));
  await assert.rejects(auth.session(request()), error => error.status === 503);
});

test("concurrent requests share one renewal and completed tokens are not cached", async () => {
  let refreshCalls = 0, release, started;
  const gate = new Promise(resolve => { release = resolve; });
  const entered = new Promise(resolve => { started = resolve; });
  const auth = authWith(async input => {
    if (String(input).endsWith("/user")) return Response.json({}, { status: 401 });
    refreshCalls++; started(); await gate;
    return Response.json(renewed);
  });
  const pending = [auth.session(request()), auth.session(request())];
  await entered;
  release();
  const sessions = await Promise.all(pending);
  assert.equal(refreshCalls, 1);
  assert.deepEqual(sessions[0], sessions[1]);
  await auth.session(request());
  assert.equal(refreshCalls, 2);
});

test("a failed renewal does not prevent recovery on the next request", async () => {
  let unavailable = true;
  const auth = authWith(async input => {
    if (String(input).endsWith("/user")) return Response.json({}, { status: 401 });
    return unavailable ? Response.json({ code: "request_timeout" }, { status: 503 }) : Response.json(renewed);
  });
  await assert.rejects(auth.session(request()), error => error.status === 503);
  unavailable = false;
  assert.equal((await auth.session(request())).user.id, user.id);
});

test("valid access tokens and explicit sign-out keep their existing behavior", async () => {
  const calls = [];
  const auth = authWith(async input => {
    calls.push(String(input));
    return String(input).endsWith("/user") ? Response.json(user) : new Response(null, { status: 204 });
  });
  const session = await auth.session(request());
  assert.equal(session.user.id, user.id);
  assert.deepEqual(session.cookies, []);
  const cookies = await auth.logout(request("/auth/logout", { headers: { origin: "https://maru.example" } }), session.access);
  assert.match(calls.at(-1), /logout\?scope=local$/);
  for (const value of cookies) assert.match(value, /Max-Age=0/);
});
