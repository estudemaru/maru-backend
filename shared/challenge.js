import { KANA } from './content.js';
import { SENTENCES } from './catalog.js';
import { checkGuidedSentence } from './sentenceCheck.js';

export function challengeItems(mode = 'hiragana', family = 'a') {
  if (mode === 'sentences') return SENTENCES.slice(0, 8).map(item => ({
    id: `sentence-${item.id}`, exerciseId: item.id, prompt: item.prompt,
    answer: item.tokens.map(token=>token[3] || token[0]).join('') + '。',
    romaji: item.tokens.map(token=>token[1]).join(' '), hint: item.hint,
    topic: item.pattern, route: `sentences/${item.id}`
  }));
  const script = mode === 'katakana' ? 'katakana' : 'hiragana';
  return KANA.filter(item=>item.script===script && (family==='all' || item.row===family || (family==='wa' && item.row==='n'))).map(item=>({
    id: item.id, prompt: item.romaji, answer: item.char, romaji: item.romaji,
    topic: item.row==='a' ? 'Vogais' : `Família ${item.row.toUpperCase()}`,
    route: `writing/${encodeURIComponent(item.char)}`, hint: `Leia ${item.romaji} e observe os traços de ${item.char}.`
  }));
}

// A submitted or expired item settles exactly once, even when a timer tick and
// Enter arrive together. Deadlines remain valid when the browser tab sleeps.
export function createChallenge(items, seconds = 30) {
  const duration = [0,15,30,60].includes(seconds) ? seconds * 1000 : 30000;
  let index = 0, phase = 'ready', deadline = null;
  const results = [];
  return {
    get item() { return items[index]; },
    get phase() { return phase; },
    get results() { return results.slice(); },
    get index() { return index; },
    get total() { return items.length; },
    start(now) { if (phase!=='ready' || !items[index]) return false; phase='answer'; deadline=duration ? now+duration : null; return true; },
    remaining(now) { return deadline===null ? null : Math.max(0,deadline-now); },
    answer(text, now) {
      if (phase!=='answer') return null;
      const item = items[index];
      const timeout = deadline!==null && now>=deadline;
      const normalized = String(text).normalize('NFKC').trim();
      const correct = !timeout && (item.exerciseId ? checkGuidedSentence(item.exerciseId,normalized).correct : normalized===item.answer);
      const result = { ...item, correct, timeout };
      results.push(result); phase='feedback'; return result;
    },
    expire(now) { return phase==='answer' && deadline!==null && now>=deadline ? this.answer('',now) : null; },
    next() { if (phase!=='feedback') return false; index++; phase=index>=items.length ? 'complete' : 'ready'; deadline=null; return true; }
  };
}

export function challengeAdvice(results) {
  const groups = new Map();
  for (const item of results) {
    const group = groups.get(item.topic) || { topic:item.topic, route:item.route, attempts:0, misses:0, timeouts:0, items:[] };
    group.attempts++; group.misses+=Number(!item.correct); group.timeouts+=Number(item.timeout);
    if (!item.correct) { group.route=item.route; group.items.push({answer:item.answer,romaji:item.romaji}); }
    groups.set(item.topic,group);
  }
  return [...groups.values()].filter(group=>group.misses).sort((a,b)=>b.misses/b.attempts-a.misses/a.attempts);
}
