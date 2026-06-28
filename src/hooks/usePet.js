import { useState, useEffect } from "react";
import { GAME_CONFIG } from "../config/gameConfig.js";
import { STORAGE_KEYS } from "../config/storageKeys.js";
import { loadSave, writeSave, clearSave } from "../systems/saveSystem.js";

export function usePet({ gameState, setGameState, addFloat }) {
  const [ladyState, setLadyState] = useState(() => {
    const saved = loadSave(STORAGE_KEYS.PET, null);
    return saved ? saved.ladyState : "idle";
  });

  const [ladyTimer, setLadyTimer] = useState(() => {
    const saved = loadSave(STORAGE_KEYS.PET, null);
    return saved ? saved.ladyTimer : 0;
  });

  useEffect(() => {
    writeSave(STORAGE_KEYS.PET, { ladyState, ladyTimer });
  }, [ladyState, ladyTimer]);

  useEffect(() => {
    if (ladyState !== "searching") return;
    if (ladyTimer <= 0) {
      setLadyState("ready");
      return;
    }

    const interval = setInterval(() => {
      setLadyTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [ladyState, ladyTimer]);

  const enviarLady = () => {
    if (ladyState !== "idle") return;
    if (gameState.stamina < GAME_CONFIG.PET_SEND_STAMINA_COST) return;

    addFloat?.(-GAME_CONFIG.PET_SEND_STAMINA_COST, "stamina");
    setGameState((prev) => ({
      ...prev,
      stamina: prev.stamina - GAME_CONFIG.PET_SEND_STAMINA_COST,
    }));

    setLadyState("searching");
    setLadyTimer(GAME_CONFIG.PET_SEARCH_DURATION);
  };

  const reclamarLady = () => {
    if (ladyState !== "ready") return;

    const chance = Math.random();
    if (chance > GAME_CONFIG.PET_FAIL_CHANCE) {
      const food =
        Math.floor(Math.random() * GAME_CONFIG.PET_REWARD_RANGE) +
        GAME_CONFIG.PET_REWARD_MIN;
      const water =
        Math.floor(Math.random() * GAME_CONFIG.PET_REWARD_RANGE) +
        GAME_CONFIG.PET_REWARD_MIN;

      addFloat?.(food, "food");
      addFloat?.(water, "water");

      setGameState((prev) => ({
        ...prev,
        food: prev.food + food,
        water: prev.water + water,
      }));
    }

    setLadyState("idle");
    setLadyTimer(0);
  };

  const reset = () => {
    clearSave(STORAGE_KEYS.PET);
    setLadyState("idle");
    setLadyTimer(0);
  };

  return { ladyState, ladyTimer, enviarLady, reclamarLady, reset };
}
