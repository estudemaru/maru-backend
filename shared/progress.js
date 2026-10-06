import { PLACEMENT_QUESTIONS, PLACEMENT_VERSION } from "./placement.js";
import { UNITS } from "./curriculum.js";
import { fsrs, generatorParameters, createEmptyCard, Rating, State } from "./vendor/ts-fsrs.js";
const DAY = 86_400_000;
const RETRY = 600_000;
// FSRS (o mesmo algoritmo do Anki) decide quando cada item volta. Sem "fuzz" o agendamento é
// reproduzível; sem passos curtos os intervalos são em dias, e o erro volta em dez minutos (RETRY).
const MAX_DAYS = 365;
const scheduler = fsrs(generatorParameters({ enable_fuzz: false, enable_short_term: false, maximum_interval: MAX_DAYS }));
const fraction = (value, max) => { const number = Number(value); return Number.isFinite(number) && number > 0 ? Math.min(max, Math.round(number * 10000) / 10000) : 0; };
export const localDay = (date = new Date()) => {
  const d = new Date(date);
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
};
const record = value => value && typeof value === "object" && !Array.isArray(value) ? value : {};
const count = value => Math.min(1e9, Math.max(0, Math.floor(Number(value) || 0)));
const dateValue = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
const mapRecords = (value, transform) => Object.fromEntries(Object.entries(record(value)).filter(([key]) => !["__proto__", "constructor", "prototype"].includes(key)).slice(0, 10000).map(([key, item]) => [key, transform(record(item))]));
// Desafio do dia: um registro por data local, com a palavra sorteada, 0–3 passos certos e a conclusão.
const dailyMap = value => Object.fromEntries(Object.entries(record(value)).filter(([key, item]) => /^\d{4}-\d{2}-\d{2}$/.test(key) && item && typeof item === "object").sort(([a], [b]) => a.localeCompare(b)).slice(-730).map(([key, item]) => [key, { word: typeof record(item).word === "string" ? item.word.slice(0, 80) : "", score: Math.min(3, count(record(item).score)), completedAt: dateValue(record(item).completedAt) }]));
// O primeiro resultado concluído do dia prevalece; refazer o desafio em outro aparelho não o substitui.
const firstDaily = (left, right) => !left ? right : !right ? left : !left.completedAt ? right : !right.completedAt ? left : left.completedAt !== right.completedAt ? (left.completedAt < right.completedAt ? left : right) : (left.score >= right.score ? left : right);
// Diagnósticos aceitos antes das unidades apontavam para as etapas antigas; start, hiragana
// e numbers têm o mesmo sentido nos dois mapas. As outras viram a unidade equivalente.
const LEGACY_PLACEMENT = { katakana: "meet", kanji: "meet", sentences: "meet", particles: "meet", everyday: "numbers", casual: "numbers" };
const placedUnit = id => UNITS.some(unit => unit.id === id) ? id : LEGACY_PLACEMENT[id] || "";
// Checkpoints por unidade. Chaves desconhecidas ficam guardadas: um app mais antigo não
// apaga o checkpoint de uma unidade que ele ainda não conhece.
const checkpointMap = value => Object.fromEntries(Object.entries(record(value)).filter(([key]) => /^[a-z][a-z0-9-]{1,39}$/.test(key)).slice(0, 100).map(([key, item]) => [key, { passedAt: dateValue(record(item).passedAt), best: Math.min(100, count(record(item).best)), attempts: count(record(item).attempts), updatedAt: dateValue(record(item).updatedAt) }]));
const dayMap = value => Object.fromEntries(Object.entries(record(value)).filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key)).sort(([a], [b]) => a.localeCompare(b)).slice(-730).map(([key, amount]) => [key, count(amount)]));

