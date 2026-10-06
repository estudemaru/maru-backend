import { additionalLessons } from "./lessons/expansion.js";
import { foundationLessons, hiraganaLessons, katakanaLessons } from "./lessons/writing.js";
import { hiraganaRowLessons, katakanaRowLessons } from "./lessons/kana.js";
import { kanjiLessons, sentenceLessons, particleLessons } from "./lessons/grammar.js";
import { everydayLessons, casualLessons } from "./lessons/conversation.js";
import { numberLessons } from "./lessons/numbers.js";

// Every lesson lives in a themed file; each unit lists its lessons by ID in order.
// IDs are stored in progress: renaming one needs a migration.
const ALL = new Map([
  ...foundationLessons, ...additionalLessons.start,
  ...hiraganaLessons, ...hiraganaRowLessons, ...additionalLessons.hiragana,
  ...katakanaLessons, ...katakanaRowLessons, ...additionalLessons.katakana,
  ...kanjiLessons, ...additionalLessons.kanji,
  ...sentenceLessons, ...additionalLessons.sentences,
  ...particleLessons, ...additionalLessons.particles,
  ...everydayLessons, ...additionalLessons.everyday,
  ...numberLessons,
  ...casualLessons, ...additionalLessons.casual
].map(lesson => [lesson.id, lesson]));
const pick = ids => ids.map(id => {
  if (!ALL.has(id)) throw new Error("Lição desconhecida no currículo: " + id);
  return ALL.get(id);
});

// Temas: a etapa de origem de cada lição. O Livro 1, o jogo de cada lição, o modo de
// leitura e o treino de kana seguem o tema, que não muda quando a lição troca de unidade.
export const THEMES = [
  { id: "start", number: "01", title: "Primeiros passos", subtitle: "Conheça o idioma e diga seu primeiro olá.", outcome: "entender como o japonês funciona e cumprimentar com educação", symbol: "始", color: "peach",
    lessons: pick(["welcome", "sounds", "greetings", "how-it-works", "start-language", "start-study"]) },
  { id: "hiragana", number: "02", title: "Aprenda hiragana", subtitle: "Uma família de letras por vez, com dicas para lembrar.", outcome: "ler todo o hiragana e as primeiras palavras", symbol: "あ", color: "sage",
    lessons: pick(["h-vowels", "h-ka", "h-sa", "h-ta", "h-na", "h-ha", "h-rows", "h-ma", "h-yara", "h-rest", "h-dakuten", "h-combinations", "h-words", "h-dialogue"]) },
  { id: "katakana", number: "03", title: "Explore katakana", subtitle: "Os mesmos sons, um desenho novo: nomes e palavras do mundo.", outcome: "ler nomes, cardápios e palavras que vieram de outras línguas", symbol: "ア", color: "lavender",
    lessons: pick(["k-basics", "k-sata", "k-naha", "k-mawa", "k-lookalikes", "k-long", "k-real-words", "k-dialogue"]) },
  { id: "kanji", number: "04", title: "Seus primeiros kanji", subtitle: "Desenhos com significado, um traço de cada vez.", outcome: "reconhecer números e kanji da natureza dentro de palavras", symbol: "日", color: "sand",
    lessons: pick(["kanji-meaning", "kanji-numbers", "kanji-nature", "kanji-parts"]) },
  { id: "sentences", number: "05", title: "Construa frases", subtitle: "Apresente-se, pergunte e conte sua rotina.", outcome: "se apresentar, perguntar e falar do que faz, fez e não fez", symbol: "文", color: "sky",
    lessons: pick(["sentence-identity", "sentence-question", "sentence-actions", "sentence-time", "sentence-describe"]) },
  { id: "particles", number: "06", title: "Conecte com partículas", subtitle: "Descubra o papel de cada palavra na frase.", outcome: "escolher は, が, を, に, で e as outras partículas do começo", symbol: "は", color: "peach",
    lessons: pick(["particle-topic", "particle-place", "particle-connect", "particle-existence"]) },
  { id: "everyday", number: "07", title: "Japonês no dia a dia", subtitle: "Peça um café, encontre lugares e converse.", outcome: "pedir, perguntar o caminho e manter uma conversa curta", symbol: "話", color: "sage",
    lessons: pick(["daily-order", "daily-find", "daily-help", "daily-numbers", "daily-dialogue"]) },
  { id: "numbers", number: "08", title: "Quanto, quando e qual", subtitle: "Números, horas, datas, contadores e o jeito de apontar.", outcome: "dizer números, horas e datas, contar coisas e apontar para o que está perto ou longe", symbol: "数", color: "sky",
    lessons: pick(["num-count", "num-time", "num-week", "num-dates", "num-counters", "num-pointing"]) },
  { id: "casual", number: "09", title: "Além dos livros", subtitle: "Gírias, expressões e contexto para usar bem.", outcome: "entender gírias e expressões e saber quando usá-las", symbol: "ね", color: "lavender",
    lessons: pick(["casual-register", "casual-slang", "casual-culture", "casual-short", "casual-communities"]) }
];
const THEME_OF = new Map(THEMES.flatMap(theme => theme.lessons.map(lesson => [lesson.id, theme.id])));

