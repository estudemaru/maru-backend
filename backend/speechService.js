import { getPronunciation } from "../shared/pronunciation.js";

const API = "https://api.tts.quest/v3/voicevox/synthesis";
// No.7 (アナウンス): voz adulta de locução. O crédito acompanha a voz por exigência do VOICEVOX.
const SPEAKER = "30", ATTRIBUTION = "VOICEVOX:No.7";
const remoteAudio = value => {
  try { const url = new URL(value); return url.protocol === "https:" && /^audio\d+\.tts\.quest$/.test(url.hostname) && /^\/v1\/data\/[a-f0-9]+\/audio\.mp3s?$/.test(url.pathname) ? url.href : null; }
  catch { return null; }
};
const failure = (status, message, retryAfter = 0) => Object.assign(new Error(message), { status, retryAfter });

// Only short-lived URLs are kept in memory. No audio is generated or written locally.
export function createSpeechService({ fetchImpl = fetch, key = process.env.TTS_QUEST_API_KEY || "", now = Date.now } = {}) {
  const cache = new Map(), pending = new Map();
  let blockedUntil = 0;
  async function prepare(text) {
    const entry = getPronunciation(text);
    if (!entry) throw failure(400, "Escolha uma pronúncia do conteúdo de estudo.");
    const cached = cache.get(entry.spoken);
    if (cached && cached.expires > now()) return cached.value;
    if (pending.has(entry.spoken)) return pending.get(entry.spoken);
    if (now() < blockedUntil) throw failure(429, "A API de voz pediu um intervalo. Tente novamente em alguns instantes.", Math.ceil((blockedUntil - now()) / 1000));
    const request = (async () => {
      const params = new URLSearchParams({ speaker: SPEAKER, text: entry.spoken });
      if (key) params.set("key", key);
      let response;
      try { response = await fetchImpl(API + "?" + params, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(15000) }); }
      catch { throw failure(503, "Não foi possível conectar à API de voz. Tente ouvir novamente."); }
      const data = await response.json().catch(() => ({}));
      if (response.status === 429 || data.retryAfter) {
        const retry = Math.min(3600, Math.max(1, Number(data.retryAfter || response.headers.get("Retry-After")) || 15));
        blockedUntil = now() + retry * 1000;
        throw failure(429, "A API de voz pediu um intervalo. Tente novamente em " + retry + " segundos.", retry);
      }
      const url = remoteAudio(data.mp3StreamingUrl);
      if (!response.ok || !data.success || !url) throw failure(503, "A API de voz não conseguiu preparar esta pronúncia. Tente novamente.");
      const value = { url, provider: "TTS Quest", attribution: ATTRIBUTION, expiresAt: now() + 10 * 60 * 1000 };
      if (cache.size >= 500) cache.delete(cache.keys().next().value);
      cache.set(entry.spoken, { value, expires: value.expiresAt });
      return value;
    })().finally(() => pending.delete(entry.spoken));
    pending.set(entry.spoken, request);
    return request;
  }
  return { prepare };
}
