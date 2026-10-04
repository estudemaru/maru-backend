export const example = (jp, reading, romaji, pt, note = "", image = "") => ({ jp, reading, romaji, pt, note, image });
// body aceita parágrafos curtos separados por "\n".
export const section = (title, body, examples = [], tip = "") => ({ title, body, examples, tip });
export const question = (prompt, choices, answer, explanation) => ({ prompt, choices, answer, explanation });
// guide: { hook, recap } — hook abre a lição em uma frase ("por que isso importa");
// recap fecha a leitura com 2 ou 3 frases curtas antes das perguntas.
export const lesson = (id, title, minutes, goal, sections, quiz, practice = null, guide = {}) => ({ id, title, minutes, goal, sections, quiz, practice, hook: guide.hook || "", recap: guide.recap || [] });
