import { GAME_CONFIG } from "../config/gameConfig.js";

export const initialInventory = {
  weapons: [],
  equippedWeaponId: null,
  clavos: 0,
  tablones: GAME_CONFIG.TABLONES_START,
  tablonesStock: 0,
  hasMartillo: true,
};

export const initialGameState = {
  screen: "selection",

  day: 1,
  maxDay: GAME_CONFIG.MAX_DAY,
  dayDuration: GAME_CONFIG.DAY_DURATION,
  timeLeft: GAME_CONFIG.DAY_DURATION,

  food: GAME_CONFIG.INITIAL_FOOD,
  water: GAME_CONFIG.INITIAL_WATER,
  stamina: GAME_CONFIG.INITIAL_STAMINA,
  maxStamina: GAME_CONFIG.INITIAL_STAMINA,

  showEvent: false,
  currentEvent: null,
  usedEvents: [],

  showCombat: false,
  combatFiredDay: 0,

  tutorialPhase: "collect",

  inventory: { ...initialInventory },

  characterId: null,
  petId: null,
  petState: null,
};
