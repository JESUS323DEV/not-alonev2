export const criticalEventsLia = [
  {
    id: "lia_1",
    text: `Durante la noche despiertas con la boca seca y el estómago encogido. Algo no ha ido bien.
Has perdido más líquidos o energía de lo que pensabas.
Puedes gastar parte del agua para aguantar la noche, o consumir comida para no venirse abajo.
Cuando amanezca, faltará uno de los dos.`,
    choices: [
      {
        text: "Beber agua para mantener el cuerpo en pie.",
        effect: { food: 0, water: -8 },
      },
      {
        text: "Comer algo para no perder fuerzas.",
        effect: { food: -8, water: 0 },
      },
    ],
  },

  {
    id: "lia_2",
    text: `Durante la noche un ruido fuerte sacude el refugio. Algo ha caído desde fuera y ha golpeado una de las paredes.
Puedes gastar agua para limpiar y evitar infecciones, o usar comida para mantener fuerzas mientras refuerzas la zona.
Antes de que amanezca, uno de los dos recursos desaparecerá.`,
    choices: [
      {
        text: "Gastar agua para limpiar",
        effect: { food: 0, water: -5 },
      },
      {
        text: "Usar comida para mantener fuerzas",
        effect: { food: -5, water: 0 },
      },
    ],
  },

  {
    id: "lia_3",
    text: `Durante la noche te ves obligada a moverte más de lo previsto. Algo cerca del refugio te mantiene en alerta constante.
El cansancio llega rápido. El cuerpo pide líquidos o energía para aguantar hasta el amanecer.
Antes de que termine la noche, gastarás agua o comida.`,
    choices: [
      {
        text: "Beber para aguantar la sed",
        effect: { food: 0, water: -6 },
      },
      {
        text: "Comer para recuperar energía",
        effect: { food: -6, water: 0 },
      },
    ],
  },

  {
    id: "lia_4",
    text: `Durante la noche el refugio se enfría más de lo normal. No es solo el frío: el cuerpo empieza a temblar sin control.
Para pasar la noche necesitas hidratarte bien o gastar comida para mantener el calor.
La noche se cobra su precio antes de terminar.`,
    choices: [
      {
        text: "gastar comida para mantener el calor.",
        effect: { food: -4, water: 0 },
      },
      {
        text: "hidratarte bien",
        effect: { food: 0, water: -4 },
      },
    ],
  },

  {
    id: "lia_5",
    text: `Durante la noche el cuerpo empieza a fallar. El pulso va rápido, la cabeza no termina de aclararse.
No es una herida ni algo concreto, es el cansancio acumulado cobrando su parte.
Necesitas agua para estabilizarte, o comida para mantenerte hasta el amanecer.`,
    choices: [
      {
        text: "Comer algo para mantenerte en pie.",
        effect: { food: -7, water: 0 },
      },
      {
        text: "Beber agua para estabilizar el cuerpo.",
        effect: { food: 0, water: -7 },
      },
    ],
  },
];
