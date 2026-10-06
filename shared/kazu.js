import { rendaPoints } from './renda.js';

// "Quanto, quando, qual" (数, かず): números, horas, datas, contadores e これ/それ/あれ.
// Sem DOM: a tela fica em features/kazu.js. Leituras escritas à mão, inclusive as
// irregulares (よじ, ついたち, さんぼん). `traps` são erros comuns de quem começa;
// `alt` são outras leituras aceitas, que nunca aparecem como alternativa errada.
export const KAZU_CATEGORIES = [
  ['numbers', 'Números e preços'], ['time', 'Horas e minutos'], ['week', 'Dias da semana'], ['months', 'Meses'],
  ['dates', 'Dias do mês'], ['counters', 'Jeitos de contar'], ['pointing', 'Isto, isso e aquilo'], ['all', 'Tudo misturado']
];
export const KAZU_MODES = [['read', 'Ver e ler · toque na leitura'], ['meaning', 'Do português · toque no japonês'], ['mix', 'Misturado']];
export const KAZU_CHOICES = 4;

const ONES = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
const ONES_R = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyū'];
const HUNDREDS = ['', 'ひゃく', 'にひゃく', 'さんびゃく', 'よんひゃく', 'ごひゃく', 'ろっぴゃく', 'ななひゃく', 'はっぴゃく', 'きゅうひゃく'];
const HUNDREDS_R = ['', 'hyaku', 'nihyaku', 'sanbyaku', 'yonhyaku', 'gohyaku', 'roppyaku', 'nanahyaku', 'happyaku', 'kyūhyaku'];
const THOUSANDS = ['', 'せん', 'にせん', 'さんぜん', 'よんせん', 'ごせん', 'ろくせん', 'ななせん', 'はっせん', 'きゅうせん'];
const THOUSANDS_R = ['', 'sen', 'nisen', 'sanzen', 'yonsen', 'gosen', 'rokusen', 'nanasen', 'hassen', 'kyūsen'];
// O erro mais comum: montar centenas e milhares sem a mudança de som (さんひゃく, はちせん).
const NAIVE_HUNDREDS = HUNDREDS.map((value, digit) => digit > 1 ? ONES[digit] + 'ひゃく' : value);
const NAIVE_THOUSANDS = THOUSANDS.map((value, digit) => digit > 1 ? ONES[digit] + 'せん' : value);

function compose(n, hundreds = HUNDREDS, thousands = THOUSANDS) {
  const man = Math.floor(n / 10000), th = Math.floor(n / 1000) % 10, h = Math.floor(n / 100) % 10, t = Math.floor(n / 10) % 10, o = n % 10;
  const tens = digit => digit === 1 ? 'じゅう' : digit ? ONES[digit] + 'じゅう' : '';
  return (man ? ONES[man] + 'まん' : '') + thousands[th] + hundreds[h] + tens(t) + ONES[o];
}
// De 1 a 99.999. O japonês agrupa de dez mil em dez mil: 12.000 é いちまんにせん.
export const numberReading = n => compose(n);
export function numberRomaji(n) {
  const man = Math.floor(n / 10000), th = Math.floor(n / 1000) % 10, h = Math.floor(n / 100) % 10, t = Math.floor(n / 10) % 10, o = n % 10;
  const tens = t === 1 ? 'jū' : t ? ONES_R[t] + 'jū' : '';
  return [man ? ONES_R[man] + 'man' : '', THOUSANDS_R[th], HUNDREDS_R[h], tens + ONES_R[o]].filter(Boolean).join(' ');
}
const unique = list => [...new Set(list)];
function numberTraps(n) {
  const traps = [compose(n, NAIVE_HUNDREDS, NAIVE_THOUSANDS)];
  if (n === 100) traps.push('いちひゃく');
  if (n === 10000) traps.push('まん', 'じゅうせん');
  // 14 e 41, 47 e 74: a ordem dos blocos muda o número.
  if (n >= 11 && n <= 99 && n % 10 && n % 11) traps.push(numberReading(Number(String(n).split('').reverse().join(''))));
  return unique(traps).filter(trap => trap !== numberReading(n));
}

