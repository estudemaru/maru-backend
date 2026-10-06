import { additionalLessons } from "./lessons/expansion.js";
import { foundationLessons, hiraganaLessons, katakanaLessons } from "./lessons/writing.js";
import { hiraganaRowLessons, katakanaRowLessons } from "./lessons/kana.js";
import { kanjiLessons, sentenceLessons, particleLessons } from "./lessons/grammar.js";
import { everydayLessons, casualLessons } from "./lessons/conversation.js";
import { numberLessons } from "./lessons/numbers.js";

// Every lesson lives in a themed file; each stage lists its lessons by ID in the
// recommended order. IDs are stored in progress: renaming one needs a migration.
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

// The order is a recommendation. Every lesson remains available for exploration.
export const MODULES = [
  { id: "start", number: "01", title: "Primeiros passos", subtitle: "Conheça o idioma e diga seu primeiro olá.", outcome: "entender como o japonês funciona e cumprimentar com educação", symbol: "始", color: "peach",
    lessons: pick(["welcome", "sounds", "greetings", "how-it-works", "start-language", "start-study"]) },
  { id: "hiragana", number: "02", title: "Aprenda hiragana", subtitle: "Uma família de letras por vez, com dicas para lembrar.", outcome: "ler todo o hiragana e as primeiras palavras", symbol: "あ", color: "sage",
    lessons: pick(["h-vowels", "h-ka", "h-sa", "h-ta", "h-na", "h-ha", "h-rows", "h-ma", "h-yara", "h-rest", "h-dakuten", "h-combinations", "h-words", "h-dialogue"]) },
  { id: "katakana", number: "03", title: "Explore katakana", subtitle: "Os mesmos sons, um desenho novo: nomes e palavras do mundo.", outcome: "ler nomes, cardápios e palavras que vieram de outras línguas", symbol: "ア", color: "lavender",
    lessons: pick(["k-basics", "k-sata", "k-naha", "k-mawa", "k-lookalikes", "k-long", "k-real-words", "k-dialogue"]) },
  { id: "kanji", number: "04", title: "Seus primeiros kanji", subtitle: "Desenhos com significado, um traço de cada vez.", outcome: "reconhecer números e kanji da natureza dentro de palavras", symbol: "日", color: "sand", recommendedAfter: ["hiragana", "katakana"],
    lessons: pick(["kanji-meaning", "kanji-numbers", "kanji-nature", "kanji-parts"]) },
  { id: "sentences", number: "05", title: "Construa frases", subtitle: "Apresente-se, pergunte e conte sua rotina.", outcome: "se apresentar, perguntar e falar do que faz, fez e não fez", symbol: "文", color: "sky",
    lessons: pick(["sentence-identity", "sentence-question", "sentence-actions", "sentence-time", "sentence-describe"]) },
  { id: "particles", number: "06", title: "Conecte com partículas", subtitle: "Descubra o papel de cada palavra na frase.", outcome: "escolher は, が, を, に, で e as outras partículas do começo", symbol: "は", color: "peach",
    lessons: pick(["particle-topic", "particle-place", "particle-connect", "particle-existence"]) },
  { id: "everyday", number: "07", title: "Japonês no dia a dia", subtitle: "Peça um café, encontre lugares e converse.", outcome: "pedir, perguntar o caminho e manter uma conversa curta", symbol: "話", color: "sage",
    lessons: pick(["daily-order", "daily-find", "daily-help", "daily-numbers", "daily-dialogue"]) },
  { id: "numbers", number: "08", title: "Quanto, quando e qual", subtitle: "Números, horas, datas, contadores e o jeito de apontar.", outcome: "dizer números, horas e datas, contar coisas e apontar para o que está perto ou longe", symbol: "数", color: "sky", recommendedAfter: ["hiragana", "katakana"],
    lessons: pick(["num-count", "num-time", "num-week", "num-dates", "num-counters", "num-pointing"]) },
  { id: "casual", number: "09", title: "Além dos livros", subtitle: "Gírias, expressões e contexto para usar bem.", outcome: "entender gírias e expressões e saber quando usá-las", symbol: "ね", color: "lavender",
    lessons: pick(["casual-register", "casual-slang", "casual-culture", "casual-short", "casual-communities"]) }
];

export const LESSONS = MODULES.flatMap(module =>
  module.lessons.map((lesson, index) => ({ ...lesson, moduleId: module.id, moduleTitle: module.title, index }))
);
export const getLesson = id => LESSONS.find(lesson => lesson.id === id);
export const getModule = id => MODULES.find(module => module.id === id);

export const SOURCES = [
  { title: "Irodori · Japan Foundation", detail: "Material gratuito com situações de comunicação para iniciantes e áudio de falantes.", url: "https://www.irodori.jpf.go.jp/en/starter/pdf.html" },
  { title: "Hiragana & Katakana · Japan Foundation", detail: "Recursos complementares para aprender os dois silabários.", url: "https://a1.marugotoweb.jp/en/hiragana.php" },
  { title: "KanjiVG · modelos de escrita", detail: "Traços de Ulrich Apel e colaboradores, sob licença CC BY-SA 3.0.", url: "https://kanjivg.tagaini.net/" },
  { title: "O que os níveis JLPT significam", detail: "Descrições oficiais. A trilha Maru é introdutória e não equivale a uma certificação.", url: "https://www.jlpt.jp/e/about/levelsummary.html" }
];