// A trilha: 15 unidades em ordem (docs/TRILHA-N5.md), cada uma aberta pelo checkpoint
// da anterior, e os extras, sempre abertos. Os IDs das unidades não repetem os das
// etapas antigas com outro sentido, para o diagnóstico salvo poder ser traduzido.
// Fase 1: as lições que ensinam várias ideias ficam inteiras, na unidade da primeira.
const unit = (number, id, title, subtitle, outcome, symbol, color, ids) => ({ id, number: String(number), title, subtitle, outcome, symbol, color, lessons: pick(ids) });
const extra = (id, title, subtitle, outcome, symbol, color, ids) => ({ id, number: "", extra: true, title, subtitle, outcome, symbol, color, lessons: pick(ids) });
export const MODULES = [
  unit(0, "start", "Começando do zero", "Como o japonês é escrito, como soa e como estudar.", "saber como o japonês é escrito e como estudar sem se perder", "始", "peach",
    ["welcome", "sounds", "start-study"]),
  unit(1, "hiragana", "Hiragana", "Uma família de letras por vez, com dicas para lembrar.", "ler palavras simples em hiragana, sem romaji", "あ", "sage",
    ["h-vowels", "h-ka", "h-sa", "h-ta", "h-na", "h-ha", "h-rows", "h-ma", "h-yara", "h-rest"]),
  unit(2, "hiragana-plus", "Hiragana avançado", "Risquinhos, letras pequenas e sons longos.", "ler palavras com risquinhos, letras pequenas e vogais longas, como おちゃ, がっこう e おばあさん", "が", "sand",
    ["h-dakuten", "h-combinations", "h-words", "h-dialogue"]),
  unit(3, "meet", "Apresentar-se", "Cumprimentos, quem você é e as primeiras perguntas.", "se apresentar e fazer as primeiras perguntas", "名", "sky",
    ["greetings", "sentence-identity", "particle-topic", "sentence-question", "particle-connect"]),
  unit(4, "around", "Coisas ao meu redor", "Isto, isso e aquilo: o que é e de quem é.", "perguntar o que algo é e apontar para perto ou longe", "物", "peach",
    ["num-pointing"]),
  unit(5, "world", "Katakana", "Os mesmos sons, outro desenho: cardápios, lojas e palavras de fora.", "ler cardápios, lojas e palavras de outras línguas", "ア", "lavender",
    ["k-basics", "k-sata", "k-naha", "k-mawa", "k-lookalikes", "k-long", "k-real-words", "k-dialogue"]),
  unit(6, "numbers", "Números", "Do um ao dez mil, com kanji, e quanto custa.", "contar até dez mil e perguntar o preço", "数", "sand",
    ["kanji-numbers", "num-count", "daily-numbers"]),
  unit(7, "time", "Tempo", "Horas, dias da semana, meses e datas.", "dizer quando algo acontece", "時", "sky",
    ["num-time", "num-week", "num-dates"]),
  unit(8, "places", "Lugares", "Aqui, ali, onde fica e o que tem.", "perguntar e dizer onde as coisas e as pessoas estão", "所", "sage",
    ["daily-find", "particle-existence"]),
  unit(9, "routine", "Verbos e rotina", "O que você faz, onde, com quem e quando.", "contar o que faz no dia, fazer pedidos e pedir ajuda", "毎", "peach",
    ["sentence-actions", "particle-place", "sentence-time", "daily-order", "daily-help", "daily-dialogue"]),
  unit(10, "describe", "Descrição", "Adjetivos para pessoas, coisas e lugares.", "descrever pessoas, coisas e lugares", "形", "lavender",
    ["sentence-describe"]),
  unit(11, "likes", "Gostos", "Do que você gosta e do que não gosta tanto.", "dizer do que gosta e perguntar preferências", "好", "peach", []),
  unit(12, "past", "Passado", "Contar o que aconteceu.", "contar o que aconteceu", "昨", "sky", []),
  unit(13, "counting", "Quantidades", "Contar coisas, pessoas e bichos.", "contar coisas, pessoas e objetos", "個", "sand",
    ["num-counters"]),
  unit(14, "te-form", "Forma て", "Pedir, encadear ações e pedir permissão.", "pedir, encadear ações e dizer o que pode e o que não pode", "て", "sage", []),
  extra("curious", "Gramática para curiosos", "Como uma frase japonesa se monta, para quem gosta de entender o porquê.", "entender as peças de uma frase japonesa", "文", "sky",
    ["how-it-works", "start-language"]),
  extra("kanji", "Kanji como sistema", "Significados, leituras e as peças que se repetem.", "entender como os kanji funcionam", "字", "sand",
    ["kanji-meaning", "kanji-parts", "kanji-nature"]),
  extra("casual", "Além dos livros", "Gírias, expressões e contexto para usar bem.", "entender gírias e expressões e saber quando usá-las", "ね", "lavender",
    ["casual-register", "casual-slang", "casual-culture", "casual-short", "casual-communities"])
];
// As unidades da linha principal, em ordem; os extras ficam fora do bloqueio.
export const UNITS = MODULES.filter(module => !module.extra);

