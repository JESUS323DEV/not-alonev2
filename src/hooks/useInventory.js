import { GAME_CONFIG } from "../config/gameConfig.js";
import { WEAPONS } from "../data/weapons.js";

export function useInventory({ gameState, setGameState }) {
  const inventory = gameState.inventory ?? {};

  const canAddWeapon = () => {
    const ownedTypes = (inventory.weapons ?? []).map((w) => w.weaponId);
    return Object.keys(WEAPONS).some((id) => !ownedTypes.includes(id));
  };

  const equipWeapon = (weaponInstanceId) => {
    setGameState((prev) => ({
      ...prev,
      tutorialPhase: prev.tutorialPhase === "equip" ? "repair" : prev.tutorialPhase,
      inventory: { ...prev.inventory, equippedWeaponId: weaponInstanceId },
    }));
  };

  const discardWeapon = (weaponInstanceId) => {
    setGameState((prev) => {
      const remaining = prev.inventory.weapons.filter((w) => w.id !== weaponInstanceId);
      const wasEquipped = prev.inventory.equippedWeaponId === weaponInstanceId;
      const newEquipped = wasEquipped ? (remaining.find((w) => w.usesLeft > 0)?.id ?? null) : prev.inventory.equippedWeaponId;
      return {
        ...prev,
        inventory: {
          ...prev.inventory,
          weapons: remaining,
          equippedWeaponId: newEquipped,
        },
      };
    });
  };

  const boardUp = () => {
    if (!inventory.hasMartillo) return false;
    if ((inventory.tablones ?? 0) >= 3) return false;
    if ((inventory.tablonesStock ?? 0) < 1) return false;
    if ((inventory.clavos ?? 0) < GAME_CONFIG.CLAVO_PER_TABLON) return false;

    const isTutorial = gameState.tutorialPhase === "repair";
    setGameState((prev) => ({
      ...prev,
      tutorialPhase: isTutorial ? "combat" : prev.tutorialPhase,
      showCombat: isTutorial ? true : prev.showCombat,
      inventory: {
        ...prev.inventory,
        tablones: prev.inventory.tablones + 1,
        tablonesStock: prev.inventory.tablonesStock - 1,
        clavos: prev.inventory.clavos - GAME_CONFIG.CLAVO_PER_TABLON,
      },
    }));
    return true;
  };

  const canBoardUp = () =>
    inventory.hasMartillo &&
    (inventory.tablones ?? 0) < 3 &&
    (inventory.tablonesStock ?? 0) >= 1 &&
    (inventory.clavos ?? 0) >= GAME_CONFIG.CLAVO_PER_TABLON;

  return { inventory, canAddWeapon, equipWeapon, discardWeapon, boardUp, canBoardUp };
}
