import { MODULES, UNITS, getLesson, getModule, hasCheckpoint } from "./curriculum.js";

const isDone = (snapshot, lesson) => Boolean(snapshot.lessons[lesson.id]?.completedAt);
// Estas unidades eram vazias. Progresso numa unidade posterior prova que a pessoa
// já tinha passado por elas: as aulas novas abrem para revisão sem apagar esse acesso.
const previouslyEmpty = new Set(["likes", "past", "te-form"]);
export const FINAL_UNITS_ADDED_AT = Date.parse("2026-10-07T16:21:39Z");
const countingAlreadyOpen = new Set(["likes", "past", "counting"]);

// O estado de cada unidade, em ordem. Uma unidade abre quando:
// - a anterior foi vencida (checkpoint aprovado; sem checkpoint, todas as aulas lidas);
// - o diagnóstico aceito começa nela ou depois dela (as anteriores contam como vencidas);
// - a pessoa já concluiu alguma aula dela, ou já passou no checkpoint dela.
// Nada disso grava estado: tudo sai das lições, dos checkpoints e do diagnóstico salvos.
// Unidades ainda sem aulas (`soon`) não seguram ninguém: abrem e já contam como vencidas.
export function unitStates(snapshot) {
  const placed = UNITS.findIndex(unit => unit.id === snapshot.placement?.acceptedModule);
  // Na versão anterior, aprovar Descrição atravessava as duas unidades vazias e
  // abria Quantidades, mesmo sem nenhuma aula dela concluída. Preserve esse acesso.
  const describedAt = Number(snapshot.checkpoints?.describe?.passedAt) || 0;
  const legacyCountingAccess = describedAt > 0 && describedAt < FINAL_UNITS_ADDED_AT;
  const furthestProgress = UNITS.reduce((furthest, unit, index) =>
    unit.lessons.some(lesson => isDone(snapshot, lesson)) || snapshot.checkpoints?.[unit.id]?.passedAt ? index : furthest, -1);
  let previousCleared = true;
  return UNITS.map((unit, index) => {
    const done = unit.lessons.filter(lesson => isDone(snapshot, lesson)).length;
    const checkpoint = hasCheckpoint(unit);
    const passed = Boolean(snapshot.checkpoints?.[unit.id]?.passedAt);
    const open = previousCleared || index <= placed || done > 0 || passed
      || (previouslyEmpty.has(unit.id) && index < furthestProgress)
      || (legacyCountingAccess && countingAlreadyOpen.has(unit.id));
    const cleared = passed || index < placed || (open && !checkpoint && done === unit.lessons.length);
    previousCleared = cleared;
    return { ...unit, open, cleared, passed, checkpoint, done, soon: !unit.lessons.length };
  });
}

// A unidade do katakana (5) vencida, por checkpoint ou pelo diagnóstico, conta como
// kana aprendido, mesmo sem as lições de kana concluídas.
export const katakanaCleared = snapshot => unitStates(snapshot).find(unit => unit.id === "world").cleared;

export function isLessonOpen(snapshot, lessonId) {
  const module = getModule(getLesson(lessonId)?.moduleId);
  return !module || module.extra || unitStates(snapshot).find(unit => unit.id === module.id).open;
}

const lessonStep = lesson => ({ kind: "lesson", lesson: getLesson(lesson.id) });

// A próxima parada da trilha: uma aula ou o checkpoint da unidade. Começa na unidade do
// diagnóstico aceito; sem nada pendente, a trilha terminou (null).
export function nextStep(snapshot) {
  const states = unitStates(snapshot);
  const start = Math.max(0, states.findIndex(unit => unit.id === snapshot.placement?.acceptedModule));
  for (const unit of states.slice(start)) {
    if (!unit.open) return null;
    const lesson = unit.lessons.find(item => !isDone(snapshot, item));
    if (lesson) return lessonStep(lesson);
    if (unit.checkpoint && !unit.passed) return { kind: "checkpoint", unit };
  }
  return null;
}

// Depois de uma aula: a seguinte da mesma unidade; no fim dela, o checkpoint (se a unidade
// ainda não foi vencida); depois, a próxima parada da trilha. Os extras terminam na trilha.
export function stepAfter(snapshot, lessonId) {
  const lesson = getLesson(lessonId);
  const module = getModule(lesson.moduleId);
  const following = module.lessons[lesson.index + 1];
  if (following) return lessonStep(following);
  if (module.extra) return null;
  const unit = unitStates(snapshot).find(item => item.id === module.id);
  return unit.checkpoint && !unit.cleared ? { kind: "checkpoint", unit } : nextStep(snapshot);
}

export const stepRoute = step => !step ? "journey" : step.kind === "lesson" ? "lesson/" + step.lesson.id : "checkpoint/" + step.unit.id;

// Um selo por unidade com aulas e por extra, quando todas as aulas foram concluídas.
export const moduleSeals = snapshot => MODULES.filter(module => module.lessons.length).map(module => ({
  ...module,
  done: module.lessons.filter(lesson => isDone(snapshot, lesson)).length,
  earned: module.lessons.every(lesson => isDone(snapshot, lesson))
}));

// Por que uma unidade fechada ainda não abriu, numa frase para a tela. Quem já calculou
// os estados (a trilha inteira) passa `states` para não refazer a conta a cada unidade.
export function unlockHint(snapshot, unitId, states = unitStates(snapshot)) {
  const index = states.findIndex(unit => unit.id === unitId);
  const before = states.slice(0, index).reverse().find(unit => !unit.soon);
  // A unidade que a pessoa precisa terminar agora: a primeira ainda não vencida.
  const current = states.find(unit => !unit.cleared);
  const name = unit => `Unidade ${unit.number} · ${unit.title}`;
  const gate = before.checkpoint ? `depois do checkpoint da ${name(before)}` : `depois das aulas da ${name(before)}`;
  return `Abre ${gate}.` + (current && current.id !== before.id ? ` Agora você está na ${name(current)}.` : "");
}
