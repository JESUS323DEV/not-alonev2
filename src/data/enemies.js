const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const ENEMIES = [
  {
    id: "enemy1",
    name: "Vagabundo herido",
    tier: 1,
    winChance: 0.30,

    incoming: [
      "Un golpe resuena contra los tablones de la ventana. Esperas unos segundos. Otro golpe llega, más débil que el primero.",
      "Algo golpea los tablones que cubren la ventana. No parece intentar derribarlos. Solo llamar tu atención.",
      "Escuchas varios golpes secos contra la ventana tapiada. Después, silencio. Quien está fuera sigue esperando."
    ],



    confront: [
      "Llamas desde dentro. Una pausa larga. Responde con la voz rota. Dice que solo necesita algo de comer, que no va a hacer nada. Puede que sea verdad.",

      "Le preguntas qué quiere. No contesta de inmediato. Cuando habla, lo hace bajito. Dice que lleva días sin comer. No sabes si creerle."
    ],

    dialogueOption: {
      label: "Darle algo de comida",
      cost: { food: 2 },
      resultText: [
        "Oyes sus pasos alejarse. No vuelve. O al menos esa noche no.",

        "Coge lo que le das sin decir nada. Se marcha sin mirar atrás. Esperas no volver a verle."
      ]
    },

    winText: [
      "Retrocede al verte salir armado. Mantiene la mirada unos segundos antes de rendirse. Luego se marcha cojeando calle abajo.",

      "Era joven. Demasiado joven para estar solo ahí fuera. Cuando avanzas hacia él, decide que no merece la pena arriesgarse y huye.",

      "No opone mucha resistencia. Tenía hambre, miedo y pocas fuerzas. Hoy has protegido el refugio, pero no te sientes especialmente orgulloso."
    ],

    loseText: [
      "No era fuerte. Solo estaba desesperado. Aprovecha un descuido y desaparece con parte de tus provisiones.",

      "Le subestimaste. No porque supiera pelear, sino porque no tenía nada que perder. Cuando te das cuenta ya se ha marchado.",

      "Era un crío hambriento intentando sobrevivir. Se lleva lo que encuentra y desaparece entre las calles vacías."
    ]
  },

  {
    id: "enemy2",
    name: "Saqueador",
    tier: 2,
    winChance: 0.40,
    incoming: [
      "Los pasos no se detienen. Rodean la casa una vez más. Después otra. Alguien está buscando algo.",

      "Pasos sobre la grava. Luego silencio. Unos segundos después vuelven a escucharse desde otro lado del refugio.",
      "Pasos en el tejado. Lentos, metódicos. Alguien midiendo el terreno, buscando el punto más débil. Tienen tiempo y saben que tú no.",
    ],
    confront: [
      "Se acerca a la puerta. 'Solo abre. Toma tu parte y ya.' La forma en que lo dice te hace saber que hay más de uno.",
      "Los pasos rodean el edificio. Están buscando otro punto de entrada. Tienes poco tiempo para decidir.",
    ],
    dialogueOption: {
      label: "Negociar",
      cost: { food: 3, water: 2 },
      resultText: [
        "Aceptan. Se marchan sin más daño. Pero saben que tienes reservas.",
        "Toman lo que les ofreces y se van. Esta vez. La próxima puede que pidan más.",
      ],
    },
    winText: [
      "Se fue maldiciendo. Sabe dónde vives. No sabes si eso significa que no vuelve o que la próxima vez no vendrá solo.",
      "Cedió antes de que cediera la puerta. Pero no se fue tranquilo. Nunca se van tranquilos.",
    ],
    loseText: [
      "Sabía exactamente lo que buscaba. Lo encontró antes de que pudieras hacer nada.",
      "Entró como si el sitio fuera suyo. Salió con parte de lo tuyo. Sin prisa, sin mirar atrás.",
    ],
  },

  {
    id: "enemy3",
    name: "Saqueador armado",
    tier: 3,
    winChance: 0.50,

    incoming: [
      "Una carcajada resuena cerca de la casa. No tarda en llegar una segunda. No están solos.",

      "Una carcajada rompe el silencio de la calle. Después otra. Hay más de una persona ahí fuera.",

      "Alguien se ríe al otro lado de la puerta. No sabes de qué. Tampoco estás seguro de querer saberlo.",

      "Las risas llegan desde el exterior. Tranquilas. Relajadas. Como si quienes están fuera ya supieran cómo acabará esto."
    ],

    confront: [
      "Ya no intentan ocultarse. Hablan entre ellos como si la casa ya les perteneciera. Uno de ellos se ríe cuando oye que te mueves dentro.",

      "'Sal y será rápido.' Otra carcajada. No parece una promesa. Parece una broma privada.",

      "El marco de la puerta cede poco a poco. Escuchas cómo apuestan entre ellos cuánto tardarás en salir."
    ],

    winText: [
      "Cuando el primero cae, las risas desaparecen. De repente recuerdan que también pueden morir.",

      "Retroceden maldiciendo. Esta vez encontraron algo más peligroso de lo que esperaban.",

      "Se retiran entre amenazas. Sabes que no te respetan. Pero ahora sí te temen.",

      "El silencio vuelve poco a poco. Las risas se alejan calle abajo hasta desaparecer."
    ],

    loseText: [
      "Lo peor no fue perder. Fue escuchar cómo se reían mientras vaciaban el refugio.",

      "Registran cada rincón sin prisa. Hablan, bromean y se ríen entre ellos. Para ellos esto era entretenimiento.",

      "Se llevan comida, materiales y cualquier cosa útil. Antes de irse, uno de ellos deja escapar una carcajada.",

      "Cuando por fin se marchan, la casa parece más vacía de lo que debería."
    ]
  },

  {
    id: "enemy4",
    name: "Voz al otro lado",
    tier: 4,
    helpTrap: true,
    incoming: [
      "Escuchas a un hombre quejarse al otro lado de la puerta. Parece herido. Parece estar sufriendo.",
      "Alguien se queja al otro lado. un grito fuerte. El dolor en su voz parece real. No suena a una trampa.",
    ],
    confront: [
      "Vuelve a llamar. 'Solo necesito pasar la noche. Tengo una niña.' El silencio después es peor que los golpes.",
      "La voz se quiebra. 'Sé que estás ahí. Por favor.' No dices nada. Ella tampoco. Solo espera.",
    ],
    helpLoseText: "Eran tres. La voz era una trampa. No hubo tiempo de reaccionar.",
    ignoreText: "No vuelves a oírla. No sabes si era real. No sabes si tomaste la decisión correcta. No lo sabrás nunca.",
  },
];

export function pickEnemy(hasWeapon, isTutorial = false) {
  if (!isTutorial && Math.random() < 0.05) {
    return ENEMIES[3];
  }
  const pool = hasWeapon ? ENEMIES.slice(0, 3) : [ENEMIES[0]];
  return pool[Math.floor(Math.random() * pool.length)];
}

export { rand as pickRandomText };
