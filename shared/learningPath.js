import { MODULES, LESSONS } from "./curriculum.js";

export function nextLesson(snapshot) {
  const module = MODULES.find(item => item.id === snapshot.placement?.acceptedModule);
  const start = module ? LESSONS.findIndex(item => item.id === module.lessons[0].id) : 0;
  return LESSONS.slice(start).find(item => !snapshot.lessons[item.id]?.completedAt);
}

export const moduleSeals = snapshot => MODULES.map(module => ({
  ...module,
  done: module.lessons.filter(lesson => snapshot.lessons[lesson.id]?.completedAt).length,
  earned: module.lessons.every(lesson => snapshot.lessons[lesson.id]?.completedAt)
}));

const completionRatio = (module, snapshot) => module.lessons.filter(lesson => snapshot.lessons[lesson.id]?.completedAt).length / module.lessons.length;

// A module with `recommendedAfter` stays fully reachable; this only flags when its
// prerequisites are not yet solid, so the UI can nudge without blocking navigation.
export const moduleReadiness = snapshot => MODULES.map(module => {
  if (!module.recommendedAfter) return { ...module, ready: true };
  const prerequisites = module.recommendedAfter.map(id => MODULES.find(item => item.id === id)).filter(Boolean);
  const ready = prerequisites.every(prerequisite => completionRatio(prerequisite, snapshot) >= 0.8);
  return { ...module, ready, readyMessage: ready ? "" : "Recomendamos reforçar " + prerequisites.map(item => item.title).join(" e ") + " antes." };
});
