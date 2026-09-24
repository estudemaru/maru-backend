import { additionalLessons } from "./lessons/expansion.js";
import { foundationLessons, hiraganaLessons, katakanaLessons } from "./lessons/writing.js";
import { kanjiLessons, sentenceLessons, particleLessons } from "./lessons/grammar.js";
import { everydayLessons, casualLessons } from "./lessons/conversation.js";

// The order is a recommendation. Every lesson remains available for exploration.
export const MODULES = [
  { id: "start", number: "01", title: "Primeiros passos", subtitle: "Conheça o idioma e diga seu primeiro olá.", symbol: "始", color: "peach", lessons: [...foundationLessons, ...additionalLessons.start] },
  { id: "hiragana", number: "02", title: "Aprenda hiragana", subtitle: "Transforme novos símbolos em sons conhecidos.", symbol: "あ", color: "sage", lessons: [...hiraganaLessons, ...additionalLessons.hiragana] },
  { id: "katakana", number: "03", title: "Explore katakana", subtitle: "Leia nomes, empréstimos e palavras do mundo.", symbol: "ア", color: "lavender", lessons: [...katakanaLessons, ...additionalLessons.katakana] },
  { id: "kanji", number: "04", title: "Seus primeiros kanji", subtitle: "Entenda os significados, um traço de cada vez.", symbol: "日", color: "sand", lessons: [...kanjiLessons, ...additionalLessons.kanji], recommendedAfter: ["hiragana", "katakana"] },
  { id: "sentences", number: "05", title: "Construa frases", subtitle: "Apresente-se, faça perguntas e conte sua rotina.", symbol: "文", color: "sky", lessons: [...sentenceLessons, ...additionalLessons.sentences] },
  { id: "particles", number: "06", title: "Conecte com partículas", subtitle: "Descubra o papel de cada palavra na frase.", symbol: "は", color: "peach", lessons: [...particleLessons, ...additionalLessons.particles] },
  { id: "everyday", number: "07", title: "Japonês no dia a dia", subtitle: "Peça um café, encontre lugares e converse.", symbol: "話", color: "sage", lessons: [...everydayLessons, ...additionalLessons.everyday] },
  { id: "casual", number: "08", title: "Além dos livros", subtitle: "Gírias, expressões e contexto para usar bem.", symbol: "ね", color: "lavender", lessons: [...casualLessons, ...additionalLessons.casual] }
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
