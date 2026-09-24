import { PLACEMENT_QUESTIONS, PLACEMENT_VERSION } from "./placement.js";
import { MODULES } from "./curriculum.js";
const DAY = 86_400_000;
export const localDay = (date = new Date()) => {
  const d = new Date(date);
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
};
const record = value => value && typeof value === "object" && !Array.isArray(value) ? value : {};
const count = value => Math.min(1e9, Math.max(0, Math.floor(Number(value) || 0)));
const dateValue = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
const mapRecords = (value, transform) => Object.fromEntries(Object.entries(record(value)).filter(([key]) => !["__proto__", "constructor", "prototype"].includes(key)).slice(0, 10000).map(([key, item]) => [key, transform(record(item))]));
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
    reviews: mapRecords(reviews, item => ({ due: dateValue(item.due), interval: count(item.interval), attempts: count(item.attempts), correct: count(item.correct), streak: count(item.streak), updatedAt: dateValue(item.updatedAt) })),
    placement: {
      version: PLACEMENT_VERSION,
      answers: source.placement?.version === PLACEMENT_VERSION ? Object.fromEntries(PLACEMENT_QUESTIONS.filter(item => Object.hasOwn(record(source.placement?.answers), item.id)).map(item => [item.id, Number.isInteger(source.placement.answers[item.id]) && source.placement.answers[item.id] >= 0 && source.placement.answers[item.id] < item.choices.length ? source.placement.answers[item.id] : null])) : {},
      completedAt: dateValue(source.placement?.completedAt),
      updatedAt: dateValue(source.placement?.updatedAt),
      acceptedModule: MODULES.some(item => item.id === source.placement?.acceptedModule) ? source.placement.acceptedModule : ""
    },
    restDays: dayMap(source.restDays),
    activity: Object.fromEntries(Object.entries(record(source.activity)).filter(([key]) => /^\d{4}-\d{2}-\d{2}$/.test(key)).slice(-730).map(([key, value]) => [key, count(value)])),
    preferences: {
      romaji: source.preferences?.romaji !== false,
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
    lessons: mergeRecords("lessons", "completedAt"),
    reviews: mergeRecords("reviews", "updatedAt"),
    kanaStats: mergeRecords("kanaStats", "updatedAt"),
    placement: a.placement.updatedAt >= b.placement.updatedAt ? a.placement : b.placement,
    restDays: { ...a.restDays, ...b.restDays },
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

export function scheduleReview(previous, correct, now = Date.now()) {
  const old = previous || { attempts: 0, correct: 0, streak: 0, interval: 0 };
  const interval = correct ? Math.min(60, old.interval ? old.interval * 2 : 1) : 0;
  return { attempts: old.attempts + 1, correct: old.correct + Number(correct), streak: correct ? old.streak + 1 : 0, interval, due: now + (correct ? interval * DAY : 600_000), updatedAt: now };
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
