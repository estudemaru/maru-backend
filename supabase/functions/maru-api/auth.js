const SESSION_AGE = 365 * 86400;
const INVALID_SESSION_CODES = new Set([
  "refresh_token_not_found", "refresh_token_already_used", "session_not_found",
  "session_expired", "user_not_found", "user_banned"
]);
const ACCESS_TOKEN = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
const REFRESH_TOKEN = /^[A-Za-z0-9._~-]{20,4096}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badInput(message) { throw Object.assign(new Error(message), { status: 400 }); }

function base64url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function cookie(name, value, maxAge, secure) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
}

function cookieValue(request, name) {
  const pair = (request.headers.get("cookie") || "").split(";").map(value => value.trim()).find(value => value.startsWith(name + "="));
  return pair?.slice(name.length + 1) || "";
}

function sessionCookies(session, secure) {
  return [
    cookie("maru_access", session.access_token, Math.max(1, Number(session.expires_in) || 3600), secure),
    cookie("maru_refresh", session.refresh_token, SESSION_AGE, secure)
  ];
}

function clearCookies(secure) {
  return [cookie("maru_access", "", 0, secure), cookie("maru_refresh", "", 0, secure)];
}

export function createAuth({ supabaseUrl, anonKey, publicOrigin, allowedOrigins = [], googleEnabled = false, discordEnabled = false, fetchImpl = fetch, now = Date.now }) {
  if (!supabaseUrl || !anonKey || !publicOrigin) throw new Error("Configuração do Supabase Auth incompleta.");
  const site = new URL(publicOrigin);
  if (site.origin !== publicOrigin || (site.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(site.hostname))) {
    throw new Error("MARU_PUBLIC_ORIGIN deve ser uma origem HTTPS ou localhost.");
  }
  const secure = site.protocol === "https:";
  const origins = new Set([site.origin]);
  for (const value of allowedOrigins) {
    const origin = new URL(value);
    if (origin.origin !== value || (origin.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(origin.hostname))) {
      throw new Error("MARU_ALLOWED_ORIGINS deve conter somente origens HTTPS ou localhost.");
    }
    origins.add(origin.origin);
  }
  const authUrl = new URL("/auth/v1/", supabaseUrl);
  let settings, settingsExpireAt = 0, settingsRequest;
  const refreshRequests = new Map();

  // Only explicit trusted origins may receive an OAuth or e-mail callback.
  // Vercel proxies the request URL, so a same-origin Referer identifies the
  // browser's public domain without trusting an arbitrary forwarded host.
  function originFor(request) {
    if (!request) return site.origin;
    for (const value of [request.headers.get("origin"), request.headers.get("referer"), request.url]) {
      try { const origin = new URL(value).origin; if (origins.has(origin)) return origin; } catch {}
    }
    return site.origin;
  }

  async function authRequest(path, { method = "GET", body, token, timeout = 10000 } = {}) {
    const response = await fetchImpl(new URL(path, authUrl), {
      method,
      signal: AbortSignal.timeout(timeout),
      headers: {
        apikey: anonKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body ? { "Content-Type": "application/json" } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    return { response, data: await response.json().catch(() => ({})) };
  }

  async function capabilities() {
    if (settings && now() < settingsExpireAt) return settings;
    if (!settingsRequest) settingsRequest = (async () => {
      try {
        const { response, data } = await authRequest("settings", { timeout: 2500 });
        if (!response.ok || !data.external || typeof data.external !== "object") throw new Error("Auth settings unavailable");
        settings = { googleEnabled: data.external.google === true, discordEnabled: data.external.discord === true, emailEnabled: data.external.email !== false };
        settingsExpireAt = now() + 300000;
      } catch {
        settings ||= { googleEnabled: Boolean(googleEnabled), discordEnabled: Boolean(discordEnabled), emailEnabled: true };
        settingsExpireAt = now() + 15000;
      } finally { settingsRequest = null; }
      return settings;
    })();
    return settingsRequest;
  }

  function accountFrom(user) {
    if (!user?.id || !/^[a-f0-9-]{36}$/.test(user.id)) return null;
    return {
      id: user.id,
      name: String(user.user_metadata?.full_name || user.user_metadata?.name || "Estudante").slice(0, 100),
      email: String(user.email || "").slice(0, 254)
    };
  }

  function credentials(body) {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL.test(email) || email.length > 254) badInput("Informe um e-mail válido.");
    if (typeof body.password !== "string" || body.password.length < 8 || body.password.length > 72) badInput("A senha precisa ter entre 8 e 72 caracteres.");
    return { email, password: body.password };
  }

  function authError(message, status = 400) {
    throw Object.assign(new Error(message), { status });
  }

  function sessionUnavailable() {
    authError("Não foi possível verificar sua conta agora. Tente novamente em instantes.", 503);
  }

  async function sessionRequest(path, options) {
    try {
      const result = await authRequest(path, options);
      if (!result.data || typeof result.data !== "object" || Array.isArray(result.data)) sessionUnavailable();
      return result;
    }
    catch { sessionUnavailable(); }
  }

  function refreshSession(refresh) {
    // Concurrent requests in this instance must share a single token rotation.
    // Retain only in-flight requests, never completed sessions or revoked tokens.
    if (!refreshRequests.has(refresh)) {
      const pending = (async () => {
        try {
          const { response, data } = await sessionRequest("token?grant_type=refresh_token", {
            method: "POST", body: { refresh_token: refresh }
          });
          if (!response.ok) {
            const invalid = [400, 401, 403, 404, 422].includes(response.status)
              && INVALID_SESSION_CODES.has(data.error_code || data.code);
            if (invalid) return { user: null, access: "", cookies: clearCookies(secure) };
            sessionUnavailable();
          }
          const user = accountFrom(data.user);
          if (!user || !ACCESS_TOKEN.test(data.access_token || "") || data.access_token.length > 4096 || !REFRESH_TOKEN.test(data.refresh_token || "")) sessionUnavailable();
          return { user, access: data.access_token, cookies: sessionCookies(data, secure) };
        } finally { refreshRequests.delete(refresh); }
      })();
      refreshRequests.set(refresh, pending);
    }
    return refreshRequests.get(refresh);
  }

  return {
    googleEnabled: Boolean(googleEnabled),
    discordEnabled: Boolean(discordEnabled),
    emailEnabled: true,
    capabilities,
    assertSameOrigin(request) {
      const origin = request.headers.get("origin");
      if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && !origins.has(origin))) {
        throw Object.assign(new Error("Recarregue o Maru antes de continuar."), { status: 403 });
      }
    },
    async begin(provider = "google", request) {
      if (!["google", "discord"].includes(provider)) badInput("Provedor de login inválido.");
      const enabled = await capabilities();
      if (!enabled[provider + "Enabled"]) throw Object.assign(new Error("Este login ainda não está configurado."), { status: 503 });
      const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
      const challenge = base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
      const url = new URL("authorize", authUrl);
      url.searchParams.set("provider", provider);
      url.searchParams.set("redirect_to", originFor(request) + "/api/auth/" + provider + "/callback");
      url.searchParams.set("code_challenge", challenge);
      url.searchParams.set("code_challenge_method", "s256");
      return { url: url.href, cookies: [cookie("maru_oauth", verifier, 600, secure)] };
    },
    async callback(request, params) {
      const verifier = cookieValue(request, "maru_oauth");
      const code = params.get("code");
      if (!/^[A-Za-z0-9_-]{43}$/.test(verifier) || !code || code.length > 4096 || params.has("error")) {
        throw new Error("Login cancelado ou expirado.");
      }
      const { response, data } = await authRequest("token?grant_type=pkce", {
        method: "POST", body: { auth_code: code, code_verifier: verifier }
      });
      if (!response.ok || !data.access_token || !data.refresh_token) throw new Error("Não foi possível concluir o login.");
      return { cookies: [...sessionCookies(data, secure), cookie("maru_oauth", "", 0, secure)] };
    },
    async signUp(request, body) {
      this.assertSameOrigin(request);
      const credentialsBody = credentials(body);
      const path = "signup?redirect_to=" + encodeURIComponent(originFor(request));
      const { response, data } = await authRequest(path, { method: "POST", body: credentialsBody });
      if (!response.ok) authError(response.status === 429 ? "Muitas tentativas. Aguarde e tente novamente." : "Não foi possível criar a conta agora. Tente novamente mais tarde.", response.status === 429 ? 429 : 400);
      // Support both Supabase policies without silently discarding a new session.
      if (data.access_token && data.refresh_token && accountFrom(data.user)) {
        return { user: accountFrom(data.user), cookies: sessionCookies(data, secure), message: "Conta criada. Você já pode começar." };
      }
      return { message: "Se o endereço puder ser cadastrado, você receberá um e-mail para confirmar a conta." };
    },
    async signIn(request, body) {
      this.assertSameOrigin(request);
      const { response, data } = await authRequest("token?grant_type=password", { method: "POST", body: credentials(body) });
      if (!response.ok || !data.access_token || !data.refresh_token || !accountFrom(data.user)) {
        authError(response.status === 429 ? "Muitas tentativas. Aguarde e tente novamente." : "E-mail ou senha incorretos, ou conta ainda não confirmada.", response.status === 429 ? 429 : 401);
      }
      return { user: accountFrom(data.user), cookies: sessionCookies(data, secure) };
    },
    async recover(request, body) {
      this.assertSameOrigin(request);
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
      if (!EMAIL.test(email) || email.length > 254) badInput("Informe um e-mail válido.");
      const path = "recover?redirect_to=" + encodeURIComponent(originFor(request));
      const { response } = await authRequest(path, { method: "POST", body: { email } });
      if (!response.ok) authError(response.status === 429 ? "Muitas tentativas. Aguarde antes de solicitar outro link." : "Não foi possível enviar o link agora. Tente novamente mais tarde.", response.status === 429 ? 429 : 503);
      return { message: "Se houver uma conta nesse endereço, enviaremos um link para redefinir a senha." };
    },
    async completeLink(request, body) {
      this.assertSameOrigin(request);
      if (!REFRESH_TOKEN.test(body.refreshToken || "")) badInput("Link inválido ou expirado. Solicite outro e-mail.");
      const { response, data } = await authRequest("token?grant_type=refresh_token", { method: "POST", body: { refresh_token: body.refreshToken } });
      if (!response.ok || !data.access_token || !data.refresh_token || !accountFrom(data.user)) badInput("Link inválido ou expirado. Solicite outro e-mail.");
      return { user: accountFrom(data.user), cookies: sessionCookies(data, secure) };
    },
    async changePassword(request, access, body) {
      this.assertSameOrigin(request);
      if (!ACCESS_TOKEN.test(access || "")) authError("Entre na conta para alterar a senha.", 401);
      if (typeof body.password !== "string" || body.password.length < 8 || body.password.length > 72) badInput("A senha precisa ter entre 8 e 72 caracteres.");
      const { response } = await authRequest("user", { method: "PUT", token: access, body: { password: body.password } });
      if (!response.ok) authError("Não foi possível alterar a senha. Tente novamente.", 400);
      return { ok: true };
    },
    async session(request) {
      const access = cookieValue(request, "maru_access");
      const refresh = cookieValue(request, "maru_refresh");
      if (ACCESS_TOKEN.test(access) && access.length <= 4096) {
        const { response, data } = await sessionRequest("user", { token: access });
        if (response.ok) {
          const user = accountFrom(data);
          if (user) return { user, access, cookies: [] };
          sessionUnavailable();
        }
        if (![400, 401, 403, 404, 422].includes(response.status)) sessionUnavailable();
      }
      if (!REFRESH_TOKEN.test(refresh)) return { user: null, access: "", cookies: [] };
      return refreshSession(refresh);
    },
    async logout(request, access) {
      this.assertSameOrigin(request);
      if (ACCESS_TOKEN.test(access || "")) await authRequest("logout?scope=local", { method: "POST", token: access });
      return clearCookies(secure);
    },
    failureCookies() { return [cookie("maru_oauth", "", 0, secure)]; }
  };
}
