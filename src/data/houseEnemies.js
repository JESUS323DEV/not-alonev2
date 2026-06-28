const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const HOUSE_ENEMIES = [
  // ── TIER 1 ──────────────────────────────────────────────────────────────
  {
    id: "hvecino",
    name: "El vecino del 3º",
    tier: 1,
    winChance: 0.70,
    incoming: [
      "Oyes pasos lentos arrastrándose por el pasillo. Una puerta cruje. Alguien sabe que estás aquí.",
      "Una voz al fondo, ronca, confundida. Pregunta si hay alguien. No espera respuesta.",
      "Algo cae en la habitación de al lado. Pausa. Luego otra vez. Como si no terminara de decidir qué hacer.",
    ],
    confront: [
      "Es un hombre mayor en pantuflas. Te mira como si no entendiera qué haces en su casa. Luego coge el martillo y aprieta.",
      "Lleva una camisa de cuadros y los ojos perdidos. No habla. Solo se pone delante de la puerta y no se mueve.",
    ],
    winText: [
      "Cayó antes de que llegara a pegarle. Más miedo que fuerza. Cuando saliste, seguía en el suelo mirando el techo.",
      "Le empujaste y se rindió. El martillo rodó por el suelo. No lo cogió.",
    ],
    loseText: [
      "No era fuerte. Pero en ese pasillo estrecho, uno de los dos tenía que ceder. No fuiste tú.",
      "Te golpeó dos veces y saliste corriendo. Un hombre en pantuflas te echó de su casa.",
    ],
  },

  {
    id: "hcocinera",
    name: "La cocinera",
    tier: 1,
    winChance: 0.65,
    incoming: [
      "Huele a grasa caliente. Hay luz dentro. Alguien ha estado aquí hace poco, o sigue.",
      "Un ruido metálico constante desde la cocina. Rítmico. Como alguien que lleva semanas haciendo lo mismo.",
      "Voces no. Solo utensilios. Alguien trabaja sin saber que has entrado.",
    ],
    confront: [
      "Te ve y no grita. Coge la sartén y se pone entre tú y la despensa. No va a moverse.",
      "Delantal manchado, cuchillo de pan en la mano. Te mira como si fueras un problema que lleva tiempo esperando resolver.",
    ],
    winText: [
      "La sartén cayó. Ella retrocedió hasta la pared y no siguió. Cogiste lo que pudiste y saliste.",
      "Forcejeaste más de lo que esperabas. Al final cedió.",
    ],
    loseText: [
      "Ese cuchillo de pan no tiene pinta de nada pero sabía usarlo. Saliste con menos de lo que entraste.",
      "Te ganó en su cocina. Lleva meses practicando.",
    ],
  },

  {
    id: "hrepartidor",
    name: "El repartidor",
    tier: 1,
    winChance: 0.65,
    incoming: [
      "La puerta estaba abierta. Demasiado abierta. Como si alguien hubiera querido que entraras.",
      "Escuchas movimiento por encima. Pasos que siguen los tuyos con un segundo de retraso.",
      "Nada visible. Pero alguien conoce este sitio mejor que tú.",
    ],
    confront: [
      "Baja de un salto desde el altillo. Uniforme de mensajería, mochila al hombro. Te conoce a ti, no tú a él.",
      "Sale de detrás de una estantería como si llevara horas esperando. Porque lleva horas esperando.",
    ],
    winText: [
      "Sabía moverse pero no sabía pelear. Cuando le quitaste la ventaja del terreno, lo demás fue rápido.",
      "Huyó por donde vino. No lo vas a alcanzar y no hace falta.",
    ],
    loseText: [
      "Te llevó a donde quería y actuó cuando aún te orientabas.",
      "Cada esquina era suya. Nunca tuviste posibilidades reales.",
    ],
  },

  {
    id: "hestudiante",
    name: "El estudiante",
    tier: 1,
    winChance: 0.70,
    incoming: [
      "Libros apilados bloqueando el pasillo. Alguien construyó esto con cuidado. O con demasiado tiempo libre.",
      "Radio apagada, papeles por el suelo. Y respiración. Hay alguien despierto aquí.",
      "Sombra bajo la puerta. Alguien sigue encendiendo algo cada noche.",
    ],
    confront: [
      "Sale de detrás de la barricada. Ojos inyectados, manos temblando. Lleva días sin dormir y se nota.",
      "Te grita que salgas. Voz rota, sin convicción. Pero tiene algo en la mano y no lo suelta.",
    ],
    winText: [
      "Se desmoronó más rápido de lo esperado. Llevaba demasiado tiempo solo.",
      "Cuando cedió se sentó en el suelo y ya no te miró. No supo qué hacer después.",
    ],
    loseText: [
      "La desesperación da una fuerza que no tiene nombre. Te lo demostró.",
      "Meses sin dormir y aun así fue más rápido. No tenías excusa buena para perder.",
    ],
  },

  {
    id: "hjubilada",
    name: "La jubilada",
    tier: 1,
    winChance: 0.75,
    incoming: [
      "Silencio total. Pero hay una silla junto a la ventana con una manta reciente.",
      "Una taza en la mesa. Fría pero reciente. Hay alguien en este piso.",
      "Huele a colonia anticuada. A limpio. Alguien mantiene esto con orden mientras todo afuera se cae.",
    ],
    confront: [
      "Está sentada en su sillón con una manta encima. Te mira sin moverse. Saca algo de debajo de la manta sin prisa.",
      "No se levanta. Dice que ya tenía visita esperada. Sonríe. Eso es lo que más te preocupa.",
    ],
    winText: [
      "Lo que sacó no era lo que parecía pero tampoco funcionó. Saliste a tiempo.",
      "Esquivaste, ella no pudo corregir.",
    ],
    loseText: [
      "Nunca subestimes a alguien que lleva meses perfeccionando un solo plan.",
      "Simple. Efectivo. No lo viste venir.",
    ],
  },

  // ── TIER 2 ──────────────────────────────────────────────────────────────
  {
    id: "hcarnicero",
    name: "El carnicero",
    tier: 2,
    winChance: 0.45,
    incoming: [
      "Olor a sangre seca. No reciente pero tampoco antigua.",
      "Un golpe sordo cada pocos segundos. Regular. Metódico. Sin prisa.",
      "Marcas en el suelo. Arrastres. Alguien ha estado moviendo peso aquí dentro.",
    ],
    confront: [
      "No dice nada. Calcula, coge el cuchillo con la mano que ya lo tenía cerca y espera.",
      "Delantal blanco con manchas viejas. Te bloquea el paso sin moverse. Solo te mira hasta que decides tú.",
    ],
    winText: [
      "Fue más duro de lo esperado. Ganaste por centímetros y los dos lo sabéis.",
      "No huyó. Se retiró. Hay una diferencia y él la conoce.",
    ],
    loseText: [
      "Sabía exactamente dónde cortar. Tú no.",
      "Metódico. Sin errores. No dio segunda oportunidad.",
    ],
  },

  {
    id: "henfermera",
    name: "La enfermera",
    tier: 2,
    winChance: 0.50,
    incoming: [
      "Una camilla improvisada en el salón. Botiquín abierto. Alguien juega a que esto es un hospital.",
      "Olor a alcohol y desinfectante. Hay suministros médicos y alguien los está usando.",
      "Una voz suave al fondo pregunta si necesitas ayuda. No esperabas escuchar eso.",
    ],
    confront: [
      "Viene hacia ti con las manos abiertas. Dice que puede curarte. Sonríe. La jeringa está en el bolsillo.",
      "Uniforme azul, tono tranquilizador. Te pregunta cómo estás. Demasiado tranquilizador.",
    ],
    winText: [
      "Viste la jeringa a tiempo. Apenas.",
      "Cuando el engaño no funcionó cambió de plan. Pero ya no tenía la ventaja de la sorpresa.",
    ],
    loseText: [
      "No la viste venir porque no querías verla venir.",
      "Confiaste un segundo. Con uno bastó.",
    ],
  },

  {
    id: "hentrenador",
    name: "El entrenador",
    tier: 2,
    winChance: 0.40,
    incoming: [
      "Pesas improvisadas en el pasillo. Botellas llenas de arena. Alguien lleva meses sin parar.",
      "Respiración controlada. En este mundo, alguien sigue entrenando cada día.",
      "El suelo tiene marcas de movimiento. Mucho movimiento. En círculo.",
    ],
    confront: [
      "Ropa deportiva, sin arma. Te mira y estira el cuello despacio. No tiene prisa.",
      "No habla. Adopta una postura y espera. Sin arma. Sin amenaza verbal. Eso es lo que da miedo.",
    ],
    winText: [
      "Era más rápido pero cometió un error. Solo uno. Fue suficiente.",
      "Físicamente no tenías nada que hacer. Pero el espacio jugó a tu favor.",
    ],
    loseText: [
      "Sin arma y te ganó. Procésalo.",
      "Rápido, preciso, sin esfuerzo aparente. No era su primer enfrentamiento.",
    ],
  },

  // ── TIER 3 ──────────────────────────────────────────────────────────────
  {
    id: "hguardia",
    name: "El guardia de seguridad",
    tier: 3,
    winChance: 0.20,
    incoming: [
      "Una linterna barre el pasillo con regularidad. Hay un patrón. Alguien hace rondas.",
      "Cámaras desconectadas pero recolocadas para dar sensación de vigilancia. Este sitio tiene dueño.",
      "Una voz profesional te pide que te identifiques. Sin agresividad. Sin nervios. Eso es lo peor.",
    ],
    confront: [
      "Uniforme negro, placa en el pecho. No saca la porra todavía. Te da una oportunidad de explicarte.",
      "Te ha visto antes de que tú le vieras a él. Eso ya te dice todo.",
    ],
    winText: [
      "Fue la pelea más difícil hasta ahora. Ganaste porque tuvo un momento de duda que tú no tuviste.",
      "El gas pimienta falló. Sin eso el resultado habría sido otro.",
    ],
    loseText: [
      "Protocolo. Eficiencia. Cero errores.",
      "Lleva años controlando situaciones exactamente como esta.",
    ],
  },

  // ── TIER 4 ──────────────────────────────────────────────────────────────
  {
    id: "hinformatico",
    name: "El informático",
    tier: 4,
    winChance: 0.00,
    incoming: [
      "Todo está demasiado ordenado. Cables, marcas en el suelo, objetos colocados con una lógica que no es tuya.",
      "Un portátil sin batería sobre la mesa. Abierto. Pantalla en negro. Alguien lo dejó así a propósito.",
      "Silencio total. Pero cada paso que das fue calculado por alguien antes que tú.",
    ],
    confront: [
      "Está sentado. Gafas, sudadera de programación. Te saluda. Dice que llevaba tiempo esperando que alguien entrara.",
      "No se mueve de la silla. Solo señala el suelo bajo tus pies y dice que ya es demasiado tarde.",
    ],
    winText: [],
    loseText: [
      "No viste las trampas porque no sabías que estaban. Llevaba meses preparando esto.",
      "Tiempo, materiales y un solo objetivo. No tenías ninguna posibilidad real.",
    ],
  },
];

export function pickHouseEnemy() {
  const roll = Math.random();
  if (roll < 0.05) {
    return HOUSE_ENEMIES.find((e) => e.tier === 4);
  }
  if (roll < 0.20) {
    const tier3 = HOUSE_ENEMIES.filter((e) => e.tier === 3);
    return tier3[Math.floor(Math.random() * tier3.length)];
  }
  if (roll < 0.50) {
    const tier2 = HOUSE_ENEMIES.filter((e) => e.tier === 2);
    return tier2[Math.floor(Math.random() * tier2.length)];
  }
  const tier1 = HOUSE_ENEMIES.filter((e) => e.tier === 1);
  return tier1[Math.floor(Math.random() * tier1.length)];
}

export { rand as pickRandomHouseText };
