import { getTheme, getLesson, moduleOrder, katakanaAsPicture } from './curriculum.js';
import { dealRound } from './karuta.js';
import { getPronunciation } from './pronunciation.js';
import { toHiragana } from './shiritori.js';

// Cada lição termina num jogo curto feito com os exemplos que ela acabou de mostrar.
// Ouvir: o Maru lê um exemplo e a pessoa pega a carta certa (karuta).
// Ler: a pessoa vê o exemplo em japonês e escolhe a leitura em romaji.
// Temas de sons e conversa usam ouvir; kanji, frases e partículas usam ler.
export const LESSON_GAME_KINDS = { listen: 'Ouviu, pegou', read: 'Leu, achou' };
const LISTEN_THEMES = new Set(['start', 'hiragana', 'katakana', 'everyday', 'casual']);
export const LESSON_ROUNDS = 5;
export const lessonGameKind = lesson => lesson.game || (LISTEN_THEMES.has(lesson.theme) ? 'listen' : 'read');
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
  const theme = getTheme(lesson.theme);
  // Só entra o que a trilha já mostrou: nas unidades 3 e 4, nada em katakana.
  const readable = card => !katakanaAsPicture(lesson) || !/[\u30A1-\u30FA]/u.test(card.jp);
  const own = cards(lesson).filter(readable);
  // Lições com poucos exemplos completam a mesa com cartas de lições do mesmo tema, desta
  // unidade ou de uma anterior (o tema pode ter lições em unidades mais adiante).
  const earlier = item => item.id !== lesson.id && moduleOrder(getLesson(item.id).moduleId) <= moduleOrder(lesson.moduleId);
  const neighbours = (theme?.lessons || []).filter(earlier).flatMap(item => cards(item)).filter(readable).filter(card => !own.some(item => item.card === card.card));
  const kind = lessonGameKind(lesson);
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
