export const PICTURE_WORDS = [
  { id: "water", wordId: "word-water" },
  { id: "bread", wordId: "word-bread" },
  { id: "rice", wordId: "word-rice" },
  { id: "apple", wordId: "word-apple" },
  { id: "fish", wordId: "word-fish" },
  { id: "egg", wordId: "word-egg" },
  { id: "cat", wordId: "word-cat" },
  { id: "dog", wordId: "word-dog" },
  { id: "book", wordId: "word-book" },
  { id: "tree", wordId: "word-tree" },
  { id: "coffee", wordId: "word-coffee" },
  { id: "cake", wordId: "word-cake" },
  { id: "umbrella", wordId: "word-umbrella" },
  { id: "train", wordId: "word-train" }
];

// A fixed order makes the worksheet and its answer key reproducible.
export const PICTURE_BANK_ORDER = [3, 0, 5, 2, 1, 4, 10, 7, 13, 6, 9, 11, 8, 12];

export const PRINT_DIALOGUES = [
  {
    id: "station", title: "Pedir informação", setting: "Duas pessoas perto da estação.",
    turns: [
      { speaker: "A", text: "すみません。駅はどこですか。", reading: "すみません。えきはどこですか。" },
      { speaker: "B", cue: "É ali.", answer: "あそこです。" },
      { speaker: "A", cue: "Muito obrigado(a).", answer: "ありがとうございます。" }
    ],
    questions: [
      { prompt: "Que lugar a pessoa A procura?", answer: "A estação." },
      { prompt: "O que a pessoa B informa?", answer: "Que fica ali." }
    ]
  },
  {
    id: "cafe", title: "No café", setting: "Uma pessoa faz um pedido no balcão.",
    turns: [
      { speaker: "A", text: "すみません。コーヒーをください。" },
      { speaker: "B", cue: "Um café, certo?", answer: "コーヒーですね。" },
      { speaker: "A", cue: "Sim, por favor.", answer: "はい、お願いします。", answerReading: "はい、おねがいします。" }
    ],
    questions: [
      { prompt: "O que a pessoa A pede?", answer: "Um café." },
      { prompt: "Por que a pessoa B usa ね?", answer: "Para confirmar o pedido." }
    ]
  },
  {
    id: "again", title: "Mais uma vez", setting: "Uma pessoa não ouviu bem uma indicação.",
    turns: [
      { speaker: "A", text: "駅はあそこです。", reading: "えきはあそこです。" },
      { speaker: "B", cue: "Mais uma vez, por favor.", answer: "もう一度お願いします。", answerReading: "もういちどおねがいします。" },
      { speaker: "A", text: "あそこです。" },
      { speaker: "B", cue: "Muito obrigado(a).", answer: "ありがとうございます。" }
    ],
    questions: [
      { prompt: "Por que a pessoa B pede mais uma vez?", answer: "Porque não entendeu ou não ouviu a indicação." },
      { prompt: "Qual expressão encerra a conversa com educação?", answer: "ありがとうございます。" }
    ]
  }
];
