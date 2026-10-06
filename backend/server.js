import { createAiService } from "./aiService.js";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleApi } from "./apiRouter.js";
import { sendJson } from "./http.js";
import { createProgressStorage } from "./storage.js";
import { createSpeechService } from "./speechService.js";
import { createAuthService } from "./authService.js";

export function createServer({ storage = createProgressStorage(), speech = createSpeechService(), auth = createAuthService(storage), ai = createAiService() } = {}) {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || "/", "http://localhost");
      if (url.pathname.startsWith("/api/")) await handleApi(req, res, url, storage, speech, auth, ai);
      else sendJson(res, 404, { error: "Use um endpoint /api do Maru." });
    } catch (error) {
      if (!res.headersSent && !res.destroyed) {
        if (error.retryAfter) res.setHeader("Retry-After", String(error.retryAfter));
        sendJson(res, error.status || 500, { error: error.status ? error.message : "Não foi possível concluir a solicitação.", ...(error.retryAfter ? { retryAfter: error.retryAfter } : {}) });
      }
    }
  });
  server.on("close", () => storage.close?.());
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 5173;
  const host = process.env.HOST || "127.0.0.1";
  createServer().listen(port, host, () => console.log("API do Maru rodando em http://" + host + ":" + port));
}
