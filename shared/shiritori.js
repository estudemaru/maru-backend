import { VOCABULARY } from './vocabulary.js';
import { kanaToRomaji } from './romaji.js';

// しりとり: cada palavra começa com o último kana da anterior. Quem termina em ん perde.
// As regras não dependem do DOM; a lista de palavras é carregada pela tela e passada aqui.

export const LEVELS = [
  ['calm', 'Maru tranquilo · palavras curtas e do dia a dia'],
  ['sharp', 'Maru esperto · o dicionário inteiro']
];
const SMALL = { 'ぁ':'あ','ぃ':'い','ぅ':'う','ぇ':'え','ぉ':'お','っ':'つ','ゃ':'や','ゅ':'ゆ','ょ':'よ','ゎ':'わ','ゕ':'か','ゖ':'け' };
// Pares tratados como o mesmo som no encadeamento.
const SAME_SOUND = { 'ぢ':'じ', 'づ':'ず', 'を':'お' };
const NOUN_GROUPS = new Set(['people', 'food', 'places', 'things', 'time']);

export const toHiragana = text => String(text).replace(/[ァ-ヶ]/gu, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
const sound = kana => SAME_SOUND[kana] || kana;

// Último kana que a próxima palavra deve usar. ー é ignorado (コーヒー → ひ) e
// kana pequeno vira grande (でんしゃ → や).
export function chainKana(reading) {
  const chars = [...toHiragana(reading)].filter(char => char !== 'ー');
  const last = chars.at(-1) || '';
  return sound(SMALL[last] || last);
}
export const startKana = reading => sound([...toHiragana(reading)][0] || '');
export const endsInN = reading => chainKana(reading) === 'ん';

const clean = text => String(text).normalize('NFKC').trim().replace(/[\s・。、！？!?.,「」'"-]/gu, '');
const romajiKey = text => clean(text).toLowerCase().replace(/[āâ]/g, 'aa').replace(/[īî]/g, 'ii').replace(/[ūû]/g, 'uu').replace(/[ēê]/g, 'ee').replace(/[ōô]/g, 'ou');

// entries: [[leitura, forma escrita?], ...] do arquivo shiritori-words.json.
export function createDictionary(entries = [], vocabulary = VOCABULARY) {
  const byReading = new Map(), byWritten = new Map(), all = [];
  const add = word => {
    const key = toHiragana(word.reading);
    const list = byReading.get(key) || [];
    // Uma palavra do Maru substitui a mesma leitura vinda do dicionário.
    if (word.vocabId) { const i = list.findIndex(item => !item.vocabId && item.written === word.written); if (i >= 0) { all.splice(all.indexOf(list[i]), 1); list.splice(i, 1); } }
    else if (list.some(item => item.written === word.written)) return;
    list.push(word); byReading.set(key, list); all.push(word);
    if (!byWritten.has(word.written)) byWritten.set(word.written, word);
  };
  for (const [reading, written = reading] of entries) add({ reading, written, key: toHiragana(reading) });
  for (const item of vocabulary.filter(item => NOUN_GROUPS.has(item.group))) add({ reading: item.reading, written: item.jp, key: toHiragana(item.reading), vocabId: item.id, pt: item.pt });
  let romaji;
  return {
    size: all.length,
    words: all,
    lookup(input) {
      const text = clean(input);
      if (!text) return null;
      if (/^[ぁ-ゖァ-ヺー]+$/u.test(text)) {
        const list = byReading.get(toHiragana(text)) || [];
        return list.find(item => item.vocabId) || list.find(item => item.reading === text) || list[0] || null;
      }
      if (/^[a-z]+$/iu.test(text)) {
        if (!romaji) { romaji = new Map(); for (const word of all) { const key = kanaToRomaji(toHiragana(word.reading)); if (!romaji.has(key) || word.vocabId) romaji.set(key, word); } }
        return romaji.get(romajiKey(text)) || romaji.get(romajiKey(text).replace(/ou/g, 'oo')) || null;
      }
      return byWritten.get(text) || null;
    }
  };
}

const shuffle = (list, random) => { const copy = [...list]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };

// Quantas palavras começam com cada kana: o Maru esperto prefere deixar finais difíceis.
function startCounts(words) {
  const counts = new Map();
  for (const word of words) counts.set(startKana(word.key), (counts.get(startKana(word.key)) || 0) + 1);
  return counts;
}

export function createShiritori({ dictionary, level = 'calm', random = Math.random } = {}) {
  if (!dictionary?.size) throw new Error('Dicionário vazio.');
  const calm = level !== 'sharp';
  const botWords = dictionary.words.filter(word => word.vocabId || (calm ? [...word.key].length <= 4 : true));
  const counts = startCounts(dictionary.words);
  const history = [], used = new Set();
  let required = '', phase = 'ready', result = null, playerWords = 0;

  function place(word, by) {
    history.push({ ...word, by });
    used.add(word.key);
    required = chainKana(word.key);
    // A palavra terminada em ん entra na cadeia, mas não conta para o recorde.
    if (by === 'player' && !endsInN(word.key)) playerWords++;
  }
  function botMove() {
    const turn = playerWords;
    // O Maru tranquilo "esquece" palavras com mais frequência conforme a cadeia cresce.
    const giveUp = calm ? (turn < 4 ? 0 : Math.min(0.3, 0.04 * (turn - 3))) : (turn < 12 ? 0 : 0.03);
    if (random() < giveUp) return null;
    const options = botWords.filter(word => (!required || startKana(word.key) === required) && !used.has(word.key) && !endsInN(word.key));
    if (!options.length) return null;
    // Tranquilo: palavras do Maru, curtas e escritas só em kana. Esperto: finais com poucas saídas.
    const score = word => (word.vocabId ? 3 : 0) + (calm ? ([...word.key].length <= 3 ? 1 : 0) + (word.written === word.reading ? 1 : 0) : 2 / Math.max(1, Math.log2(counts.get(chainKana(word.key)) || 1))) + random() * 2;
    return shuffle(options, random).sort((a, b) => score(b) - score(a))[0];
  }
  function over(winner, reason) { phase = 'over'; result = { winner, reason, chain: playerWords }; return result; }

  return {
    get history() { return history.slice(); },
    get required() { return required; },
    get phase() { return phase; },
    get result() { return result; },
    get chain() { return playerWords; },
    start() {
      if (phase !== 'ready') return null;
      const first = botMove();
      place(first, 'bot'); phase = 'player';
      return first;
    },
    // Respostas inválidas não custam nada: a pessoa tenta de novo.
    play(input) {
      if (phase !== 'player') return { ok: false, reason: 'over' };
      if (!clean(input)) return { ok: false, reason: 'empty' };
      const word = dictionary.lookup(input);
      if (!word) return { ok: false, reason: 'unknown' };
      if (startKana(word.key) !== required) return { ok: false, reason: 'start', word };
      if (used.has(word.key)) return { ok: false, reason: 'repeat', word };
      place(word, 'player');
      if (endsInN(word.key)) return { ok: true, word, result: over('bot', 'n') };
      const reply = botMove();
      if (!reply) return { ok: true, word, result: over('player', 'bot-stuck') };
      place(reply, 'bot');
      return { ok: true, word, reply };
    },
    giveUp() { return phase === 'player' ? over('bot', 'gave-up') : null; },
    timeout() { return phase === 'player' ? over('bot', 'time') : null; },
    // Uma dica: uma palavra do Maru ou curta que serviria agora.
    hint() {
      const options = dictionary.words.filter(word => startKana(word.key) === required && !used.has(word.key) && !endsInN(word.key));
      return options.find(word => word.vocabId) || options.sort((a, b) => a.key.length - b.key.length)[0] || null;
    }
  };
}
