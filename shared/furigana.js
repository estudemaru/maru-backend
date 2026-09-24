// Splits Japanese text into kanji/non-kanji runs and aligns a full kana
// reading against the non-kanji runs (used as anchors) to find the reading
// of each kanji run, without needing a per-character dictionary.
const KANJI = /[一-鿿々]/;
const isKanji = ch => KANJI.test(ch);

function runsOf(text) {
  const runs = [];
  let current = "", kanji = null;
  for (const ch of text) {
    const k = isKanji(ch);
    if (kanji === null || k === kanji) { current += ch; kanji = k; }
    else { runs.push({ text: current, kanji }); current = ch; kanji = k; }
  }
  if (current) runs.push({ text: current, kanji });
  return runs;
}

// Returns [{ text, kanji, reading? }] segments, or null when `reading`
// cannot be aligned to `jp` (caller should fall back to plain text).
export function furiganaSegments(jp, reading) {
  const text = String(jp || "");
  if (!reading || reading === text) return null;
  const runs = runsOf(text);
  if (!runs.some(run => run.kanji)) return null;
  const segments = [];
  let pos = 0;
  for (let i = 0; i < runs.length; i++) {
    const run = runs[i];
    if (!run.kanji) {
      const idx = reading.indexOf(run.text, pos);
      if (idx === -1) return null;
      segments.push({ text: run.text, kanji: false });
      pos = idx + run.text.length;
    } else {
      // A kanji run's reading is never empty, so the next anchor must be
      // found strictly after `pos` — otherwise an anchor that repeats the
      // start of the kanji reading (e.g. 電車で → でんしゃで) matches too early.
      const next = runs[i + 1];
      const end = next ? reading.indexOf(next.text, pos + 1) : reading.length;
      if (end === -1 || end <= pos) return null;
      segments.push({ text: run.text, kanji: true, reading: reading.slice(pos, end) });
      pos = end;
    }
  }
  return segments;
}

export function furiganaHTML(jp, reading, esc = s => s) {
  const segments = furiganaSegments(jp, reading);
  if (!segments) return esc(String(jp || ""));
  return segments.map(segment => segment.kanji
    ? `<ruby>${esc(segment.text)}<rt>${esc(segment.reading)}</rt></ruby>`
    : esc(segment.text)
  ).join("");
}
