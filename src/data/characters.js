export const characters = {
  man: {
    id: "man",
    name: "Jesús",
    waterBonus: 5,
    foodBonus: 0,
    lore: "Antes del colapso trabajaba en turnos largos, dormía poco y siempre iba cansado. Cuando todo se vino abajo, no se rompió, simplemente siguió. Su cuerpo aprendió a resistir más de lo normal, a tirar con menos descanso.",
    passive: {
      name: "Rodado",
      description: "10% de probabilidad de entrar a un edificio sin gastar energía.",
      chance: 0.10,
    },
  },
  woman: {
    id: "woman",
    name: "Lia",
    waterBonus: 0,
    foodBonus: 5,
    lore: "Antes del colapso vivía contando, repartiendo, guardando por si acaso. Cuando todo se vino abajo, aprendió a aprovechar cada resto.",
    passive: {
      name: "Rebuscadora",
      description: "10% de probabilidad de encontrar el doble de recursos al lootear.",
      chance: 0.10,
    },
  },
};