const PT_NUMBERS = { 11: 'onze', 14: 'catorze', 19: 'dezenove', 20: 'vinte', 24: 'vinte e quatro', 40: 'quarenta', 47: 'quarenta e sete', 70: 'setenta', 99: 'noventa e nove', 100: 'cem', 150: 'cento e cinquenta', 300: 'trezentos', 340: 'trezentos e quarenta', 600: 'seiscentos', 800: 'oitocentos', 1000: 'mil', 1500: 'mil e quinhentos', 2600: 'dois mil e seiscentos', 3000: 'três mil', 8000: 'oito mil', 10000: 'dez mil', 12000: 'doze mil' };
const NUMBERS = Object.entries(PT_NUMBERS).map(([value, pt]) => {
  const n = Number(value);
  return { id: `num-${n}`, category: 'numbers', group: n < 100 ? 'tens' : n < 1000 ? 'hundreds' : n < 10000 ? 'thousands' : 'man', jp: String(n), reading: numberReading(n), romaji: numberRomaji(n), pt, traps: numberTraps(n), alt: [] };
});
const PRICES = [[380, 'trezentos e oitenta ienes'], [650, 'seiscentos e cinquenta ienes'], [1200, 'mil e duzentos ienes'], [3800, 'três mil e oitocentos ienes']].map(([n, pt]) => ({
  id: `yen-${n}`, category: 'numbers', group: 'yen', jp: `${n}円`, reading: numberReading(n) + 'えん', romaji: numberRomaji(n) + ' en', pt, traps: numberTraps(n).map(trap => trap + 'えん'), alt: []
}));

// Horas: よじ, しちじ e くじ são as leituras especiais; minutos alternam ふん e ぷん.
const HOURS = ['', 'いちじ', 'にじ', 'さんじ', 'よじ', 'ごじ', 'ろくじ', 'しちじ', 'はちじ', 'くじ', 'じゅうじ', 'じゅういちじ', 'じゅうにじ'];
const HOURS_R = ['', 'ichiji', 'niji', 'sanji', 'yoji', 'goji', 'rokuji', 'shichiji', 'hachiji', 'kuji', 'jūji', 'jūichiji', 'jūniji'];
const HOUR_TRAPS = { 4: ['よんじ', 'しじ'], 9: ['きゅうじ'] };
const MINUTE_ONES = ['', 'いっぷん', 'にふん', 'さんぷん', 'よんぷん', 'ごふん', 'ろっぷん', 'ななふん', 'はっぷん', 'きゅうふん'];
const MINUTE_ONES_R = ['', 'ippun', 'nifun', 'sanpun', 'yonpun', 'gofun', 'roppun', 'nanafun', 'happun', 'kyūfun'];
const MINUTE_NAIVE = ['', 'いちふん', 'にぷん', 'さんふん', 'よんふん', 'ごぷん', 'ろくふん', 'ななぷん', 'はちぷん', 'きゅうぷん'];
function minuteReading(m) {
  const t = Math.floor(m / 10), o = m % 10;
  const tens = t === 1 ? 'じゅう' : t ? ONES[t] + 'じゅう' : '';
  const tensR = t === 1 ? 'jū' : t ? ONES_R[t] + 'jū' : '';
  if (!o) return { reading: tens.replace(/じゅう$/, 'じゅっぷん'), romaji: tensR.replace(/jū$/, 'juppun'), alt: [tens.replace(/じゅう$/, 'じっぷん')], traps: [tens + 'ふん'] };
  return { reading: tens + MINUTE_ONES[o], romaji: tensR + MINUTE_ONES_R[o], alt: o === 8 ? [tens + 'はちふん'] : o === 7 ? [tens + 'しちふん'] : [], traps: [tens + MINUTE_NAIVE[o]] };
}
const TIMES = [
  [1, 0, 'uma hora'], [4, 0, 'quatro horas'], [7, 0, 'sete horas'], [9, 0, 'nove horas'], [12, 0, 'meio-dia (doze horas)'],
  [3, 30, 'três e meia'], [4, 30, 'quatro e meia'], [9, 30, 'nove e meia'],
  [1, 5, 'uma e cinco'], [2, 10, 'duas e dez'], [3, 15, 'três e quinze'], [4, 20, 'quatro e vinte'], [6, 45, 'seis e quarenta e cinco'],
  [8, 40, 'oito e quarenta'], [10, 1, 'dez e um'], [11, 3, 'onze e três'], [12, 6, 'meio-dia e seis'], [5, 8, 'cinco e oito']
].map(([h, m, pt]) => {
  const half = m === 30, minute = m && !half ? minuteReading(m) : null;
  const hourTraps = HOUR_TRAPS[h] || [];
  const tail = half ? 'はん' : minute ? minute.reading : '';
  return {
    id: `time-${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}`, category: 'time', group: half ? 'half' : m ? 'minutes' : 'hour',
    jp: `${h}時${half ? '半' : m ? m + '分' : ''}`, clock: `${h}:${String(m).padStart(2, '0')}`,
    reading: HOURS[h] + tail, romaji: HOURS_R[h] + (half ? ' han' : minute ? ' ' + minute.romaji : ''), pt,
    alt: minute ? minute.alt.map(value => HOURS[h] + value) : [],
    traps: [...hourTraps.map(trap => trap + tail), ...(minute ? minute.traps.map(trap => HOURS[h] + trap) : [])]
  };
});
const AMPM = [
  { id: 'time-am7', jp: '午前7時', reading: 'ごぜんしちじ', romaji: 'gozen shichiji', pt: 'sete da manhã', traps: ['ごごしちじ'] },
  { id: 'time-pm3', jp: '午後3時', reading: 'ごごさんじ', romaji: 'gogo sanji', pt: 'três da tarde', traps: ['ごぜんさんじ'] },
  { id: 'time-pm930', jp: '午後9時半', reading: 'ごごくじはん', romaji: 'gogo kuji han', pt: 'nove e meia da noite', traps: ['ごごきゅうじはん', 'ごぜんくじはん'] }
].map(item => ({ ...item, category: 'time', group: 'ampm', alt: [] }));

