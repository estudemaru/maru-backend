import { SENTENCES } from "./catalog.js";

const toHiragana = text => text.replace(/[ァ-ヶ]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));

export function normalizeSentence(text) {
  return String(text || "").normalize("NFKC").toLowerCase()
    .replace(/ā/g, "aa").replace(/ī/g, "ii").replace(/ū/g, "uu").replace(/ē/g, "ee").replace(/ō/g, "ou")
    .replace(/[\s。、,.!?！？・'’-]/g, "");
}

export function checkGuidedSentence(exerciseId, text) {
  const exercise = SENTENCES.find(item => item.id === exerciseId);
  if (!exercise) return { status: "unknown", correct: false, message: "Escolha um exercício disponível." };
  const model = exercise.tokens.map(token => token[0]).join("") + "。";
  const kana = exercise.tokens.map(token => token[3] || token[0]).join("");
  const modelReading = kana + "。";
  const romaji = exercise.tokens.map(token => token[1]).join(" ");
  const answer = normalizeSentence(text);
  if (!answer) return { status: "empty", correct: false, model, modelReading, romaji, message: "Monte ou escreva uma frase antes de verificar." };
  const forms = [model, kana, toHiragana(kana), romaji, romaji.replace(/ō/g, "oo"), romaji.replace(/ō/g, "ou")];
  const correct = forms.some(form => normalizeSentence(form) === answer);
  return {
    status: correct ? "match" : "different",
    correct, model, modelReading, romaji,
    message: correct ? "Sua frase corresponde ao modelo deste exercício." : "Sua frase ainda não corresponde ao modelo pedido. Confira a ordem e as partículas.",
    explanation: exercise.hint
  };
}
