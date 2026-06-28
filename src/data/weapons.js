export const WEAPONS = {
  bate: {
    id: "bate",
    name: "Bate",
    tier: "basic",
    maxUses: 2,
    enemyPenalty: 0,
  },
  tuberia: {
    id: "tuberia",
    name: "Tubería",
    tier: "normal",
    maxUses: 3,
    enemyPenalty: 0.1,
  },
  palanca: {
    id: "palanca",
    name: "Palanca",
    tier: "legendary",
    maxUses: 4,
    enemyPenalty: 0.2,
  },
};

export const WEAPON_IDS = Object.keys(WEAPONS);
