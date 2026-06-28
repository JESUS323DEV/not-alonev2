import { useState, useEffect } from "react";
import { HOUSES, HOUSE_IDS } from "../data/housesConfig.js";
import { GAME_CONFIG } from "../config/gameConfig.js";
import { STORAGE_KEYS } from "../config/storageKeys.js";
import { loadSave, writeSave, clearSave } from "../systems/saveSystem.js";
import { WEAPONS, WEAPON_IDS } from "../data/weapons.js";
import { characters } from "../data/characters.js";

const buildInitialHousesState = () =>
  HOUSE_IDS.reduce((acc, houseId) => {
    acc[houseId] = {
      isOpen: false,
      faseActual: 1,
      currentEvent: null,
      availableEvents: loadSave(
        STORAGE_KEYS.HOUSE_EVENTS[houseId],
        [...HOUSES[houseId].events]
      ),
    };
    return acc;
  }, {});

const buildInitialRebuscados = () =>
  HOUSE_IDS.reduce((acc, houseId) => {
    acc[houseId] = { a: false, b: false, c: false };
    return acc;
  }, {});

export function useHouses({ gameState, setGameState, addFloat, triggerStaminaAlert }) {
  const [houses, setHouses] = useState(buildInitialHousesState);

  const [rebuscadosCasas, setRebuscadosCasas] = useState(() =>
    loadSave(STORAGE_KEYS.REBUSCADOS_CASAS, buildInitialRebuscados())
  );
  const [rebuscadosCasasFase2, setRebuscadosCasasFase2] = useState(() =>
    loadSave(STORAGE_KEYS.REBUSCADOS_CASAS_FASE2, buildInitialRebuscados())
  );
  const [rebuscadosCasasFase3, setRebuscadosCasasFase3] = useState(() =>
    loadSave(STORAGE_KEYS.REBUSCADOS_CASAS_FASE3, buildInitialRebuscados())
  );

  const [visitedHouses, setVisitedHouses] = useState(() =>
    loadSave(STORAGE_KEYS.VISITED_HOUSES, [])
  );

  const [showMap, setShowMap] = useState(() =>
    loadSave(STORAGE_KEYS.SHOW_MAP, false)
  );

  useEffect(() => { writeSave(STORAGE_KEYS.SHOW_MAP, showMap); }, [showMap]);
  useEffect(() => {
    if (gameState.screen !== "game") setShowMap(false);
  }, [gameState.screen]);
  useEffect(() => {
    HOUSE_IDS.forEach((houseId) => {
      writeSave(STORAGE_KEYS.HOUSE_EVENTS[houseId], houses[houseId].availableEvents);
    });
  }, [houses]);
  useEffect(() => { writeSave(STORAGE_KEYS.REBUSCADOS_CASAS, rebuscadosCasas); }, [rebuscadosCasas]);
  useEffect(() => { writeSave(STORAGE_KEYS.REBUSCADOS_CASAS_FASE2, rebuscadosCasasFase2); }, [rebuscadosCasasFase2]);
  useEffect(() => { writeSave(STORAGE_KEYS.REBUSCADOS_CASAS_FASE3, rebuscadosCasasFase3); }, [rebuscadosCasasFase3]);
  useEffect(() => { writeSave(STORAGE_KEYS.VISITED_HOUSES, visitedHouses); }, [visitedHouses]);

  const enterHouse = (houseId) => {
    const house = houses[houseId];
    const isFirstVisit = !visitedHouses.includes(houseId);

    if (isFirstVisit && gameState.stamina < GAME_CONFIG.SCAVENGE_STAMINA_COST) {
      triggerStaminaAlert?.();
      return;
    }

    if (isFirstVisit) {
      const freeEntry =
        gameState.characterId === "man" &&
        Math.random() < characters.man.passive.chance;
      if (!freeEntry) {
        addFloat?.(-GAME_CONFIG.SCAVENGE_STAMINA_COST, "stamina");
        setGameState((prev) => ({
          ...prev,
          stamina: prev.stamina - GAME_CONFIG.SCAVENGE_STAMINA_COST,
        }));
      }
    }

    if (house.currentEvent || house.availableEvents.length === 0) {
      setHouses((prev) => ({ ...prev, [houseId]: { ...prev[houseId], isOpen: true } }));
      return;
    }

    const index = Math.floor(Math.random() * house.availableEvents.length);
    const evento = house.availableEvents[index];

    setHouses((prev) => ({
      ...prev,
      [houseId]: {
        ...prev[houseId],
        isOpen: true,
        currentEvent: evento,
        availableEvents: prev[houseId].availableEvents.filter((_, i) => i !== index),
      },
    }));
  };

  const resolveHouseEvent = (houseId, choice) => {
    if (gameState.stamina + choice.effect.stamina < 0) {
      triggerStaminaAlert?.();
      return;
    }
    if (choice.effect.food !== 0) addFloat?.(choice.effect.food, "food");
    if (choice.effect.water !== 0) addFloat?.(choice.effect.water, "water");
    if (choice.effect.stamina !== 0) addFloat?.(choice.effect.stamina, "stamina");
    setGameState((prev) => ({
      ...prev,
      food: prev.food + choice.effect.food,
      water: prev.water + choice.effect.water,
      stamina: prev.stamina + choice.effect.stamina,
    }));
    setHouses((prev) => ({ ...prev, [houseId]: { ...prev[houseId], currentEvent: null } }));
  };

  const closeHouse = (houseId) => {
    setHouses((prev) => ({ ...prev, [houseId]: { ...prev[houseId], isOpen: false } }));
    setVisitedHouses((prev) => prev.includes(houseId) ? prev : [...prev, houseId]);
  };

  const doScavenge = (houseId, zoneId, setRebuscados) => {
    const zoneType = HOUSES[houseId].zoneTypes?.[zoneId] ?? "food";
    if (zoneType === "tool") {
      const roll = Math.random();
      if (roll < GAME_CONFIG.TOOL_BOX_WEAPON_CHANCE) {
        const ownedTypes = (gameState.inventory?.weapons ?? []).map((w) => w.weaponId);
        const available = WEAPON_IDS.filter((id) => !ownedTypes.includes(id));
        if (available.length > 0) {
          const weaponId = available[Math.floor(Math.random() * available.length)];
          const weapon = WEAPONS[weaponId];
          const newWeapon = { id: `weapon_${Date.now()}`, weaponId, usesLeft: weapon.maxUses };
          setGameState((prev) => ({
            ...prev,
            inventory: {
              ...prev.inventory,
              weapons: [...(prev.inventory.weapons ?? []), newWeapon],
              equippedWeaponId: prev.inventory.equippedWeaponId ?? newWeapon.id,
            },
          }));
        }
      } else if (roll < GAME_CONFIG.TOOL_BOX_WEAPON_CHANCE + GAME_CONFIG.TOOL_BOX_TABLON_CHANCE) {
        addFloat?.(1, "tablones");
        setGameState((prev) => ({
          ...prev,
          inventory: { ...prev.inventory, tablonesStock: (prev.inventory.tablonesStock ?? 0) + 1 },
        }));
      } else {
        const amount =
          Math.floor(Math.random() * (GAME_CONFIG.CLAVO_MAX - GAME_CONFIG.CLAVO_MIN + 1)) +
          GAME_CONFIG.CLAVO_MIN;
        addFloat?.(amount, "clavos");
        setGameState((prev) => ({
          ...prev,
          inventory: { ...prev.inventory, clavos: (prev.inventory.clavos ?? 0) + amount },
        }));
      }
    } else {
      const bonusLoot =
        gameState.characterId === "woman" &&
        Math.random() < characters.woman.passive.chance;
      const comida =
        (Math.floor(Math.random() * GAME_CONFIG.SCAVENGE_HOUSE_RANGE) + GAME_CONFIG.SCAVENGE_HOUSE_MIN) *
        (bonusLoot ? 2 : 1);
      const agua =
        (Math.floor(Math.random() * GAME_CONFIG.SCAVENGE_HOUSE_RANGE) + GAME_CONFIG.SCAVENGE_HOUSE_MIN) *
        (bonusLoot ? 2 : 1);
      addFloat?.(comida, "food");
      addFloat?.(agua, "water");
      setGameState((prev) => ({ ...prev, food: prev.food + comida, water: prev.water + agua }));
    }
    setRebuscados((prev) => ({ ...prev, [houseId]: { ...prev[houseId], [zoneId]: true } }));
  };

  const scavengeHouse      = (houseId, zoneId) => { if (!rebuscadosCasas[houseId][zoneId])      doScavenge(houseId, zoneId, setRebuscadosCasas); };
  const scavengeHouseFase2 = (houseId, zoneId) => { if (!rebuscadosCasasFase2[houseId][zoneId]) doScavenge(houseId, zoneId, setRebuscadosCasasFase2); };
  const scavengeHouseFase3 = (houseId, zoneId) => { if (!rebuscadosCasasFase3[houseId][zoneId]) doScavenge(houseId, zoneId, setRebuscadosCasasFase3); };

  const setHouseFase = (houseId, fase) => {
    setHouses((prev) => ({ ...prev, [houseId]: { ...prev[houseId], faseActual: fase } }));
  };

  const closeAll = () => {
    setShowMap(false);
    setHouses((prev) => {
      const next = {};
      HOUSE_IDS.forEach((id) => { next[id] = { ...prev[id], isOpen: false }; });
      return next;
    });
  };

  const reset = () => {
    HOUSE_IDS.forEach((id) => clearSave(STORAGE_KEYS.HOUSE_EVENTS[id]));
    clearSave(STORAGE_KEYS.REBUSCADOS_CASAS);
    clearSave(STORAGE_KEYS.REBUSCADOS_CASAS_FASE2);
    clearSave(STORAGE_KEYS.REBUSCADOS_CASAS_FASE3);
    clearSave(STORAGE_KEYS.VISITED_HOUSES);
    clearSave(STORAGE_KEYS.SHOW_MAP);
    setHouses(
      HOUSE_IDS.reduce((acc, houseId) => {
        acc[houseId] = { isOpen: false, faseActual: 1, currentEvent: null, availableEvents: [...HOUSES[houseId].events] };
        return acc;
      }, {})
    );
    setRebuscadosCasas(buildInitialRebuscados());
    setRebuscadosCasasFase2(buildInitialRebuscados());
    setRebuscadosCasasFase3(buildInitialRebuscados());
    setVisitedHouses([]);
    setShowMap(false);
  };

  return {
    houses,
    visitedHouses,
    rebuscadosCasas,
    rebuscadosCasasFase2,
    rebuscadosCasasFase3,
    showMap,
    setShowMap,
    enterHouse,
    resolveHouseEvent,
    closeHouse,
    scavengeHouse,
    scavengeHouseFase2,
    scavengeHouseFase3,
    setHouseFase,
    closeAll,
    reset,
  };
}