export function normalizeSnapshot(input = {}) {
  const source = record(input);
  const reviews = { ...record(source.reviews) };
  for (const [id, item] of Object.entries(record(source.progress))) {
    if (!reviews[id] && item?.reps) reviews[id] = { due: item.due, interval: item.interval, attempts: item.reps, correct: item.reps, streak: 0, updatedAt: 0 };
  }
  for (const [id, item] of Object.entries(record(source.kanaStats))) {
    if (!reviews[id] && item?.attempts) reviews[id] = { due: 0, interval: 0, attempts: item.attempts, correct: Math.max(0, item.attempts - (item.wrong || 0)), streak: item.streak, updatedAt: item.updatedAt || 0 };
  }
  return {
    version: 2,
    updatedAt: dateValue(source.updatedAt),
    progress: mapRecords(source.progress, item => ({ ef: Math.max(1.3, Number(item.ef) || 2.5), interval: count(item.interval), reps: count(item.reps), due: dateValue(item.due) })),
    streak: { count: count(source.streak?.count), lastDate: typeof source.streak?.lastDate === "string" ? source.streak.lastDate.slice(0, 10) : "" },
    xp: { total: count(source.xp?.total) },
    stats: { sentencesWritten: count(source.stats?.sentencesWritten), focusSessions: count(source.stats?.focusSessions), writingSessions: count(source.stats?.writingSessions) },
    kanaStats: mapRecords(source.kanaStats, item => ({ attempts: count(item.attempts), wrong: count(item.wrong), streak: count(item.streak), updatedAt: dateValue(item.updatedAt) })),
    lessons: mapRecords(source.lessons, item => ({ completedAt: dateValue(item.completedAt), score: count(item.score) })),
    arcade: mapRecords(source.arcade, item => ({ score: count(item.score), updatedAt: dateValue(item.updatedAt) })),
    reviews: mapRecords(reviews, item => ({ due: dateValue(item.due), interval: count(item.interval), attempts: count(item.attempts), correct: count(item.correct), streak: count(item.streak), updatedAt: dateValue(item.updatedAt), stability: fraction(item.stability, 36500), difficulty: fraction(item.difficulty, 10), state: [0, 1, 2, 3].includes(item.state) ? item.state : 0, lapses: count(item.lapses) })),
    placement: {
      version: PLACEMENT_VERSION,
      answers: source.placement?.version === PLACEMENT_VERSION ? Object.fromEntries(PLACEMENT_QUESTIONS.filter(item => Object.hasOwn(record(source.placement?.answers), item.id)).map(item => [item.id, Number.isInteger(source.placement.answers[item.id]) && source.placement.answers[item.id] >= 0 && source.placement.answers[item.id] < item.choices.length ? source.placement.answers[item.id] : null])) : {},
      completedAt: dateValue(source.placement?.completedAt),
      updatedAt: dateValue(source.placement?.updatedAt),
      acceptedModule: placedUnit(source.placement?.acceptedModule)
    },
    checkpoints: checkpointMap(source.checkpoints),
    restDays: dayMap(source.restDays),
    daily: dailyMap(source.daily),
    activity: Object.fromEntries(Object.entries(record(source.activity)).filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key)).slice(-730).map(([key, value]) => [key, count(value)])),
    preferences: {
      romaji: source.preferences?.romaji !== false,
      kanaInput: source.preferences?.kanaInput !== false,
      // Letra dos kana e kanji nos jogos (lista em frontend/assets/js/core/jpFont.js).
      jpFont: ["mincho", "gothic", "maru", "kyokasho", "rounded", "pen"].includes(source.preferences?.jpFont) ? source.preferences.jpFont : "mincho",
      dailyGoal: [5, 10, 15].includes(source.preferences?.dailyGoal) ? source.preferences.dailyGoal : 5,
      theme: ["dojo", "arcade"].includes(source.preferences?.theme) ? source.preferences.theme : "dojo",
      soundEffects: source.preferences?.soundEffects !== false,
      audioRate: [0.75, 1, 1.15].includes(source.preferences?.audioRate) ? source.preferences.audioRate : 1
    }
  };
}

