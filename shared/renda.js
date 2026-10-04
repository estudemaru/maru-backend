import { ALL_KANA, BEGINNER_KANJI } from './catalog.js';
import { LESSONS } from './curriculum.js';

// Renda (連打, "apertar sem parar"): um caractere por vez e quatro botões grandes.
// Só toque, sem teclado, para treinar kana e kanji no celular. Sem DOM: a tela
// fica em features/renda.js.
export const RENDA_SCRIPTS = [['hiragana', 'Hiragana'], ['katakana', 'Katakana'], ['kana', 'Hiragana + katakana'], ['kanji', 'Kanji'], ['all', 'Kana + kanji']];
export const RENDA_RANGES = [['basic', 'Só as 46 básicas'], ['marks', 'Básicas + ゛ e ゜'], ['all', 'Tudo, com combinações (きゃ)']];
export const RENDA_MODES = [['read', 'Ver e ler · toque no som'], ['find', 'Achar a letra · toque no caractere'], ['mix', 'Misturado']];
export const RENDA_CHOICES = 4;

const GROUPS = { basic: ['seion'], marks: ['seion', 'dakuten', 'handakuten'], all: ['seion', 'dakuten', 'handakuten', 'combined'] };
// Pares que confundem quem começa: aparecem juntos na mesa com mais frequência.
const LOOKALIKES = ['ぬめ', 'ねれわ', 'はほけ', 'るろ', 'さきち', 'あおめ', 'いり', 'こに', 'うつ', 'まも', 'しつ', 'ソンシツ', 'クケタ', 'ヌスフ', 'マムア', 'ワウフ', 'コユロ', 'チテ', 'ナメ', 'ヲラ', 'セヒ', '日月口', '木本', '人八', '二三川'];
const twins = new Map();
for (const group of LOOKALIKES) for (const char of group) twins.set(char, new Set([...(twins.get(char) || []), ...group].filter(other => other !== char)));

// を se lê o e ぢ/づ soam como じ/ず: nunca vão juntos à mesa.
const SAME_SOUND = { wo: 'o', ji: 'ji', zu: 'zu' };
const soundOf = item => item.kind === 'kanji' ? `kanji:${item.romaji}:${item.meaning}` : (SAME_SOUND[item.romaji] || item.romaji);
const romajiLabel = item => item.romaji === 'wo' ? 'o (wo)' : item.romaji;

// Dicas de memória das lições, reaproveitadas no feedback do jogo.
export const MEMORY_HINTS = new Map(LESSONS.flatMap(lesson => lesson.sections.flatMap(section => section.examples))
  .filter(example => example.note && /^[ぁ-ゖァ-ヺ]$/u.test(example.jp)).map(example => [example.jp, example.note]));

// rows/groups (opcionais) limitam o treino ao que a trilha já apresentou: fileiras básicas
// vistas até a lição e, se ela já chegou lá, as letras com ゛゜ e as combinações.
export function rendaPool({ script = 'hiragana', range = 'all', rows = null, groups: seen = [] } = {}) {
  const groups = rows ? ['seion', ...(seen.includes('dakuten') ? ['dakuten', 'handakuten'] : []), ...(seen.includes('combined') ? ['combined'] : [])] : GROUPS[range] || GROUPS.all;
  const scripts = script === 'kana' || script === 'all' ? ['hiragana', 'katakana'] : [script];
  const kana = ALL_KANA.filter(item => scripts.includes(item.script) && groups.includes(item.group) && (!rows || item.group !== 'seion' || rows.includes(item.row)))
    .map(item => ({ id: item.id, kind: 'kana', char: item.char, romaji: item.romaji, script: item.script, row: item.row, label: `${item.char} · ${romajiLabel(item)}` }));
  const kanji = script === 'kanji' || script === 'all' ? BEGINNER_KANJI.map(item => ({ id: item.id, kind: 'kanji', char: item.char, romaji: item.romaji, reading: item.reading, meaning: item.meaning, label: `${item.char} · ${item.meaning}` })) : [];
  return [...kana, ...kanji];
}

function distractors(target, pool, random) {
  const vowel = text => text.at(-1);
  const candidates = pool.filter(item => item.kind === target.kind && soundOf(item) !== soundOf(target) && item.char !== target.char);
  const priority = item => (twins.get(target.char)?.has(item.char) ? 3 : 0) + (item.kind === 'kana' && item.row === target.row ? 1.5 : 0)
    + (item.kind === 'kana' && vowel(item.romaji) === vowel(target.romaji) ? 1 : 0) + (item.script === target.script ? .5 : 0);
  const chosen = [], sounds = new Set([soundOf(target)]);
  for (const item of candidates.map(item => [item, priority(item) + random() * 2.5]).sort((a, b) => b[1] - a[1]).map(([item]) => item)) {
    if (sounds.has(soundOf(item))) continue;
    sounds.add(soundOf(item)); chosen.push(item);
    if (chosen.length === RENDA_CHOICES - 1) break;
  }
  return chosen;
}

// read: vê o caractere e escolhe o som (ou o significado, no kanji). find: o contrário.
export function rendaQuestion(item, pool, mode = 'read', random = Math.random) {
  const direction = mode === 'mix' ? (random() < .5 ? 'read' : 'find') : mode;
  const table = [item, ...distractors(item, pool, random)];
  for (let i = table.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [table[i], table[j]] = [table[j], table[i]]; }
  const face = entry => entry.kind === 'kanji' ? { main: entry.meaning, sub: `${entry.reading} · ${entry.romaji}`, lang: 'pt' } : { main: romajiLabel(entry), sub: '', lang: 'pt' };
  const glyph = entry => ({ main: entry.char, sub: '', lang: 'ja' });
  return {
    item, direction,
    prompt: direction === 'read' ? glyph(item) : face(item),
    choices: table.map(entry => ({ key: entry.id, ...(direction === 'read' ? face(entry) : glyph(entry)) })),
    answer: item.id
  };
}

// A revisão fica por caractere e direção, não pela combinação escolhida na tela: あ treinado em
// "Hiragana" ou em "Kana + kanji" é o mesmo cartão.
export const rendaReviewKey = (item, direction) => `arcade:renda:${item.kind === 'kanji' ? 'kanji' : item.script}:${direction}:${item.id}`;
export const rendaBestKey = ({ script, range, mode, duration }) => `renda:${script}:${range}:${mode}:${duration}`;
// Mesma pontuação dos outros jogos: 100 por acerto e até 50 de bônus pela sequência.
export const rendaPoints = streak => 100 + Math.min(5, Math.max(0, streak - 1)) * 10;
