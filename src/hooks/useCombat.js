import { GAME_CONFIG } from "../config/gameConfig.js";
import { WEAPONS } from "../data/weapons.js";

const randBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const calcStolen = (tablonesAfterLoss) => {
  if (tablonesAfterLoss >= 2)
    return {
      food: randBetween(GAME_CONFIG.STOLEN_2_MIN, GAME_CONFIG.STOLEN_2_MAX),
      water: randBetween(GAME_CONFIG.STOLEN_2_MIN, GAME_CONFIG.STOLEN_2_MAX),
    };
  if (tablonesAfterLoss === 1)
    return {
      food: randBetween(GAME_CONFIG.STOLEN_1_MIN, GAME_CONFIG.STOLEN_1_MAX),
      water: randBetween(GAME_CONFIG.STOLEN_1_MIN, GAME_CONFIG.STOLEN_1_MAX),
    };
  return {
    food: randBetween(GAME_CONFIG.STOLEN_0_MIN, GAME_CONFIG.STOLEN_0_MAX),
    water: randBetween(GAME_CONFIG.STOLEN_0_MIN, GAME_CONFIG.STOLEN_0_MAX),
  };
};

export function useCombat({ gameState, setGameState }) {
  const resolveCombat = (enemy, choice = "defend") => {
    if (choice === "dialogue") {
      const cost = enemy.dialogueOption?.cost ?? {};
      setGameState((prev) => ({
        ...prev,
        food:  Math.max(0, prev.food  - (cost.food  ?? 0)),
        water: Math.max(0, prev.water - (cost.water ?? 0)),
      }));
      return { won: true, dialogue: true, enemy, stolenFood: 0, stolenWater: 0 };
    }

    const weapons        = gameState.inventory?.weapons ?? [];
    const equippedId     = gameState.inventory?.equippedWeaponId ?? null;
    const weaponInstance = weapons.find((w) => w.id === equippedId) ?? null;
    const weapon         = weaponInstance ? WEAPONS[weaponInstance.weaponId] : null;

    const isTutorial    = gameState.tutorialPhase === "combat";
    const enemyWinChance = Math.max(0, enemy.winChance - (weapon?.enemyPenalty ?? 0));
    const playerWins    = isTutorial ? Math.random() > 0.05 : Math.random() > enemyWinChance;

    const currentTablones = gameState.inventory?.tablones ?? 0;
    let stolenFood  = 0;
    let stolenWater = 0;
    let newTablones = currentTablones;

    if (!playerWins) {
      newTablones = Math.max(0, currentTablones - 1);
      if (currentTablones < 3) {
        const stolen = calcStolen(newTablones);
        stolenFood  = stolen.food;
        stolenWater = stolen.water;
      }
    }

    let newWeapons    = weapons;
    let newEquippedId = equippedId;
    if (weaponInstance) {
      const newUses = weaponInstance.usesLeft - 1;
      newWeapons = weapons.map((w) =>
        w.id === equippedId ? { ...w, usesLeft: newUses } : w
      );
    }

    setGameState((prev) => ({
      ...prev,
      food:  Math.max(0, prev.food  - stolenFood),
      water: Math.max(0, prev.water - stolenWater),
      inventory: {
        ...prev.inventory,
        tablones:        newTablones,
        weapons:         newWeapons,
        equippedWeaponId: newEquippedId,
      },
    }));

    return { won: playerWins, enemy, stolenFood, stolenWater };
  };

  const closeCombat = () => {
    setGameState((prev) => ({
      ...prev,
      showCombat:    false,
      tutorialPhase: prev.tutorialPhase === "combat" ? "done" : prev.tutorialPhase,
    }));
  };

  const closeCombatAndLose = () => {
    setGameState((prev) => ({
      ...prev,
      showCombat: false,
      screen:     "lose",
    }));
  };

  return { resolveCombat, closeCombat, closeCombatAndLose };
}