export const LESSONS = MODULES.flatMap(module =>
  module.lessons.map((lesson, index) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title, index, theme: THEME_OF.get(lesson.id) }))
);
export const getLesson = id => LESSONS.find(lesson => lesson.id === id);
export const getModule = id => MODULES.find(module => module.id === id);
export const getTheme = id => THEMES.find(theme => theme.id === id);
// "Unidade 3" na linha principal; "Extra" fora dela.
export const moduleLabel = module => module.extra ? "Extra" : "Unidade " + module.number;

export const SOURCES = [
  { title: "Irodori · Japan Foundation", detail: "Material gratuito com situações de comunicação para iniciantes e áudio de falantes.", url: "https://www.irodori.jpf.go.jp/en/starter/pdf.html" },
  { title: "Hiragana & Katakana · Japan Foundation", detail: "Recursos complementares para aprender os dois silabários.", url: "https://a1.marugotoweb.jp/en/hiragana.php" },
  { title: "KanjiVG · modelos de escrita", detail: "Traços de Ulrich Apel e colaboradores, sob licença CC BY-SA 3.0.", url: "https://kanjivg.tagaini.net/" },
  { title: "O que os níveis JLPT significam", detail: "Descrições oficiais. A trilha Maru é introdutória e não equivale a uma certificação.", url: "https://www.jlpt.jp/e/about/levelsummary.html" }
];