// Cada dia é um elemento da natureza + 曜日. As armadilhas usam a leitura do kanji sozinho.
const WEEK = [
  ['mon', '月曜日', 'げつようび', 'getsuyōbi', 'segunda-feira', 'つきようび', '月 é lua: o dia da lua.'],
  ['tue', '火曜日', 'かようび', 'kayōbi', 'terça-feira', 'ひようび', '火 é fogo.'],
  ['wed', '水曜日', 'すいようび', 'suiyōbi', 'quarta-feira', 'みずようび', '水 é água; aqui se lê すい.'],
  ['thu', '木曜日', 'もくようび', 'mokuyōbi', 'quinta-feira', 'きようび', '木 é árvore; aqui se lê もく.'],
  ['fri', '金曜日', 'きんようび', "kin'yōbi", 'sexta-feira', 'かねようび', '金 é ouro (metal).'],
  ['sat', '土曜日', 'どようび', 'doyōbi', 'sábado', 'つちようび', '土 é terra.'],
  ['sun', '日曜日', 'にちようび', 'nichiyōbi', 'domingo', 'ひようび', '日 é sol: o dia do sol.']
].map(([id, jp, reading, romaji, pt, trap, hint]) => ({ id: `week-${id}`, category: 'week', group: 'day', jp, reading, romaji, pt, hint, traps: [trap], alt: [] }));
const RELATIVE = [
  ['today', '今日', 'きょう', 'kyō', 'hoje'], ['tomorrow', '明日', 'あした', 'ashita', 'amanhã'], ['yesterday', '昨日', 'きのう', 'kinō', 'ontem']
].map(([id, jp, reading, romaji, pt]) => ({ id: `week-${id}`, category: 'week', group: 'relative', jp, reading, romaji, pt, hint: 'Leitura especial: aprenda a palavra inteira.', traps: [], alt: [] }));

