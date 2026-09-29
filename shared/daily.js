import { VOCABULARY } from './vocabulary.js';
import { localDay, recordActivity } from './progress.js';
import { normalizeAnswer } from './arcade.js';
import { toHiragana } from './shiritori.js';

// Desafio do dia: a mesma palavra para todo mundo na mesma data, sem servidor.
// Só entram palavras cuja frase de exemplo contém a própria palavra (passo "usar").
export const DAILY_POOL = VOCABULARY.filter(word => word.sentence.includes(word.jp));
export const DAILY_STEPS = 3;
const DAY = 86_400_000;
const isDay = day => /^\d{4}-\d{2}-\d{2}$/.test(String(day));

// Gerador determinístico: a mesma semente gera sempre a mesma sequência.
export const seededRandom = seed => () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const shuffle = (list, random) => { const copy = [...list]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };

// Dias contados em UTC a partir da data local "AAAA-MM-DD": fuso e horário de verão não mudam o sorteio.
export const dayNumber = day => { const [y, m, d] = String(day).split('-').map(Number); return Math.floor(Date.UTC(y, m - 1, d) / DAY); };
// Uma ordem fixa percorre todo o banco antes de repetir uma palavra.
const ORDER = shuffle(DAILY_POOL, seededRandom(20260929));
export const dailyWord = (day = localDay()) => ORDER[((dayNumber(day) % ORDER.length) + ORDER.length) % ORDER.length];

// Três passos com a mesma palavra: reconhecer, escrever e usar numa frase.
export function dailySteps(day = localDay()) {
  const word = dailyWord(day);
  const random = seededRandom(dayNumber(day));
  const others = shuffle(DAILY_POOL.filter(item => item.id !== word.id && item.pt !== word.pt), random);
  const near = [...others.filter(item => item.group === word.group), ...others.filter(item => item.group !== word.group)];
  const [before, ...rest] = word.sentence.split(word.jp);
  return [
    { kind: 'meaning', title: 'Reconhecer', question: 'O que significa esta palavra?', prompt: word.jp, reading: word.reading, choices: shuffle([word.pt, ...near.slice(0, 3).map(item => item.pt)], random), answer: word.pt },
    { kind: 'write', title: 'Escrever', question: 'Como se escreve em japonês?', prompt: word.pt, answers: [...new Set([word.reading, word.jp])], hint: word.romaji },
    { kind: 'use', title: 'Usar', question: 'Qual palavra completa a frase?', before, after: rest.join(word.jp), translation: word.translation, sentence: word.sentence, sentenceReading: word.sentenceReading, choices: shuffle([word.jp, ...near.slice(0, 2).map(item => item.jp)], random), answer: word.jp }
  ];
}

// A escrita aceita a leitura ou a forma usual, e katakana digitado em hiragana (こーひー).
export const checkWrite = (step, text) => { const typed = toHiragana(normalizeAnswer(text)); return Boolean(typed) && step.answers.some(answer => toHiragana(normalizeAnswer(answer)) === typed); };

// Só o primeiro resultado do dia fica registrado; jogar de novo é treino.
export function recordDaily(snapshot, day, score, now = Date.now()) {
  snapshot.daily ||= {};
  if (!isDay(day) || snapshot.daily[day]?.completedAt) return false;
  snapshot.daily[day] = { word: dailyWord(day).id, score: Math.max(0, Math.min(DAILY_STEPS, Math.floor(score) || 0)), completedAt: now };
  recordActivity(snapshot, 10 + 5 * snapshot.daily[day].score, now);
  return true;
}

// Dias seguidos com o desafio feito, até hoje (ou até ontem, se hoje ainda está aberto).
export function dailyStreak(snapshot, day = localDay()) {
  const done = new Set(Object.entries(snapshot.daily || {}).filter(([, item]) => item.completedAt).map(([key]) => dayNumber(key)));
  let cursor = dayNumber(day);
  if (!done.has(cursor)) cursor--;
  let streak = 0;
  while (done.has(cursor)) { streak++; cursor--; }
  return streak;
}