export function mergeSnapshots(local, remote) {
  const a = normalizeSnapshot(local);
  const b = normalizeSnapshot(remote);
  const recent = a.updatedAt >= b.updatedAt ? a : b;
  const mergeRecords = (key, timestamp) => Object.fromEntries([...new Set([...Object.keys(a[key]), ...Object.keys(b[key])])].map(id => {
    const left = a[key][id], right = b[key][id];
    return [id, !left ? right : !right ? left : (left[timestamp] || 0) >= (right[timestamp] || 0) ? left : right];
  }));
  return normalizeSnapshot({
    ...recent,
    progress: { ...(recent === a ? b.progress : a.progress), ...recent.progress },
    xp: { total: Math.max(a.xp.total, b.xp.total) },
    stats: { sentencesWritten: Math.max(a.stats.sentencesWritten, b.stats.sentencesWritten), focusSessions: Math.max(a.stats.focusSessions, b.stats.focusSessions), writingSessions: Math.max(a.stats.writingSessions, b.stats.writingSessions) },
    streak: a.streak.lastDate >= b.streak.lastDate ? a.streak : b.streak,
    arcade: Object.fromEntries([...new Set([...Object.keys(a.arcade), ...Object.keys(b.arcade)])].map(id => [id, (a.arcade[id]?.score || 0) >= (b.arcade[id]?.score || 0) ? a.arcade[id] : b.arcade[id]])),
    lessons: mergeRecords("lessons", "completedAt"),
    reviews: mergeRecords("reviews", "updatedAt"),
    kanaStats: mergeRecords("kanaStats", "updatedAt"),
    // Empate: fica o diagnóstico com unidade. Uma aba aberta com o app antigo não conhece os
    // IDs novos e mandaria a mesma data sem a unidade aceita.
    placement: a.placement.updatedAt > b.placement.updatedAt || (a.placement.updatedAt === b.placement.updatedAt && (a.placement.acceptedModule || !b.placement.acceptedModule)) ? a.placement : b.placement,
    checkpoints: Object.fromEntries([...new Set([...Object.keys(a.checkpoints), ...Object.keys(b.checkpoints)])].map(id => {
      const left = a.checkpoints[id] || {}, right = b.checkpoints[id] || {};
      const passed = [left.passedAt, right.passedAt].filter(Boolean);
      return [id, { passedAt: passed.length ? Math.min(...passed) : 0, best: Math.max(left.best || 0, right.best || 0), attempts: Math.max(left.attempts || 0, right.attempts || 0), updatedAt: Math.max(left.updatedAt || 0, right.updatedAt || 0) }];
    })),
    restDays: { ...a.restDays, ...b.restDays },
    daily: Object.fromEntries([...new Set([...Object.keys(a.daily), ...Object.keys(b.daily)])].map(day => [day, firstDaily(a.daily[day], b.daily[day])])),
    activity: Object.fromEntries([...new Set([...Object.keys(a.activity), ...Object.keys(b.activity)])].map(day => [day, Math.max(a.activity[day] || 0, b.activity[day] || 0)]))
  });
}

export function currentStreak(snapshot, now = new Date()) {
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  return [localDay(now), localDay(yesterday)].includes(snapshot.streak.lastDate) || availableRestDay(snapshot, now) ? snapshot.streak.count : 0;
}

// One missed calendar day may be bridged each Monday–Sunday week.
// The rest day earns neither activity nor XP; only actual study days count.
export function availableRestDay(snapshot, now = new Date()) {
  const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
  const before = new Date(now); before.setDate(before.getDate() - 2);
  if (!snapshot.streak.count || snapshot.streak.lastDate !== localDay(before)) return "";
  const monday = new Date(yesterday); monday.setDate(monday.getDate() - (monday.getDay() + 6) % 7);
  const sunday = new Date(monday); sunday.setDate(sunday.getDate() + 6);
  if (Object.keys(snapshot.restDays || {}).some(day => day >= localDay(monday) && day <= localDay(sunday))) return "";
  return localDay(yesterday);
}

