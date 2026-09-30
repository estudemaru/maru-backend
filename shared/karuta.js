import { startKana } from './shiritori.js';

// かるた: o Maru lê uma palavra e a pessoa pega a carta certa entre as da mesa.
// As regras não dependem do DOM nem do áudio; a tela cuida da API de voz.

export const KARUTA_SCRIPTS = [['kana', 'Cartas em kana'], ['all', 'Cartas como se escreve (com kanji)']];
export const TABLE_SIZE = 6;

const shuffle = (list, random) => { const copy = [...list]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };

// A mesa tem a carta lida e cartas que confundem: primeiro as que começam com o
// mesmo som (o desafio real da karuta), depois as do mesmo tema, depois quaisquer.
// `sound` (quando existe) iguala cartas que soam igual, como を e お: nunca vão juntas à mesa.
const heard = item => item.sound || item.reading;
export function dealRound(target, pool, { size = TABLE_SIZE, random = Math.random } = {}) {
  const others = shuffle(pool.filter(item => item.id !== target.id && item.card !== target.card && heard(item) !== heard(target)), random);
  const picked = [];
  const pick = item => { if (!picked.some(card => card.card === item.card || heard(card) === heard(item))) picked.push(item); };
  others.filter(item => startKana(item.reading) === startKana(target.reading)).slice(0, 2).forEach(pick);
  others.filter(item => item.category === target.category && !picked.includes(item)).slice(0, 2).forEach(pick);
  for (const item of others) {
    if (picked.length >= size - 1) break;
    pick(item);
  }
  return { target, cards: shuffle([target, ...picked.slice(0, size - 1)], random) };
}

// Sempre existe uma rodada seguinte já montada, para a tela preparar o áudio antes.
export function createRounds(nextItem, pool, options = {}) {
  let upcoming = dealRound(nextItem(), pool, options);
  return {
    get upcoming() { return upcoming; },
    next() { const current = upcoming; upcoming = dealRound(nextItem(), pool, options); return current; }
  };
}

export const roundScore = (right, streak) => right ? 100 + Math.min(5, Math.max(0, streak - 1)) * 10 : 0;
