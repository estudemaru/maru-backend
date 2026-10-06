import { getLesson } from "./curriculum.js";
import { KAZU_ITEMS, kazuQuestion } from "./kazu.js";

// Checkpoints da fase 1 (docs/TRILHA-N5.md): perguntas que já existem nas lições,
// escolhidas à mão. Enquanto uma lição ainda mistura ideias de várias unidades, ela só
// cede as perguntas sobre a ideia desta unidade (a de と fica para a 9, a de ね para a 11).
// Unidades com poucas perguntas completam a prova com itens do jogo "Quanto, quando, qual".
// Para passar: 80% de acerto e nenhum conceito crítico com todas as perguntas erradas.
export const PASS_RATIO = 0.8;
const quiz = (concept, lessonId, ...indexes) => indexes.map(index => ({ type: "quiz", concept, lessonId, index }));
// `groups` no formato categoria/grupo do jogo (pointing/place); `count` itens sorteados por tentativa.
const kazu = (concept, lessonId, mode, count, ...groups) => [{ type: "kazu", concept, lessonId, mode, count, groups }];

export const CHECKPOINTS = {
  hiragana: {
    concepts: { letters: "as letras do hiragana", words: "a leitura de palavras" },
    critical: ["letters"],
    items: [
      ...quiz("letters", "h-vowels", 0), ...quiz("letters", "h-ka", 0), ...quiz("letters", "h-sa", 0), ...quiz("letters", "h-ta", 0),
      ...quiz("letters", "h-ha", 0), ...quiz("letters", "h-ma", 0), ...quiz("letters", "h-rest", 1),
      ...quiz("words", "h-vowels", 2), ...quiz("words", "h-na", 2), ...quiz("words", "h-rows", 0), ...quiz("words", "h-yara", 2), ...quiz("words", "h-rest", 2)
    ]
  },
  "hiragana-plus": {
    concepts: { marks: "os risquinhos ゛ e ゜", small: "as letras pequenas", long: "as vogais longas", words: "a leitura de palavras" },
    critical: ["marks"],
    items: [
      ...quiz("marks", "h-dakuten", 0, 1, 2), ...quiz("small", "h-combinations", 0, 1),
      ...quiz("long", "h-combinations", 2), ...quiz("long", "h-words", 2), ...quiz("words", "h-dialogue", 1)
    ]
  },
  meet: {
    concepts: { greetings: "os cumprimentos", identity: "は e です", question: "as perguntas com か", negative: "o “não é”, じゃないです", no: "o の", mo: "o も" },
    critical: ["identity", "question"],
    items: [
      ...quiz("greetings", "greetings", 0, 1, 2), ...quiz("identity", "sentence-identity", 0, 1, 2), ...quiz("identity", "particle-topic", 0),
      ...quiz("mo", "particle-topic", 1), ...quiz("question", "sentence-question", 0, 2), ...quiz("negative", "sentence-question", 1),
      ...quiz("no", "particle-connect", 0)
    ]
  },
  around: {
    concepts: { pointing: "これ, それ e あれ", noun: "この, その e あの" },
    critical: ["pointing"],
    items: [...quiz("pointing", "num-pointing", 0), ...quiz("noun", "num-pointing", 1), ...kazu("pointing", "num-pointing", "read", 2, "pointing/thing"), ...kazu("noun", "num-pointing", "read", 2, "pointing/noun")]
  },
  world: {
    concepts: { letters: "as letras parecidas", words: "a leitura de palavras", marks: "o ゛ e o ー" },
    critical: ["words"],
    items: [
      ...quiz("letters", "k-sata", 0, 2), ...quiz("letters", "k-lookalikes", 0),
      ...quiz("words", "k-basics", 1, 2), ...quiz("words", "k-naha", 1), ...quiz("words", "k-mawa", 0), ...quiz("words", "k-lookalikes", 1), ...quiz("words", "k-real-words", 0),
      ...quiz("marks", "k-mawa", 2), ...quiz("marks", "k-long", 0, 1)
    ]
  },
  numbers: {
    concepts: { numbers: "os números" },
    critical: ["numbers"],
    items: [...quiz("numbers", "kanji-numbers", 0, 1), ...quiz("numbers", "num-count", 0, 1, 2), ...quiz("numbers", "daily-numbers", 2), ...kazu("numbers", "num-count", "read", 4, "numbers/tens", "numbers/hundreds", "numbers/thousands", "numbers/man", "numbers/yen")]
  },
  time: {
    concepts: { hours: "as horas", week: "os dias da semana", dates: "os meses e as datas" },
    critical: ["hours"],
    items: [...quiz("hours", "num-time", 0, 1, 2), ...kazu("hours", "num-time", "read", 2, "time/hour", "time/half", "time/ampm"), ...quiz("week", "num-week", 0, 1, 2), ...quiz("dates", "num-dates", 0, 1, 2)]
  },
  places: {
    concepts: { where: "ここ, そこ, あそこ e どこ", existence: "あります e います", words: "as palavras de lugar" },
    critical: ["where"],
    items: [...quiz("where", "daily-find", 0, 1), ...kazu("where", "daily-find", "read", 3, "pointing/place"), ...quiz("words", "daily-find", 2), ...quiz("existence", "particle-existence", 0)]
  },
  routine: {
    concepts: { object: "os verbos com を", place: "で e へ", tense: "o ます do presente e do futuro", requests: "os pedidos", help: "os pedidos de ajuda" },
    critical: ["object"],
    items: [
      ...quiz("object", "sentence-actions", 0, 1), ...quiz("object", "particle-place", 0), ...quiz("place", "particle-place", 1, 2),
      ...quiz("tense", "sentence-time", 1), ...quiz("requests", "daily-order", 0, 1), ...quiz("help", "daily-help", 0, 1, 2), ...quiz("help", "daily-dialogue", 1)
    ]
  },
  describe: {
    concepts: { adjectives: "os adjetivos" },
    critical: ["adjectives"],
    items: quiz("adjectives", "sentence-describe", 0, 1, 2)
  },
  counting: {
    concepts: { counters: "os contadores" },
    critical: ["counters"],
    items: [...quiz("counters", "num-counters", 0, 1, 2), ...kazu("counters", "num-counters", "meaning", 5, "counters/tsu", "counters/nin", "counters/hon", "counters/mai", "counters/hiki")]
  }
};

