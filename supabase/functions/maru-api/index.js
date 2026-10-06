import { createAiService, createSupabaseQuota } from "../../../backend/aiService.js";
import { CONTENT } from "../../../backend/contentService.js";
import { createSpeechService } from "../../../backend/speechService.js";
import { checkPhrase } from "../../../backend/phraseService.js";
import { createProgressRepository } from "./progress.js";
import { createAuth } from "./auth.js";

function json(status, body, cookies = [], retryAfter = 0) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  if (retryAfter) headers.set("Retry-After", String(retryAfter));
  for (const value of cookies) headers.append("Set-Cookie", value);
  return new Response(JSON.stringify(body), { status, headers });
}

function redirect(location, cookies = []) {
  const headers = new Headers({ Location: location, "Cache-Control": "no-store" });
  for (const value of cookies) headers.append("Set-Cookie", value);
  return new Response(null, { status: 303, headers });
}

async function readJson(request) {
  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > 1_000_000) {
    throw Object.assign(new Error("Conteúdo muito grande."), { status: 413 });
  }
  try {
    const value = JSON.parse(body || "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch {
    throw Object.assign(new Error("Envie um objeto JSON válido."), { status: 400 });
  }
}

export function createMaruHandler({ repository, auth, speech, ai }) {
  return async function handle(request) {
    const url = new URL(request.url);
    const apiPosition = url.pathname.indexOf("/api/");
    const pathname = apiPosition >= 0 ? url.pathname.slice(apiPosition) : url.pathname;
    let cookies = [];
    try {
      if (pathname === "/api/health" && request.method === "GET") return json(200, { ok: true, name: "maru", version: 2 });
      if (pathname === "/api/content" && request.method === "GET") return json(200, CONTENT);
      const oauthRoute = pathname.match(/^\/api\/auth\/(google|discord)(\/callback)?$/);
      if (oauthRoute && !oauthRoute[2] && request.method === "GET") {
        try {
          const login = await auth.begin(oauthRoute[1], request);
          return redirect(login.url, login.cookies);
        } catch {
          return redirect("/#/settings/login-unavailable");
        }
      }
      if (oauthRoute?.[2] && request.method === "GET") {
        try {
          const login = await auth.callback(request, url.searchParams);
          return redirect("/#/settings/login-success", login.cookies);
        } catch {
          return redirect("/#/settings/login-failed", auth.failureCookies());
        }
      }
      const emailRoutes = {
        "/api/auth/email/signup": "signUp",
        "/api/auth/email/login": "signIn",
        "/api/auth/email/recover": "recover",
        "/api/auth/email/complete": "completeLink"
      };
      if (Object.hasOwn(emailRoutes, pathname)) {
        if (request.method !== "POST") return json(405, { error: "Método não permitido." });
        const result = await auth[emailRoutes[pathname]](request, await readJson(request));
        const { cookies: authCookies = [], ...payload } = result;
        return json(200, payload, authCookies);
      }

      if (pathname === "/api/ai/status" && request.method === "GET") return json(200, { enabled: Boolean(ai?.enabled) });
      if (pathname === "/api/ai/phrase" || pathname === "/api/ai/tutor") {
        if (request.method !== "POST") return json(405, { error: "Método não permitido." });
        auth.assertSameOrigin(request);
        const session = await auth.session(request);
        cookies = session.cookies;
        if (!session.user) return json(401, { error: "Entre na sua conta para usar a IA do Maru." }, cookies);
        if (!ai?.enabled) return json(503, { error: "A IA do Maru ainda não está disponível." }, cookies);
        return json(200, await ai[pathname.endsWith("phrase") ? "phrase" : "tutor"](session.user.id, await readJson(request)), cookies);
      }
      if (pathname === "/api/phrase/check") {
        if (request.method !== "POST") return json(405, { error: "Método não permitido." });
        return json(200, checkPhrase(await readJson(request)));
      }
      if (pathname === "/api/audio") {
        if (request.method !== "POST") return json(405, { error: "Método não permitido." });
        const body = await readJson(request);
        if (typeof body.text !== "string" || body.text.length > 500) {
          return json(400, { error: "Escolha um áudio do conteúdo de estudo." });
        }
        return json(200, await speech.prepare(body.text));
      }
      if (pathname !== "/api/account" && pathname !== "/api/auth/logout" && pathname !== "/api/auth/email/password" && pathname !== "/api/progress") {
        return json(404, { error: "Endpoint não encontrado." });
      }

      const session = await auth.session(request);
      cookies = session.cookies;
      if (pathname === "/api/account" && request.method === "GET") {
        const capabilities = auth.capabilities ? await auth.capabilities() : { googleEnabled: auth.googleEnabled, discordEnabled: auth.discordEnabled, emailEnabled: auth.emailEnabled };
        return json(200, { user: session.user, ...capabilities }, cookies);
      }
      if (pathname === "/api/auth/email/password" && request.method === "POST") {
        return json(200, await auth.changePassword(request, session.access, await readJson(request)), cookies);
      }
      if (pathname === "/api/auth/logout" && request.method === "POST") {
        return json(200, { ok: true }, await auth.logout(request, session.access));
      }

      if (pathname === "/api/progress") {
        const browserId = request.headers.get("x-maru-user") || "";
        if (!session.user && !/^browser-[a-f0-9-]{20,60}$/.test(browserId)) {
          return json(400, { error: "Perfil de navegador inválido." }, cookies);
        }
        const ownerId = session.user ? "account:" + session.user.id : browserId;
        const expected = request.headers.get("x-maru-account");
        if ((expected && expected !== session.user?.id) || (session.user && request.method !== "GET" && expected !== session.user.id)) {
          return json(409, { error: "Sua conta mudou. Recarregue a página para continuar." }, cookies);
        }
        if (request.method === "GET") return json(200, await repository.read(ownerId), cookies);
        if (request.method === "PUT" || request.method === "POST") {
          auth.assertSameOrigin(request);
          return json(200, await repository.write(ownerId, await readJson(request)), cookies);
        }
        return json(405, { error: "Método não permitido." }, cookies);
      }
      return json(404, { error: "Endpoint não encontrado." }, cookies);
    } catch (error) {
      return json(error.status || 500, {
        error: error.status ? error.message : "Não foi possível concluir a solicitação.",
        ...(error.retryAfter ? { retryAfter: error.retryAfter } : {})
      }, cookies, error.retryAfter);
    }
  };
}

