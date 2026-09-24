export const example = (jp, reading, romaji, pt, note = "", image = "") => ({ jp, reading, romaji, pt, note, image });
export const section = (title, body, examples = [], tip = "") => ({ title, body, examples, tip });
export const question = (prompt, choices, answer, explanation) => ({ prompt, choices, answer, explanation });
export const lesson = (id, title, minutes, goal, sections, quiz, practice = null) => ({ id, title, minutes, goal, sections, quiz, practice });