const MONTH_PT = ['', 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const MONTH_READING = { 4: ['しがつ', 'shigatsu', ['よんがつ']], 7: ['しちがつ', 'shichigatsu', ['なながつ']], 9: ['くがつ', 'kugatsu', ['きゅうがつ']] };
const MONTHS = MONTH_PT.slice(1).map((pt, index) => {
  const m = index + 1, special = MONTH_READING[m];
  const reading = special ? special[0] : (m === 10 ? 'じゅう' : m > 10 ? 'じゅう' + ONES[m - 10] : ONES[m]) + 'がつ';
  const romaji = special ? special[1] : (m === 10 ? 'jū' : m > 10 ? 'jū' + ONES_R[m - 10] : ONES_R[m]) + 'gatsu';
  return { id: `month-${m}`, category: 'months', group: special ? 'special' : 'regular', jp: `${m}月`, reading, romaji, pt, traps: special ? special[2] : [], alt: [], hint: special ? 'Leitura especial, como nas horas.' : '' };
});

// Os dias 1 a 10, 14, 20 e 24 têm nomes próprios; os outros são número + にち.
const DATES = [
  [1, 'ついたち', 'tsuitachi', ['いちにち'], 'いちにち também existe, mas quer dizer “um dia” de duração.'],
  [2, 'ふつか', 'futsuka', ['ににち']], [3, 'みっか', 'mikka', ['さんにち']], [4, 'よっか', 'yokka', ['よんにち', 'ようか'], 'Cuidado: ようか é o dia 8.'],
  [5, 'いつか', 'itsuka', ['ごにち']], [6, 'むいか', 'muika', ['ろくにち']], [7, 'なのか', 'nanoka', ['ななにち']],
  [8, 'ようか', 'yōka', ['はちにち', 'よっか'], 'Cuidado: よっか, com っ, é o dia 4.'], [9, 'ここのか', 'kokonoka', ['きゅうにち']], [10, 'とおか', 'tōka', ['じゅうにち']],
  [11, 'じゅういちにち', 'jūichinichi', []], [14, 'じゅうよっか', 'jūyokka', ['じゅうよんにち']], [15, 'じゅうごにち', 'jūgonichi', []],
  [20, 'はつか', 'hatsuka', ['にじゅうにち', 'ふつか'], 'Dia 20 tem nome próprio: はつか.'], [24, 'にじゅうよっか', 'nijūyokka', ['にじゅうよんにち']],
  [25, 'にじゅうごにち', 'nijūgonichi', []], [30, 'さんじゅうにち', 'sanjūnichi', []], [31, 'さんじゅういちにち', 'sanjūichinichi', []]
].map(([d, reading, romaji, traps, hint = '']) => ({ id: `date-${d}`, category: 'dates', group: d <= 10 || [14, 20, 24].includes(d) ? 'native' : 'regular', jp: `${d}日`, reading, romaji, pt: `dia ${d} do mês`, traps, alt: [], hint }));

// Contadores: つ para coisas em geral, 人 pessoas, 本 compridos, 枚 finos, 匹 bichos pequenos.
const COUNTERS = [
  ['tsu', 'つ', [[1, 'ひとつ', 'hitotsu', 'uma maçã', ['いちつ']], [2, 'ふたつ', 'futatsu', 'dois cafés', ['につ']], [3, 'みっつ', 'mittsu', 'três bolos', ['さんつ', 'みっか']], [4, 'よっつ', 'yottsu', 'quatro ovos', ['よんつ', 'よっか']], [5, 'いつつ', 'itsutsu', 'cinco maçãs', ['ごつ', 'いつか']], [6, 'むっつ', 'muttsu', 'seis bolinhos', ['ろくつ', 'むいか']], [8, 'やっつ', 'yattsu', 'oito ovos', ['はちつ', 'ようか']]]],
  ['nin', '人', [[1, 'ひとり', 'hitori', 'uma pessoa', ['いちにん']], [2, 'ふたり', 'futari', 'duas pessoas', ['ににん']], [3, 'さんにん', 'sannin', 'três pessoas', ['みっつ']], [4, 'よにん', 'yonin', 'quatro pessoas', ['よんにん']], [5, 'ごにん', 'gonin', 'cinco pessoas', []]]],
  ['hon', '本', [[1, 'いっぽん', 'ippon', 'um lápis', ['いちほん']], [2, 'にほん', 'nihon', 'duas garrafas', ['にぼん']], [3, 'さんぼん', 'sanbon', 'três guarda-chuvas', ['さんほん', 'さんぽん']], [4, 'よんほん', 'yonhon', 'quatro canetas', ['よんぼん']], [6, 'ろっぽん', 'roppon', 'seis lápis', ['ろくほん']], [10, 'じゅっぽん', 'juppon', 'dez garrafas', ['じゅうほん'], ['じっぽん']]]],
  ['mai', '枚', [[1, 'いちまい', 'ichimai', 'uma folha de papel', ['いっまい']], [2, 'にまい', 'nimai', 'dois selos', []], [3, 'さんまい', 'sanmai', 'três ingressos', ['さんばい']], [4, 'よんまい', 'yonmai', 'quatro fotos', []], [5, 'ごまい', 'gomai', 'cinco camisetas', []]]],
  ['hiki', '匹', [[1, 'いっぴき', 'ippiki', 'um gato', ['いちひき']], [2, 'にひき', 'nihiki', 'dois cachorros', ['にびき']], [3, 'さんびき', 'sanbiki', 'três gatos', ['さんひき', 'さんぴき']], [4, 'よんひき', 'yonhiki', 'quatro cachorros', []], [6, 'ろっぴき', 'roppiki', 'seis gatos', ['ろくひき']], [10, 'じゅっぴき', 'juppiki', 'dez cachorros', ['じゅうひき'], ['じっぴき']]]]
].flatMap(([counter, mark, entries]) => entries.map(([count, reading, romaji, pt, traps, alt = []]) => ({
  id: `ctr-${counter}-${count}`, category: 'counters', group: counter, counter, count, jp: `${count}${mark}`, reading, romaji, pt, traps, alt
})));
const COUNTER_HINT = { tsu: 'つ conta coisas em geral: ひとつ, ふたつ, みっつ…', nin: '人 conta pessoas: ひとり e ふたり são especiais.', hon: '本 conta coisas compridas.', mai: '枚 conta coisas finas e planas.', hiki: '匹 conta bichos pequenos.' };
COUNTERS.forEach(item => { item.hint = COUNTER_HINT[item.counter]; });

// Isto, isso, aquilo: こ perto de quem fala, そ perto de quem ouve, あ longe dos dois, ど pergunta.
const POINTING = [
  ['thing', [['kore', 'これ', 'kore', 'isto (perto de mim)'], ['sore', 'それ', 'sore', 'isso (perto de você)'], ['are', 'あれ', 'are', 'aquilo (longe de nós dois)'], ['dore', 'どれ', 'dore', 'qual? (entre vários)']]],
  ['noun', [['kono', 'この本', 'kono hon', 'este livro'], ['sono', 'その本', 'sono hon', 'esse livro (perto de você)'], ['ano', 'あの本', 'ano hon', 'aquele livro (lá longe)'], ['dono', 'どの本', 'dono hon', 'qual livro?']]],
  ['place', [['koko', 'ここ', 'koko', 'aqui'], ['soko', 'そこ', 'soko', 'aí (perto de você)'], ['asoko', 'あそこ', 'asoko', 'ali (longe de nós dois)'], ['doko', 'どこ', 'doko', 'onde?']]],
  ['polite', [['kochira', 'こちら', 'kochira', 'por aqui (jeito educado)'], ['sochira', 'そちら', 'sochira', 'por aí, do seu lado (jeito educado)'], ['achira', 'あちら', 'achira', 'por ali, lá (jeito educado)'], ['dochira', 'どちら', 'dochira', 'onde? qual? (jeito educado)']]],
  ['casual', [['kocchi', 'こっち', 'kocchi', 'pra cá (casual)'], ['socchi', 'そっち', 'socchi', 'pra aí (casual)'], ['acchi', 'あっち', 'acchi', 'pra lá (casual)'], ['docchi', 'どっち', 'docchi', 'qual dos dois? (casual)']]]
].flatMap(([group, entries]) => entries.map(([id, jp, romaji, pt]) => ({
  id: `pt-${id}`, category: 'pointing', group, jp, reading: jp.replace('本', 'ほん'), romaji, pt, traps: [], alt: []
})));

export const KAZU_ITEMS = [...NUMBERS, ...PRICES, ...TIMES, ...AMPM, ...WEEK, ...RELATIVE, ...MONTHS, ...DATES, ...COUNTERS, ...POINTING]
  .map(item => ({ hint: '', ...item, speak: /[ぁ-ヺ一-龯]/u.test(item.jp) ? item.jp : item.reading }));
export const kazuItem = id => KAZU_ITEMS.find(item => item.id === id);
export const kazuPool = (category = 'all') => category === 'all' ? KAZU_ITEMS : KAZU_ITEMS.filter(item => item.category === category);

// No sentido "do português", dias da semana, contadores e これ/それ/あれ mostram a escrita;
// os números, horas e datas mostram a leitura (é o que se ouve na rua).
const FORM_ANSWERS = new Set(['week', 'counters', 'pointing']);
const shuffle = (list, random) => { const copy = [...list]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };

export function kazuQuestion(item, pool, mode = 'read', random = Math.random) {
  const direction = mode === 'mix' ? (random() < .5 ? 'read' : 'meaning') : mode;
  const showsForm = direction === 'meaning' && FORM_ANSWERS.has(item.category);
  const showsPt = direction === 'read' && item.category === 'pointing';
  const face = entry => showsPt ? { main: entry.pt, sub: '', lang: 'pt' } : showsForm ? { main: entry.jp, sub: entry.jp === entry.reading ? '' : entry.reading, lang: 'ja' } : { main: entry.reading, sub: '', lang: 'ja' };
  const correct = { key: item.id, ...face(item) };
  // Nada que também esteja certo pode ir para a mesa: a resposta e as leituras alternativas.
  const taken = new Set([correct.main, item.reading, ...item.alt]);
  const options = [];
  const offer = choice => { if (options.length < KAZU_CHOICES - 1 && !taken.has(choice.main)) { taken.add(choice.main); options.push(choice); } };
  if (!showsPt && !showsForm) shuffle(item.traps, random).slice(0, 2).forEach(trap => offer({ key: `trap:${trap}`, main: trap, sub: '', lang: 'ja' }));
  // Contadores, do português: o mesmo número com outro contador (3本, 3枚, 3匹). つ é um coringa
  // para objetos, então só entra na mesa quando a pergunta é sobre pessoas ou bichos.
  const rival = other => other.id !== item.id && other.category === item.category;
  const counterRival = other => rival(other) && other.counter !== item.counter && (other.counter !== 'tsu' || ['nin', 'hiki'].includes(item.counter));
  const ranked = shuffle(pool.filter(rival), random).sort((a, b) => {
    const score = other => (showsForm && item.category === 'counters' ? (counterRival(other) ? 4 : -9) + (other.count === item.count ? 2 : 0) : 0) + (other.group === item.group ? 2 : 0);
    return score(b) - score(a);
  });
  for (const other of ranked) {
    if (showsForm && item.category === 'counters' && !counterRival(other)) continue;
    offer({ key: other.id, ...face(other) });
  }
  return { item, direction, prompt: direction === 'read' ? { main: item.jp, sub: item.clock || '', lang: 'ja' } : { main: item.pt, sub: '', lang: 'pt' }, choices: shuffle([correct, ...options], random), answer: item.id };
}

export const kazuReviewKey = (item, direction) => `arcade:kazu:${item.category}:${direction}:${item.id}`;
export const kazuBestKey = ({ category, mode, duration }) => `kazu:${category}:${mode}:${duration}`;
export const kazuPoints = rendaPoints;