function environment() {
  const get = key => globalThis.Deno?.env.get(key) || globalThis.process?.env[key] || "";
  const defaultKey = (dictionary, legacy) => {
    try {
      const key = JSON.parse(dictionary || "{}").default;
      if (typeof key === "string" && key) return key;
    } catch {}
    return legacy;
  };
  return {
    SUPABASE_URL: get("SUPABASE_URL"),
    SUPABASE_ANON_KEY: defaultKey(get("SUPABASE_PUBLISHABLE_KEYS"), get("SUPABASE_ANON_KEY")),
    SUPABASE_SERVICE_ROLE_KEY: defaultKey(get("SUPABASE_SECRET_KEYS"), get("SUPABASE_SERVICE_ROLE_KEY")),
    MARU_PUBLIC_ORIGIN: get("MARU_PUBLIC_ORIGIN") || "https://estudemaru.com.br",
    MARU_ALLOWED_ORIGINS: get("MARU_ALLOWED_ORIGINS") || "https://estudemaru.com.br,https://www.estudemaru.com.br,https://maru-frontend-murex.vercel.app",
    MARU_GOOGLE_ENABLED: get("MARU_GOOGLE_ENABLED"),
    MARU_DISCORD_ENABLED: get("MARU_DISCORD_ENABLED"),
    OPENAI_API_KEY: get("OPENAI_API_KEY"),
    OPENAI_MODEL: get("OPENAI_MODEL") || "gpt-4.1-mini-2025-04-14",
    TTS_QUEST_API_KEY: get("TTS_QUEST_API_KEY")
  };
}

if (typeof Deno !== "undefined") {
  const env = environment();
  const handler = createMaruHandler({
    repository: createProgressRepository({ url: env.SUPABASE_URL, serviceKey: env.SUPABASE_SERVICE_ROLE_KEY }),
    auth: createAuth({
      supabaseUrl: env.SUPABASE_URL, anonKey: env.SUPABASE_ANON_KEY,
      publicOrigin: env.MARU_PUBLIC_ORIGIN,
      allowedOrigins: env.MARU_ALLOWED_ORIGINS.split(",").map(origin => origin.trim()).filter(Boolean),
      googleEnabled: env.MARU_GOOGLE_ENABLED === "true", discordEnabled: env.MARU_DISCORD_ENABLED === "true"
    }),
    ai: createAiService({ key: env.OPENAI_API_KEY, model: env.OPENAI_MODEL,
      consumeQuota: createSupabaseQuota({ url: env.SUPABASE_URL, serviceKey: env.SUPABASE_SERVICE_ROLE_KEY }) }),
    speech: createSpeechService({ key: env.TTS_QUEST_API_KEY })
  });
  Deno.serve(handler);
}