export function recordActivity(snapshot, xp, now = Date.now()) {
  const today = localDay(now);
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (snapshot.streak.lastDate !== today) {
    const rest = availableRestDay(snapshot, now);
    if (rest) { snapshot.restDays ||= {}; snapshot.restDays[rest] = 1; }
    snapshot.streak = { count: snapshot.streak.lastDate === localDay(yesterday) || rest ? snapshot.streak.count + 1 : 1, lastDate: today };
  }
  snapshot.xp.total += xp;
  snapshot.activity[today] = (snapshot.activity[today] || 0) + 1;
  snapshot.updatedAt = now;
}

export function completeLesson(snapshot, id, score, now = Date.now()) {
  if (snapshot.lessons[id]?.completedAt) return false;
  snapshot.lessons[id] = { completedAt: now, score };
  recordActivity(snapshot, 30, now);
  return true;
}

// Cada tentativa conta como estudo. A primeira aprovação vale 50 XP; as outras, 5.
export function recordCheckpoint(snapshot, unitId, { percent, passed }, now = Date.now()) {
  const old = snapshot.checkpoints[unitId] || { passedAt: 0, best: 0, attempts: 0 };
  const first = passed && !old.passedAt;
  snapshot.checkpoints[unitId] = { passedAt: old.passedAt || (passed ? now : 0), best: Math.max(old.best, percent), attempts: old.attempts + 1, updatedAt: now };
  recordActivity(snapshot, first ? 50 : 5, now);
  return first;
}

// Registros anteriores ao FSRS (sem estabilidade) viram um cartão aproximado a partir do intervalo que já tinham.
function toCard(old, now) {
  if (!old || (!old.stability && !old.interval)) return createEmptyCard(new Date(now));
  const stability = old.stability || old.interval;
  const last = old.updatedAt || Math.max(0, old.due - old.interval * DAY);
  return { due: new Date(old.due || now), stability, difficulty: old.difficulty || 5, elapsed_days: 0, scheduled_days: old.interval, learning_steps: 0, reps: old.attempts, lapses: old.lapses || 0, state: old.stability ? old.state || State.Review : State.Review, last_review: last ? new Date(last) : undefined };
}

export function scheduleReview(previous, correct, now = Date.now()) {
  const old = previous || { attempts: 0, correct: 0, streak: 0, interval: 0 };
  const { card } = scheduler.next(toCard(previous, now), new Date(now), correct ? Rating.Good : Rating.Again);
  // A biblioteca pode passar um dia do máximo ao garantir que "bom" supere "difícil".
  const interval = Math.min(MAX_DAYS, card.scheduled_days);
  return {
    attempts: old.attempts + 1, correct: old.correct + Number(correct), streak: correct ? old.streak + 1 : 0,
    interval: correct ? interval : 0, due: correct ? Math.min(card.due.getTime(), now + MAX_DAYS * DAY) : now + RETRY, updatedAt: now,
    stability: fraction(card.stability, 36500), difficulty: fraction(card.difficulty, 10), state: card.state, lapses: card.lapses
  };
}

export function recordReview(snapshot, id, correct, now = Date.now()) {
  snapshot.reviews[id] = scheduleReview(snapshot.reviews[id], correct, now);
  recordActivity(snapshot, correct ? 8 : 2, now);
  if (/^[hk]-/.test(id)) {
    const old = snapshot.kanaStats[id] || { attempts: 0, wrong: 0, streak: 0 };
    snapshot.kanaStats[id] = { attempts: old.attempts + 1, wrong: old.wrong + Number(!correct), streak: correct ? old.streak + 1 : 0, updatedAt: now };
  }
}

export const dueReviews = (snapshot, now = Date.now()) => Object.entries(snapshot.reviews).filter(([, item]) => item.due <= now).map(([id]) => id);
