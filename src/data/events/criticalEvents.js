export const criticalEvents = [
  {
    id: "fire",
    text: `El olor te despierta antes que el fuego. Una luz anaranjada parpadea en el refugio: algo está ardiendo.
No importa cómo empezó. Si lo dejas crecer, lo perderás todo.
Tienes segundos para decidir qué sacrificar.`,
    choices: [
      {
        text: "Apagar el fuego usando agua",
        effect: { water: -9, food: -2 },
      },
      {
        text: "Dejar que se apague solo",
        effect: { water: -1, food: -8 },
      },
    ],
  },

  {
    id: "rats",
    text: `Durante la noche, un ruido te despierta de golpe. Al encender la luz, ves ojos brillando entre sombras: RATAS!!!.
Han encontrado tus provisiones y cada segundo desaparece algo más.
Espantarlas ahora significa hacer ruido. Decide qué es peor.
`,
    choices: [
      {
        text: "Proteger la comida toda la noche",
        effect: { food: -1, water: -7 },
      },
      {
        text: "Ignorarlo y dormir",
        effect: { food: -8, water: -2 },
      },
    ],
  },

  {
    id: "leak",
    text: `Un golpe torpe en la puerta te despierta. Vuelve a sonar. Desde fuera, una voz baja pide ayuda: alguien está herido.
No sabes quién es ni cuántos son. Abrir cuesta recursos. No hacerlo significa dejarlo fuera.
Decide qué clase de persona vas a ser esta noche.

`,
    choices: [
      {
        text: "Ayudar con comida",
        effect: { water: 0, food: -8 },
      },
      {
        text: "Ayudar con agua",
        effect: { water: -8, food: 0 },
      },
    ],
  },

  {
    id: "pet",
    text: `El sonido te despierta a medias. Reconoces la inquietud de tu mascota: algo no va bien.
Necesita atención ahora calor, agua, comida, o no estar sola y no hay cálculo posible.
Haces lo que toca, aunque mañana lo eches en falta.
Hay cosas que no se negocian.


`,
    choices: [
      {
        text: "Ayudar a tu mascota",
        effect: { food: -5, water: -6 },
      },
    ],
  },

  {
    id: "coldNight",
    text: `La noche es más fría de lo normal. El frío se cuela poco a poco y el refugio ya no protege igual.
Tu mascota busca calor. Mantenerlo cuesta recursos; no hacerlo hará la noche más larga.
Decide cómo vas a pasar esta noche.`,
    choices: [
      {
        text: "Quemar suministros para mantener el calor",
        effect: { food: -7, water: -1 },
      },
      {
        text: "Hervir agua para mantener el calor",
        effect: { food: 0, water: -8 },
      },
    ],
  },

  {
    id: "yisus_exhaustion",
    text: `Durante la noche el cuerpo dice basta. Los músculos no responden igual y cada movimiento cuesta más de lo normal.
No es una herida. Es desgaste puro, acumulado día tras día.
Puedes gastar comida para recuperar fuerzas, o usar agua para aguantar despierto hasta que pase.`,
    choices: [
      {
        text: "Comer y recuperar fuerzas",
        effect: { food: -7, water: -2 },
      },
      {
        text: "Beber agua y aguantar",
        effect: { food: -1, water: -8 },
      },
    ],
  },

  {
    id: "yisus_ambush",
    text: `Sales unos metros del refugio para comprobar que todo sigue en calma.
No lo está.
Desde la oscuridad alguien se mueve demasiado rápido. No llega a alcanzarte, pero te obliga a retroceder a toda prisa.
Vuelves dentro con el pulso acelerado y la respiración rota. La noche no ha terminado.`,
    choices: [
      {
        text: "Comer para recuperar fuerzas",
        effect: { food: -6, water: -1 },
      },
      {
        text: "Beber agua para calmar el cuerpo",
        effect: { food: -2, water: -6 },
      },
    ],
  },
];
