import { useState } from "react";

export function useTutorial0({ setGameState, addFloat }) {
  const [houses, setHouses] = useState({
    tienda:   { isOpen: false, looted: false },
    estacion: { isOpen: false, looted: false },
  });
  const [showMap,          setShowMap]          = useState(false);
  const [showIntroLore,    setShowIntroLore]    = useState(true);
  const [showMapOverlay,   setShowMapOverlay]   = useState(false);
  const [showPreMapLore,   setShowPreMapLore]   = useState(false);
  const [showPostLootLore, setShowPostLootLore] = useState(false);
  const [endLoreSlide,     setEndLoreSlide]     = useState(0); // 0=off 1=slide1 2=slide2

  const enterHouse = (id) =>
    setHouses((prev) => ({ ...prev, [id]: { ...prev[id], isOpen: true } }));

  const lootHouse = (id) => {
    if (id === "tienda") {
      addFloat?.(10, "food");
      addFloat?.(10, "water");
      setGameState((prev) => ({ ...prev, food: prev.food + 10, water: prev.water + 10 }));
    } else {
      const weapon = { id: "weapon_phase0", weaponId: "palanca", usesLeft: 4 };
      setGameState((prev) => ({
        ...prev,
        inventory: {
          ...prev.inventory,
          weapons: [weapon],
          equippedWeaponId: weapon.id,
        },
      }));
    }
    setHouses((prev) => ({ ...prev, [id]: { ...prev[id], looted: true } }));
  };

  const closeHouse = (id) => {
    setHouses((prev) => {
      const next = { ...prev, [id]: { ...prev[id], isOpen: false } };
      if (next.tienda.looted && next.estacion.looted) {
        setShowPostLootLore(true);
        setShowMap(false);
      }
      return next;
    });
  };

  const reset = () => {
    setHouses({
      tienda:   { isOpen: false, looted: false },
      estacion: { isOpen: false, looted: false },
    });
    setShowMap(false);
    setShowIntroLore(true);
    setShowMapOverlay(false);
    setShowPreMapLore(false);
    setShowPostLootLore(false);
    setEndLoreSlide(0);
  };

  return {
    houses,
    showMap,
    setShowMap,
    showIntroLore,
    setShowIntroLore,
    showMapOverlay,
    setShowMapOverlay,
    showPreMapLore,
    setShowPreMapLore,
    showPostLootLore,
    setShowPostLootLore,
    endLoreSlide,
    setEndLoreSlide,
    enterHouse,
    lootHouse,
    closeHouse,
    reset,
  };
}