const shuffle = (list, random) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
};

function fromQuiz(item, random) {
  const source = getLesson(item.lessonId).quiz[item.index];
  const order = shuffle(source.choices.map((_, index) => index), random);
  return { key: `${item.lessonId}:${item.index}`, concept: item.concept, lessonId: item.lessonId, prompt: source.prompt, choices: order.map(index => source.choices[index]), answer: order.indexOf(source.answer), explanation: source.explanation };
}

function fromKazu(item, random) {
  const pool = KAZU_ITEMS.filter(entry => item.groups.includes(`${entry.category}/${entry.group}`));
  return shuffle(pool, random).slice(0, item.count).map(entry => {
    const question = kazuQuestion(entry, pool, item.mode, random);
    const prompt = question.direction === "meaning" ? `Como se diz “${entry.pt}”?` : entry.category === "pointing" ? `O que quer dizer ${entry.jp}?` : `Como se lê ${entry.jp}?`;
    const answer = `${entry.jp} se lê ${entry.reading} (${entry.romaji}): ${entry.pt}.`;
    return {
      key: `kazu:${entry.id}`, concept: item.concept, lessonId: item.lessonId, prompt,
      choices: question.choices.map(choice => choice.sub ? `${choice.main}（${choice.sub}）` : choice.main),
      answer: question.choices.findIndex(choice => choice.key === question.answer),
      explanation: entry.hint ? `${answer} ${entry.hint}` : answer
    };
  });
}

// Uma tentativa: as perguntas da unidade, em ordem e com alternativas embaralhadas.
export function checkpointQuestions(unitId, random = Math.random) {
  const checkpoint = CHECKPOINTS[unitId];
  if (!checkpoint) return [];
  return shuffle(checkpoint.items.flatMap(item => item.type === "quiz" ? [fromQuiz(item, random)] : fromKazu(item, random)), random);
}

// `answers[i]` é a alternativa escolhida para `questions[i]`. Um conceito "perdido" é
// um conceito em que todas as perguntas foram erradas.
export function gradeCheckpoint(unitId, questions, answers) {
  const checkpoint = CHECKPOINTS[unitId];
  const right = questions.map((question, index) => answers[index] === question.answer);
  const correct = right.filter(Boolean).length;
  const lost = Object.keys(checkpoint.concepts).filter(concept => {
    const results = right.filter((_, index) => questions[index].concept === concept);
    return results.length > 0 && results.every(result => !result);
  });
  const missedCritical = lost.filter(concept => checkpoint.critical.includes(concept));
  return {
    correct, total: questions.length, percent: Math.round(correct / questions.length * 100),
    passed: correct / questions.length >= PASS_RATIO && !missedCritical.length,
    missedCritical, missedConcepts: lost.filter(concept => !checkpoint.critical.includes(concept))
  };
}
