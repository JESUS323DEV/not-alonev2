export const GAME_CONFIG = {
  // Day system
  DAY_DURATION: 120,
  MAX_DAY: 8,
  TUTORIAL_DAY: 1,
  END_OF_DAY_FOOD_COST: 10,
  END_OF_DAY_WATER_COST: 10,

  // Starting resources
  INITIAL_STAMINA: 20,
  INITIAL_FOOD: 0,
  INITIAL_WATER: 0,

  // Stamina costs
  SCAVENGE_STAMINA_COST: 5,
  PET_SEND_STAMINA_COST: 1,

  // Shelter scavenge rewards
  SCAVENGE_SHELTER_MIN: 2,
  SCAVENGE_SHELTER_RANGE: 4,

  // House scavenge rewards
  SCAVENGE_HOUSE_MIN: 1,
  SCAVENGE_HOUSE_RANGE: 4,

  // Pet
  PET_SEARCH_DURATION: 20,
  PET_FAIL_CHANCE: 0.1,
  PET_REWARD_MIN: 1,
  PET_REWARD_RANGE: 3,

  // Win condition
  WIN_FOOD_THRESHOLD: 5,
  WIN_WATER_THRESHOLD: 5,

  // Inventory
  MAX_WEAPONS: 2,
  TABLONES_START: 3,
  CLAVO_PER_TABLON: 2,

  // Combat trigger (seconds into the day)
  COMBAT_TRIGGER_AFTER: 30,
  COMBAT_CHANCE_EARLY: 0.5,   // days 2-5
  COMBAT_CHANCE_LATE: 0.85,   // days 6-8
  LATE_DAYS_START: 6,

  // Loot stolen per tablón level (after losing combat)
  STOLEN_2_MIN: 2,  STOLEN_2_MAX: 5,   // 2 tablones remaining
  STOLEN_1_MIN: 5,  STOLEN_1_MAX: 10,  // 1 tablón remaining
  STOLEN_0_MIN: 12, STOLEN_0_MAX: 20,  // 0 tablones remaining

  // Tool box loot
  TOOL_BOX_WEAPON_CHANCE: 0.4,
  TOOL_BOX_TABLON_CHANCE: 0.2,
  CLAVO_MIN: 1,
  CLAVO_MAX: 2,
};
