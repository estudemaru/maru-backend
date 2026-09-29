import { MODULES } from './curriculum.js';
import { dealRound } from './karuta.js';
import { getPronunciation } from './pronunciation.js';
import { toHiragana } from './shiritori.js';

// Cada lição termina num jogo curto feito com os exemplos que ela acabou de mostrar.
// Ouvir: o Maru lê um exemplo e a pessoa pega a carta certa (karuta).
// Ler: a pessoa vê o exemplo em japonês e escolhe a leitura em romaji.
// Etapas de sons e conversa usam ouvir; kanji, frases e partículas usam ler.
export const LESSON_GAME_KINDS = { listen: 'Ouviu, pegou', read: 'Leu, achou' };
const LISTEN_MODULES = new Set(['start', 'hiragana', 'katakana', 'everyday', 'casual']);
export const LESSON_ROUNDS = 5;
const TABLE = 4;
// Sequências como "か　き　く", "は → ば → ぱ" ou "一　二　三" viram uma carta por item.
const SEQUENCE = /^[ぁ-ゖァ-ヺー一-龯々]+(?:(?:　| → )[ぁ-ゖァ-ヺー一-龯々]+)+$/u;
const split = (text, pattern) => String(text || '').split(pattern).map(part => part.trim()).filter(Boolean);

// O som ouvido: を é lido お, katakana soa como hiragana e ぢ/づ como じ/ず.
const sound = text => toHiragana(getPronunciation(text)?.spoken || text).replace(/ぢ/g, 'じ').replace(/づ/g, 'ず').replace(/[\s　。、！？]/g, '');

function cards(lesson) {
  const seen = new Set(), list = [];
  const add = (jp, reading, romaji, pt) => { if (!seen.has(jp)) { seen.add(jp); list.push({ id: `${lesson.id}:${list.length}`, jp, card: jp, speak: jp, reading, sound: sound(reading), romaji, pt, category: lesson.id }); } };
  for (const example of lesson.sections.flatMap(section => section.examples)) {
    const parts = split(example.jp, /　| → /), sounds = split(example.romaji, /·|→/), readings = split(example.reading, /　| → /);
    if (SEQUENCE.test(example.jp) && parts.length === sounds.length) parts.forEach((part, i) => add(part, readings.length === parts.length ? readings[i] : getPronunciation(part)?.spoken || part, sounds[i].replace(/\s*\(.*\)$/, ''), example.pt));
    else add(example.jp, example.reading || example.jp, example.romaji, example.pt);
  }
  return list;
}

export function lessonGame(lesson, { random = Math.random } = {}) {
  const module = MODULES.find(item => item.id === lesson.moduleId);
  const own = cards(lesson);
  // Lições com poucos exemplos completam a mesa com cartas das lições vizinhas da etapa.
  const neighbours = (module?.lessons || []).filter(item => item.id !== lesson.id).flatMap(item => cards({ ...item, moduleId: lesson.moduleId })).filter(card => !own.some(item => item.card === card.card));
  const kind = lesson.game || (LISTEN_MODULES.has(lesson.moduleId) ? 'listen' : 'read');
  const order = [...own];
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  const targets = order.slice(0, Math.min(LESSON_ROUNDS, order.length));
  const pool = [...own, ...neighbours];
  // Na leitura, a carta é o romaji: duas cartas com a mesma leitura não podem estar na mesa.
  const face = card => kind === 'read' ? { ...card, card: card.romaji } : card;
  const rounds = targets.map(target => dealRound(face(target), pool.map(face), { size: Math.min(TABLE, pool.length), random }));
  return { kind, title: LESSON_GAME_KINDS[kind], rounds };
}

export const lessonGameKey = lessonId => `lesson:${lessonId}`;
