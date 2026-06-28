import { criticalEvents } from "../data/events/criticalEvents.js";
import { criticalEventsLia } from "../data/events/criticalEventsLia.js";

export const pickRandomEvent = (pool, usedIds) => {
  const available = pool.filter((event) => !usedIds.includes(event.id));
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
};

export const getCriticalEventPool = (characterId) => {
  return characterId === "woman" ? criticalEventsLia : criticalEvents;
};
