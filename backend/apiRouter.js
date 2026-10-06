import { CONTENT } from "./contentService.js";
import { checkPhrase } from "./phraseService.js";
import { readJson, sendJson } from "./http.js";

export async function handleApi(req, res, url, storage, speech, auth, ai) {
  const pathname = url.pathname;
  const redirect = (location, cookie) => { res.writeHead(303, { Location: location, "Cache-Control": "no-store", ...(cookie ? { "Set-Cookie": cookie } : {}) }); res.end(); };
  if (pathname === "/api/account" && req.method === "GET") return sendJson(res, 200, auth.status(req));
  if (pathname === "/api/auth/google" && req.method === "GET") {
    try { const login = await auth.begin(); return redirect(login.url, login.cookie); }
    catch { return redirect("/#/settings/login-unavailable"); }
  }
  if (pathname === "/api/auth/google/callback" && req.method === "GET") {
    try { const login = await auth.callback(req, url.searchParams); return redirect("/#/settings/login-success", login.cookies); }
    catch { return redirect("/#/settings/login-failed", auth.failureCookie()); }
  }
  if (pathname === "/api/auth/logout" && req.method === "POST") {
    res.setHeader("Set-Cookie", auth.logout(req));
    return sendJson(res, 200, { ok: true });
  }
  const account = auth.account(req);
  if (pathname === "/api/ai/status" && req.method === "GET") return sendJson(res, 200, { enabled: Boolean(ai?.enabled) });
  if (pathname === "/api/ai/phrase" || pathname === "/api/ai/tutor") {
    if (req.method !== "POST") return sendJson(res, 405, { error: "Método não permitido." });
    auth.assertSameOrigin(req);
    if (!account) return sendJson(res, 401, { error: "Entre na sua conta para usar a IA do Maru." });
    if (!ai?.enabled) return sendJson(res, 503, { error: "A IA do Maru ainda não está disponível." });
    return sendJson(res, 200, await ai[pathname.endsWith("phrase") ? "phrase" : "tutor"](account.id, await readJson(req)));
  }
  const browserId = req.headers["x-maru-user"] || "default";
  if (typeof browserId !== "string" || !/^[a-zA-Z0-9_-]{1,80}$/.test(browserId)) return sendJson(res, 400, { error: "Perfil de navegador inválido." });
  const userId = account ? "account:" + account.id : browserId;
  if (pathname === "/api/audio" && req.method === "POST") {
    const body = await readJson(req);
    if (typeof body.text !== "string" || body.text.length > 500) return sendJson(res, 400, { error: "Escolha um áudio do conteúdo de estudo." });
    return sendJson(res, 200, await speech.prepare(body.text));
  }
  if (pathname === "/api/health" && req.method === "GET") return sendJson(res, 200, { ok: true, name: "maru", version: 2 });
  if (pathname === "/api/content" && req.method === "GET") return sendJson(res, 200, CONTENT);
  if (pathname === "/api/progress") {
    const expected = req.headers["x-maru-account"];
    if ((expected && expected !== account?.id) || (account && req.method !== "GET" && expected !== account.id)) return sendJson(res, 409, { error: "Sua conta mudou. Recarregue a página para continuar." });
    if (req.method === "GET") return sendJson(res, 200, await storage.read(userId));
    if (["PUT", "POST"].includes(req.method)) {
      auth.assertSameOrigin(req);
      return sendJson(res, 200, await storage.write(await readJson(req), userId));
    }
    return sendJson(res, 405, { error: "Método não permitido." });
  }
  if (pathname === "/api/phrase/check" && req.method === "POST") return sendJson(res, 200, checkPhrase(await readJson(req)));
  return sendJson(res, 404, { error: "Endpoint não encontrado." });
}
