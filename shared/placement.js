// A short orientation within Maru's introductory curriculum, not a JLPT exam.
export const PLACEMENT_VERSION = 1;
const q = (id, area, prompt, choices, answer, explanation, passage = "") => ({ id, area, prompt, choices, answer, explanation, passage });
export const PLACEMENT_AREAS = { hiragana: "Hiragana", katakana: "Katakana", kanji: "Kanji em palavras", vocabulary: "Vocabulário", particles: "Partículas", reading: "Leitura curta" };
export const PLACEMENT_QUESTIONS = [
  q("h-a", "hiragana", "Qual é a leitura de あ?", ["a", "i", "u", "o"], 0, "あ corresponde a a. As cinco primeiras vogais são あ・い・う・え・お."),
  q("h-ne", "hiragana", "Qual é a leitura de ねこ?", ["inu", "neko", "nuko", "neka"], 1, "ね é ne; こ é ko. ねこ, neko, significa gato."),
  q("h-kya", "hiragana", "Como se lê きゃ, com ゃ pequeno?", ["kiya, em duas partes", "kya, uma combinação", "ka", "kyo"], 1, "き com ゃ pequeno forma kya. きや com や grande tem duas moras: ki-ya."),
  q("k-a", "katakana", "Qual é a leitura de ア?", ["i", "e", "a", "o"], 2, "ア é a em katakana; あ é a em hiragana."),
  q("k-look", "katakana", "Qual destes katakana representa shi?", ["ツ", "ソ", "ン", "シ"], 3, "シ representa shi. Observe a direção dos traços ao compará-lo com ツ, tsu."),
  q("k-long", "katakana", "Qual leitura preserva as vogais longas de コーヒー?", ["kohi", "kōhī", "kōhi", "kohī"], 1, "ー prolonga a vogal anterior. コーヒー se lê kōhī, café: tanto o o quanto o i são longos."),
  q("kanji-water", "kanji", "Qual caractere significa água?", ["木", "火", "水", "山"], 2, "水 significa água. Uma leitura é みず, mizu; outras palavras podem usar outra leitura."),
  q("kanji-japan", "kanji", "日本 significa Japão. Qual é uma leitura comum desta palavra?", ["にほん", "ひもと", "つきほん", "ほんに"], 0, "日本 pode ser lido にほん, Nihon, e também にっぽん, Nippon. A palavra determina a leitura dos kanji."),
  q("v-student", "vocabulary", "学生（がくせい） significa…", ["professor(a)", "escola", "amigo(a)", "estudante"], 3, "学生 é estudante. 先生 é professor(a) e 学校 é escola."),
  q("v-drink", "vocabulary", "Qual palavra corresponde a beber, na forma educada?", ["食べます（たべます）", "飲みます（のみます）", "読みます（よみます）", "行きます（いきます）"], 1, "飲みます é beber na forma educada. 食べます é comer; 読みます é ler; 行きます é ir."),
  q("p-object", "particles", "Bebo água. Qual partícula marca o objeto em 水＿飲みます?", ["を", "に", "で", "の"], 0, "水 é o que se bebe. を marca o objeto da ação e se pronuncia o."),
  q("p-place", "particles", "Estudo na biblioteca. Complete 図書館＿勉強します.", ["に", "の", "で", "を"], 2, "で marca o lugar onde a ação de estudar acontece. Com います, に pode marcar o lugar de existência."),
  q("p-like", "particles", "Gosto de música. Use o padrão inicial: 音楽＿好きです.", ["を", "で", "に", "が"], 3, "No padrão com 好き, a preferência é marcada com が. Ele funciona de modo diferente de ouvir música, 音楽を聞きます."),
  q("r-where", "reading", "Onde a pessoa estuda?", ["Em casa", "Na escola", "Na biblioteca", "No trem"], 2, "図書館で indica que estudar acontece na biblioteca.", "わたしは学生です。毎日、図書館で日本語を勉強します。\nLeituras de apoio: 学生（がくせい）· 毎日（まいにち）· 図書館（としょかん）· 日本語（にほんご）· 勉強（べんきょう）"),
  q("r-negative", "reading", "O que a pessoa NÃO bebe?", ["Água", "Café", "Chá", "Leite"], 1, "飲みません nega a ação de beber. A segunda frase diz que a pessoa bebe água.", "コーヒーは飲みません。水を飲みます。\nLeituras de apoio: 飲（の）· 水（みず）")
];
export function placementResult(answers = {}) {
  const areas = Object.entries(PLACEMENT_AREAS).map(([id, label]) => {
    const questions = PLACEMENT_QUESTIONS.filter(item => item.area === id);
    return { id, label, correct: questions.filter(item => answers[item.id] === item.answer).length, total: questions.length };
  });
  const score = Object.fromEntries(areas.map(item => [item.id, item.correct]));
  // O diagnóstico aponta uma unidade; as anteriores contam como vencidas. Ele não mede
  // números nem horas, então a sugestão mais alta é a unidade 6, onde eles começam.
  let moduleId = "start";
  if (score.hiragana > 0) moduleId = "hiragana";
  if (score.hiragana === 3) moduleId = "meet";
  if (score.hiragana === 3 && score.katakana === 3 && score.vocabulary === 2 && score.particles >= 2 && score.reading >= 1) moduleId = "numbers";
  return { moduleId, areas, complete: PLACEMENT_QUESTIONS.every(item => Object.hasOwn(answers, item.id)) };
}
