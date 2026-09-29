import { KANA } from './content.js';
import { SENTENCES } from './catalog.js';
import { VOCABULARY } from './vocabulary.js';
import { PICTURE_WORDS } from './printActivities.js';

export const GAMES = [
  { id: 'sentences', title: 'Uma frase de cada vez', subtitle: 'Transcrição em japonês', description: 'Observe a frase em kana ou kanji e transcreva, no seu ritmo.', image: 'book', color: 'blue' },
  { id: 'pictures', title: 'Olhou, escreveu', subtitle: 'Vocabulário por imagens', description: 'Só a imagem. Você encontra a palavra em japonês.', image: 'apple', color: 'peach' },
  { id: 'difference', title: 'Parecidos, mas diferentes', subtitle: 'Reconhecimento de kana', description: 'シ ou ツ? Treine seu olhar para os pequenos detalhes.', image: 'cat', color: 'lilac' },
  { id: 'translate', title: 'Do japonês para você', subtitle: 'Japonês → português', description: 'Leia em japonês e escreva o significado em português.', image: 'coffee', color: 'yellow' },
  // Jogo por turnos contra o Maru: a pontuação é o tamanho da cadeia, não a taxa de acertos.
  { id: 'shiritori', kind: 'chain', title: 'Palavra puxa palavra', subtitle: 'Shiritori · しりとり', description: 'Encadeie palavras com o Maru: cada uma começa com o último som da anterior. Terminou em ん? Perdeu!', image: 'train', color: 'sage' }
];
export const SCRIPTS = [['hiragana', 'Hiragana'], ['katakana', 'Katakana'], ['kanji', 'Kanji'], ['kana', 'Kana · hira + kata'], ['all', 'Tudo']];
const kanji = /[一-龯々]/u;
const kata = /[ァ-ヺ]/u;
export const normalizeAnswer = text => String(text).normalize('NFKC').toLowerCase().replace(/[\s。、！？!?.,;:「」『』"'–—-]/gu, '');
const normalizePortuguese = text => normalizeAnswer(String(text).normalize('NFD').replace(/\p{M}/gu, '').replace(/^eu\s+/i, ''));
export function acceptsAnswer(item, text) {
  const normalize = item.language === 'pt' ? normalizePortuguese : normalizeAnswer;
  return Boolean(normalize(text)) && item.answers.some(answer => normalize(answer) === normalize(text));
}
const acceptsScript = (text, script) => script === 'all' || (script === 'kanji' ? /^[一-龯々]+$/u.test(text) : script === 'hiragana' ? !kanji.test(text) && !kata.test(text) : script === 'katakana' ? !kanji.test(text) && !/[ぁ-ゖ]/u.test(text) : !kanji.test(text));
const jpForms = (jp, reading, script) => [...new Set([jp, reading])].filter(text => acceptsScript(text, script));
const groups = [
  ['hiragana', 'ぬねれ', 'ぬ tem um laço; ね e れ começam com um traço vertical.'],
  ['hiragana', 'はほ', 'ほ tem um traço horizontal a mais.'],
  ['hiragana', 'るろ', 'る termina com um pequeno laço; ろ não.'],
  ['hiragana', 'さき', 'き tem duas linhas horizontais; さ tem uma.'],
  ['hiragana', 'あお', 'Observe o pequeno traço separado no alto de お.'],
  ['hiragana', 'わねれ', 'ね termina com um laço; わ tem uma curva ampla à direita.'],
  ['katakana', 'シツ', 'Em シ, os pequenos traços se alinham mais na vertical; em ツ, na horizontal.'],
  ['katakana', 'ソン', 'Compare o início dos traços: ソ desce da direita; ン sobe da esquerda.'],
  ['katakana', 'クケ', 'ケ tem um traço a mais à esquerda.'],
  ['katakana', 'ヌス', 'ヌ tem traços que se cruzam; ス se abre no final.'],
  ['katakana', 'マム', 'ム fecha um pequeno canto na parte inferior.'],
  ['katakana', 'ワウフ', 'ウ tem um pequeno traço no alto; ワ tem um traço à esquerda.']
];
export function buildPool({ game = 'sentences', script = 'all' } = {}) {
  // Old repetition links use the transcription catalogue now.
  if (game === 'repeat') game = 'sentences';
  if (game === 'pictures') return PICTURE_WORDS.flatMap(picture => {
    const word = VOCABULARY.find(word => word.id === picture.wordId);
    const answers = jpForms(word.jp, word.reading, script);
    return answers.length ? [{ id: word.id, label: word.pt, prompt: '', answers, image: picture.id, category: kanji.test(answers[0]) ? 'kanji' : kata.test(answers[0]) ? 'katakana' : 'hiragana', hint: word.note, language: 'ja' }] : [];
  });
  if (game === 'difference') return groups.filter(([group]) => script === 'all' || script === 'kana' || group === script).flatMap(([category, chars, hint], index) => [...chars].map(char => {
    const kana = KANA.find(item => item.char === char);
    return { id: `${index}-${char}`, label: `${char} · ${kana.romaji}`, prompt: kana.romaji, answers: [char], choices: [...chars], category, hint, language: 'ja' };
  }));
  // No shiritori, só as palavras do vocabulário do Maru entram na revisão.
  if (game === 'shiritori') return VOCABULARY.filter(word => ['people', 'food', 'places', 'things', 'time'].includes(word.group)).map(word => ({ id: word.id, label: `${word.jp} · ${word.pt}`, answers: [word.reading], language: 'ja' }));
  if (!['sentences','translate'].includes(game)) return [];
  return SENTENCES.map(sentence => {
    const jp = sentence.tokens.map(token => token[0]).join('');
    const reading = sentence.tokens.map(token => token[3] || token[0]).join('');
    const prompt = (script === 'kana' ? reading : jp) + '。';
    if (game === 'translate') {
      const model = sentence.prompt.replace(/\s*\((?:sem pronome|use [^)]+)\)/gu, '').replace('(a)', '');
      const variants = {
        origin: ['Sou brasileira.', 'Sou do Brasil.'], identity: ['Sou aluno.', 'Sou aluna.'],
        water: ['Tomo água.'], tea: ['Tomo chá.'], school: ['Vou à escola.', 'Vou para escola.'],
        reading: ['Leio livro.'], station: ['Onde é a estação?', 'Onde está a estação?'],
        'where-bathroom': ['Onde é o banheiro?', 'Onde está o banheiro?'],
        'friend-talk': ['Converso com uma amiga.', 'Falo com um amigo.', 'Falo com uma amiga.'],
        'cat-here': ['Tem um gato aqui.', 'Aqui há um gato.'], 'book-here': ['Tem um livro aqui.', 'Aqui há um livro.'],
        'coffee-unit': ['Um café, por favor.'], 'listen-music': ['Escuto música.'],
        tasty: ['Este pão é delicioso.', 'Esse pão é gostoso.'], quiet: ['Aqui é calmo.']
      };
      return { id: sentence.id, label: sentence.title, prompt, answers: [model, ...(variants[sentence.id] || [])],
        category: sentence.pattern, instruction: 'Traduza a frase para o português.', language: 'pt',
        hint: 'Este treino compara respostas com modelos e algumas variantes. Uma tradução diferente também pode estar correta.' };
    }
    return { id: sentence.id, label: sentence.title, prompt, answers: [prompt], category: sentence.pattern,
      instruction: 'Transcreva a frase exatamente como ela aparece.',
      hint: 'Compare os caracteres e as partículas com o modelo. Espaços e pontuação não alteram o resultado.', language: 'ja' };
  });
}
// A shuffled bag covers the full catalogue and brings difficult items back once per cycle.
export function makeDeck(pool, reviews = {}, prefix = '', random = Math.random) {
  let bag = [], previous = '';
  return () => {
    if (!bag.length) {
      bag = [...pool, ...pool.filter(item => {
        const stats = reviews[prefix + item.id];
        return stats?.attempts >= 2 && stats.correct / stats.attempts < 0.6;
      })];
      for (let i = bag.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [bag[i], bag[j]] = [bag[j], bag[i]]; }
    }
    if (bag.length > 1 && bag.at(-1).id === previous) {
      const other = bag.findIndex(item => item.id !== previous);
      if (other >= 0) [bag[other], bag[bag.length - 1]] = [bag.at(-1), bag[other]];
    }
    const item = bag.pop(); previous = item?.id; return item;
  };
}
export const reviewPrefix = config => `arcade:${config.game}:${config.script}:${config.game === 'sentences' ? 'transcribe' : config.game === 'translate' ? 'ja-pt' : 'write'}:`;
export function insights(pool, reviews, prefix) {
  const items = pool.map(item => ({ ...item, ...reviews[prefix + item.id] })).filter(item => item.attempts >= 3).map(item => ({ ...item, accuracy: Math.round(100 * item.correct / item.attempts) }));
  return { strong: items.filter(item => item.accuracy >= 80).sort((a,b) => b.accuracy-a.accuracy).slice(0, 4), weak: items.filter(item => item.accuracy < 80).sort((a,b) => a.accuracy-b.accuracy).slice(0, 4) };
}
export function personalBest(snapshot, key, score, now = Date.now()) {
  snapshot.arcade ||= {};
  const previous = snapshot.arcade[key]?.score || 0;
  if (score > previous) snapshot.arcade[key] = { score, updatedAt: now };
  return score > previous;
}

export const activeReviews = reviews => Object.entries(reviews).filter(([key]) => GAMES.some(game => key.startsWith(`arcade:${game.id}:`) && (game.id !== 'sentences' || key.split(':')[3] === 'transcribe') && (game.id !== 'translate' || key.split(':')[3] === 'ja-pt')));
