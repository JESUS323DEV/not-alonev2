import { useState, useEffect, useRef } from "react";
import { initialGameState, initialInventory } from "../data/initialState.js";
import { characters } from "../data/characters.js";
import { pets } from "../data/pets.js";
import { GAME_CONFIG } from "../config/gameConfig.js";
import { STORAGE_KEYS } from "../config/storageKeys.js";
import { loadSave, writeSave, clearSave } from "../systems/saveSystem.js";
import { pickRandomEvent, getCriticalEventPool } from "../systems/eventSystem.js";

export function useGameState({ addFloat } = {}) {
  const [gameState, setGameState] = useState(() => {
    const saved = loadSave(STORAGE_KEYS.SAVE, null);
    if (!saved) return initialGameState;
    return {
      ...initialGameState,
      ...saved,
      inventory: { ...initialInventory, ...(saved.inventory ?? {}) },
    };
  });

  const [eventoSinSalida, setEventoSinSalida] = useState(false);

  const addFloatRef = useRef(addFloat);
  useEffect(() => { addFloatRef.current = addFloat; }, [addFloat]);

  const startGame = (characterId, petId) => {
    const character = characters[characterId];
    const pet = pets[petId];
    if (!character || !pet) return;

    const newGameState = {
      ...initialGameState,
      screen: "game",
      day: 1,
      timeLeft: initialGameState.dayDuration,
      food: 0,
      water: 0,
      stamina: initialGameState.stamina,
      maxStamina: initialGameState.maxStamina,
      characterId: character.id,
      petId: pet.id,
      petState: {
        food: pet.food,
        maxFood: pet.maxFood,
        water: pet.water,
        maxWater: pet.maxWater,
      },
      showEvent: false,
      currentEvent: null,
      usedEvents: [],
      showCombat: false,
      combatFiredDay: 0,
      tutorialPhase: "phase0",
      inventory: {
        ...initialInventory,
        weapons: initialInventory.weapons.map((w) => ({ ...w })),
        tablones: 2,
      },
    };

    writeSave(STORAGE_KEYS.SAVE, newGameState);
    setGameState(newGameState);
  };

  const resetToSelection = () => {
    clearSave(STORAGE_KEYS.SAVE);
    setGameState({
      ...initialGameState,
      screen: "selection",
      usedEvents: [],
      showEvent: false,
      currentEvent: null,
      day: 1,
      timeLeft: initialGameState.dayDuration,
    });
  };

  const handleEventChoice = (choice) => {
    if (choice.effect.food !== 0) addFloatRef.current?.(choice.effect.food, "food");
    if (choice.effect.water !== 0) addFloatRef.current?.(choice.effect.water, "water");
    setGameState((prev) => ({
      ...prev,
      showEvent: false,
      currentEvent: null,
      food: Math.max(0, prev.food + choice.effect.food),
      water: Math.max(0, prev.water + choice.effect.water),
    }));
  };

  const terminarDia = () => {
    setGameState((prev) => ({ ...prev, timeLeft: 0 }));
  };

  const finishPhase0 = () => {
    setGameState((prev) => {
      const character = characters[prev.characterId];
      return {
        ...prev,
        tutorialPhase: "collect",
        food:  initialGameState.food  + (character?.foodBonus  ?? 0),
        water: initialGameState.water + (character?.waterBonus ?? 0),
        inventory: {
          ...initialInventory,
          weapons: [],
          equippedWeaponId: null,
          tablones: 2,
        },
      };
    });
  };

  // Combat trigger
  useEffect(() => {
    if (gameState.screen !== "game") return;
    if (gameState.tutorialPhase === "phase0") return;
    if (gameState.showEvent || gameState.showCombat) return;
    if (gameState.day <= GAME_CONFIG.TUTORIAL_DAY) return;
    if (gameState.combatFiredDay === gameState.day) return;

    const triggerAt = gameState.dayDuration - GAME_CONFIG.COMBAT_TRIGGER_AFTER;
    if (gameState.timeLeft !== triggerAt) return;

    const isLate = gameState.day >= GAME_CONFIG.LATE_DAYS_START;
    const chance = isLate ? GAME_CONFIG.COMBAT_CHANCE_LATE : GAME_CONFIG.COMBAT_CHANCE_EARLY;

    setGameState((prev) => ({
      ...prev,
      combatFiredDay: prev.day,
      showCombat: Math.random() < chance,
    }));
  }, [gameState.timeLeft]);

  // Timer countdown
  useEffect(() => {
    if (gameState.screen !== "game") return;
    if (gameState.tutorialPhase === "phase0") return;
    if (gameState.showEvent || gameState.showCombat) return;

    const interval = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeLeft <= 0) return prev;
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.screen, gameState.showEvent, gameState.showCombat]);

  // End of day
  useEffect(() => {
    if (gameState.timeLeft !== 0) return;
    if (gameState.tutorialPhase === "phase0") return;
    if (gameState.showEvent) return;

    addFloatRef.current?.(-GAME_CONFIG.END_OF_DAY_FOOD_COST, "food");
    addFloatRef.current?.(-GAME_CONFIG.END_OF_DAY_WATER_COST, "water");

    setGameState((prev) => {
      const pool = getCriticalEventPool(prev.characterId);
      const event = pickRandomEvent(pool, prev.usedEvents);

      const base = {
        ...prev,
        day: prev.day + 1,
        timeLeft: prev.dayDuration,
        food: Math.max(0, prev.food - GAME_CONFIG.END_OF_DAY_FOOD_COST),
        water: Math.max(0, prev.water - GAME_CONFIG.END_OF_DAY_WATER_COST),
        stamina: prev.maxStamina,
      };

      if (!event) return base;

      return {
        ...base,
        showEvent: true,
        currentEvent: event,
        usedEvents: [...prev.usedEvents, event.id],
      };
    });
  }, [gameState.timeLeft]);

  // Check if event has no valid options
  useEffect(() => {
    if (!gameState.showEvent || !gameState.currentEvent) return;

    const hayOpcionValida = gameState.currentEvent.choices.some((choice) => {
      const sinComida =
        choice.effect.food < 0 &&
        gameState.food + choice.effect.food < 0;
      const sinAgua =
        choice.effect.water < 0 &&
        gameState.water + choice.effect.water < 0;
      return !sinComida && !sinAgua;
    });

    setEventoSinSalida(!hayOpcionValida);
  }, [gameState.showEvent, gameState.currentEvent, gameState.food, gameState.water]);

  // Lose: food AND water at 0
  useEffect(() => {
    if (gameState.screen !== "game") return;
    if (gameState.tutorialPhase === "phase0") return;
    if (gameState.showEvent) return;
    if (gameState.food <= 0 && gameState.water <= 0) {
      setGameState((prev) => ({ ...prev, screen: "lose" }));
    }
  }, [gameState.food, gameState.water, gameState.showEvent]);

  // Win/lose: day threshold
  useEffect(() => {
    if (gameState.screen !== "game") return;
    if (gameState.day !== gameState.maxDay) return;

    const gana =
      gameState.food >= GAME_CONFIG.WIN_FOOD_THRESHOLD &&
      gameState.water >= GAME_CONFIG.WIN_WATER_THRESHOLD;

    setGameState((prev) => ({ ...prev, screen: gana ? "win" : "lose" }));
  }, [gameState.day]);

  // Persist to localStorage
  useEffect(() => {
    if (gameState.screen === "game") {
      writeSave(STORAGE_KEYS.SAVE, gameState);
    }
  }, [gameState]);

  return {
    gameState,
    setGameState,
    eventoSinSalida,
    startGame,
    finishPhase0,
    resetToSelection,
    handleEventChoice,
    terminarDia,
  };
}
