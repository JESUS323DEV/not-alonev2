export const house1Events = [
  {
    id: "casa1_cadaveres",
    text: `
Nada más cruzar la puerta, el olor te golpea primero.
En el salón hay dos cuerpos en el suelo, quietos, sin señales de lucha.
Aquí nadie ganó. Solo esperaron… y perdieron.
Rebuscar ahora significa remover lo que quedó atrás.
Decide si puedes hacerlo.
    `,
    choices: [
      {
        text: "Rebuscar entre los cuerpos",
        effect: { food: +2, water: +2, stamina: -3 },
      },
      {
        text: "Apartar la mirada y seguir adelante",
        effect: { food: 0, water: 0, stamina: +2 },
      },
    ],
  },

  {
    id: "casa1_notas_finales",
    text: `
En la mesa hay papeles dispersos.
Listas. Cantidades. Fechas tachadas.
Al fondo, una nota escrita con prisa:
"Si alguien entra aquí… que no cometa nuestros errores".
No explica cuáles fueron.
Tal vez ya sea demasiado tarde.
    `,
    choices: [
      {
        text: "Leer todo con atención",
        effect: { food: 0, water: 0, stamina: +2 },
      },
      {
        text: "Ignorar las notas y rebuscar rápido",
        effect: { food: +3, water: +2, stamina: -3 },
      },
    ],
  },
];

export const house2Events = [
  {
    id: "casa2_tienda_vacia",
    text: `
Las estanterías están casi vacías.
Latas abiertas, cajas rotas, el suelo lleno de envoltorios.
Aquí pasó mucha gente… y nadie salió satisfecho.
Detrás del mostrador hay un cajón medio abierto.
Forzarlo llevará tiempo.
    `,
    choices: [
      {
        text: "Forzar el cajón del mostrador",
        effect: { food: +2, water: +1, stamina: -3 },
      },
      {
        text: "Revisar lo que quedó en las estanterías",
        effect: { food: +1, water: +1, stamina: 0 },
      },
    ],
  },

  {
    id: "casa2_camara_fria",
    text: `
Al fondo de la tienda hay una puerta cerrada.
La cámara frigorífica.
No hay electricidad, pero el interior sigue más frío de lo normal.
Abrirla puede significar encontrar algo útil…
o gastar fuerzas para nada.
    `,
    choices: [
      {
        text: "Abrir la cámara frigorífica",
        effect: { food: +4, water: 0, stamina: -3 },
      },
      {
        text: "No perder tiempo y revisar el resto.",
        effect: { food: +1, water: +4, stamina: -2 },
      },
    ],
  },
];

export const house3Events = [
  {
    id: "casa3_kebab_fogon",
    text: `
El local huele a grasa rancia y especias quemadas.
El asador sigue ahí, inmóvil, como si alguien hubiera salido un momento…
y nunca hubiera vuelto.
Debajo del fogón hay recipientes cerrados.
Nada fresco. Pero algo todavía aprovechable.
    `,
    choices: [
      {
        text: "Revisar los recipientes bajo el fogón",
        effect: { food: +4, water: 0, stamina: -2 },
      },
      {
        text: "No tocar nada y salir",
        effect: { food: 0, water: +3, stamina: -1 },
      },
    ],
  },

  {
    id: "casa3_caja_registradora",
    text: `
La caja registradora está abierta.
Dentro no hay dinero, pero sí botellas olvidadas
y un bidón pequeño de agua usado para limpiar.
Nada garantiza que esté en buen estado.
Pero sed es sed.
    `,
    choices: [
      {
        text: "Aprovechar lo que quede",
        effect: { food: +3, water: +2, stamina: -3 },
      },
      {
        text: "No arriesgarse",
        effect: { food: 0, water: 0, stamina: +2 },
      },
    ],
  },
];

export const house4Events = [
  {
    id: "casa4_salon_lujo",
    text: `
El salón está intacto: sofás, cuadros, copas de cristal. Demasiado bien conservado.
Aquí hubo dinero y recursos, pero no sirvieron cuando todo se vino abajo.
Rebuscar puede dar algo útil.
O recordarte que el lujo no salva a nadie.
    `,
    choices: [
      {
        text: "Rebuscar entre muebles y cajones",
        effect: { food: +3, water: +3, stamina: -5 },
      },
      {
        text: "No tocar nada y seguir adelante",
        effect: { food: 0, water: 0, stamina: +2 },
      },
    ],
  },

  {
    id: "casa4_despensa_oculta",
    text: `
Detrás de un panel falso encuentras una despensa privada.
Latas de calidad, botellas cerradas, todo bien ordenado.
Alguien pensó que podía prepararse para cualquier cosa.
Quizá tenía razón… durante un tiempo.
    `,
    choices: [
      {
        text: "Llevarte todo lo que puedas",
        effect: { food: +4, water: +3, stamina: -4 },
      },
      {
        text: "Coger solo lo necesario",
        effect: { food: +1, water: +1, stamina: 0 },
      },
    ],
  },
];

export const house5Events = [
  {
    id: "metro_estacion_vacia",
    text: `
La estación está en silencio.
Demasiado grande para estar vacía, demasiado vacía para sentirse segura.
Los andenes están limpios, las vías quietas.
Nada se mueve… pero no parece abandonada del todo.
Hay marcas recientes en el suelo.
Señales improvisadas.
Alguien ha pasado por aquí hace no mucho.
Si llega ayuda, no será hoy.
Pero si llega… será por este lugar.
    `,
    choices: [
      {
        text: "Continuar",
        effect: { food: 0, water: 0, stamina: 0 },
      },
    ],
  },
];
