const SESSION_AGE = 30 * 86400;
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

export function createAuth({ supabaseUrl, anonKey, publicOrigin, googleEnabled = false, fetchImpl = fetch }) {
  if (!supabaseUrl || !anonKey || !publicOrigin) throw new Error("Configuração do Supabase Auth incompleta.");
  const site = new URL(publicOrigin);
  if (site.origin !== publicOrigin || (site.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(site.hostname))) {
    throw new Error("MARU_PUBLIC_ORIGIN deve ser uma origem HTTPS ou localhost.");
  }
  const secure = site.protocol === "https:";
  const authUrl = new URL("/auth/v1/", supabaseUrl);

  async function authRequest(path, { method = "GET", body, token } = {}) {
    const response = await fetchImpl(new URL(path, authUrl), {
      method,
      headers: {
        apikey: anonKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body ? { "Content-Type": "application/json" } : {})
      },
      ...(body ? { body: JSON.stringify(body) } : {})
    });
    return { response, data: await response.json().catch(() => ({})) };
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

  return {
    googleEnabled: Boolean(googleEnabled),
    emailEnabled: true,
    assertSameOrigin(request) {
      const origin = request.headers.get("origin");
      if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== site.origin)) {
        throw Object.assign(new Error("Recarregue o Maru antes de continuar."), { status: 403 });
      }
    },
    async begin() {
      if (!googleEnabled) throw Object.assign(new Error("O login Google ainda não está configurado."), { status: 503 });
      const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
      const challenge = base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
      const url = new URL("authorize", authUrl);
      url.searchParams.set("provider", "google");
      url.searchParams.set("redirect_to", site.origin + "/api/auth/google/callback");
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
      const path = "signup?redirect_to=" + encodeURIComponent(site.origin);
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
      const path = "recover?redirect_to=" + encodeURIComponent(site.origin);
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
        const { response, data } = await authRequest("user", { token: access });
        if (response.ok) {
          const user = accountFrom(data);
          if (user) return { user, access, cookies: [] };
        }
      }
      if (!REFRESH_TOKEN.test(refresh)) return { user: null, access: "", cookies: [] };
      const { response, data } = await authRequest("token?grant_type=refresh_token", {
        method: "POST", body: { refresh_token: refresh }
      });
      if (!response.ok || !data.access_token || !data.refresh_token) {
        return { user: null, access: "", cookies: clearCookies(secure) };
      }
      const user = accountFrom(data.user);
      if (!user) return { user: null, access: "", cookies: clearCookies(secure) };
      return { user, access: data.access_token, cookies: sessionCookies(data, secure) };
    },
    async logout(request, access) {
      this.assertSameOrigin(request);
      if (ACCESS_TOKEN.test(access || "")) await authRequest("logout?scope=local", { method: "POST", token: access });
      return clearCookies(secure);
    },
    failureCookies() { return [cookie("maru_oauth", "", 0, secure)]; }
  };
}
