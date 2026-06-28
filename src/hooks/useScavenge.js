import { useState, useEffect } from "react";
import { GAME_CONFIG } from "../config/gameConfig.js";
import { WEAPONS } from "../data/weapons.js";
import { STORAGE_KEYS } from "../config/storageKeys.js";
import { loadSave, writeSave, clearSave } from "../systems/saveSystem.js";
import { characters } from "../data/characters.js";

const INITIAL_REBUSCADOS = { sofa: false, mesa: false, armario: false };
const TUTORIAL_TOOL_ZONE = "armario";

export function useScavenge({ gameState, setGameState, addFloat }) {
  const [rebuscados, setRebuscados] = useState(() =>
    loadSave(STORAGE_KEYS.REBUSCADOS, { ...INITIAL_REBUSCADOS })
  );

  useEffect(() => {
    writeSave(STORAGE_KEYS.REBUSCADOS, rebuscados);
  }, [rebuscados]);

  const rebuscar = (zona) => {
    if (rebuscados[zona]) return;

    if (zona === TUTORIAL_TOOL_ZONE) {
      const bate = WEAPONS["bate"];
      const newWeapon = { id: `weapon_tutorial_${Date.now()}`, weaponId: "bate", usesLeft: bate.maxUses };
      addFloat?.(2, "clavos");
      addFloat?.(1, "tablones");
      setGameState((prev) => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          weapons: [...(prev.inventory.weapons ?? []), newWeapon],
          equippedWeaponId: prev.inventory.equippedWeaponId,
          clavos: (prev.inventory.clavos ?? 0) + 2,
          tablonesStock: (prev.inventory.tablonesStock ?? 0) + 1,
        },
      }));
    } else {
      const bonusLoot =
        gameState.characterId === "woman" &&
        Math.random() < characters.woman.passive.chance;

      const comida =
        (Math.floor(Math.random() * GAME_CONFIG.SCAVENGE_SHELTER_RANGE) +
        GAME_CONFIG.SCAVENGE_SHELTER_MIN) * (bonusLoot ? 2 : 1);
      const agua =
        (Math.floor(Math.random() * GAME_CONFIG.SCAVENGE_SHELTER_RANGE) +
        GAME_CONFIG.SCAVENGE_SHELTER_MIN) * (bonusLoot ? 2 : 1);

      addFloat?.(comida, "food");
      addFloat?.(agua, "water");

      setGameState((prev) => ({
        ...prev,
        food: prev.food + comida,
        water: prev.water + agua,
      }));
    }

    const newRebuscados = { ...rebuscados, [zona]: true };
    setRebuscados(newRebuscados);

    if (
      gameState.tutorialPhase === "collect" &&
      newRebuscados.sofa && newRebuscados.mesa && newRebuscados.armario
    ) {
      setGameState((prev) => ({ ...prev, tutorialPhase: "equip" }));
    }
  };

  const reset = () => {
    clearSave(STORAGE_KEYS.REBUSCADOS);
    setRebuscados({ ...INITIAL_REBUSCADOS });
  };

  return { rebuscados, rebuscar, reset };
}
