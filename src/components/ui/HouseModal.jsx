import { useState, useEffect } from "react";
import caja from "../../assets/ui/icons-hud-principal/icons-zona-loot/caja.png";
import toolsCaja from "../../assets/ui/icons-hud-principal/icons-zona-loot/tools-caja.png";
import foodImg from "../../assets/ui/icons-hud-principal/hud-recursos/food.png";
import waterImg from "../../assets/ui/icons-hud-principal/hud-recursos/water2.png";
import staminaImg from "../../assets/ui/icons-hud-principal/hud-recursos/stamina.png";
import doorSfx from "../../assets/sfx/ui-sounds/houses-sound/open-and-close-door2.mp3";
import { HOUSES } from "../../data/housesConfig.js";

function ScavengeButton({ className, zoneType, onClick }) {
  if (zoneType === "tool") {
    return (
      <button className={`${className} btn-tool-box`} onClick={onClick}>
        <img src={toolsCaja} alt="Caja herramientas" />
      </button>
    );
  }
  return (
    <button className={className} onClick={onClick}>
      <img src={caja} alt="Buscar" />
    </button>
  );
}

export default function HouseModal({
  houseId,
  bg,
  bgFase2,
  bgFase3,
  faseActual,
  currentEvent,
  rebuscados,
  rebuscadosFase2,
  rebuscadosFase3,
  onResolve,
  onClose,
  onScavenge,
  onSetFase,
  onScavengeFase2,
  onScavengeFase3,
  effectsOn = true,
  effectsVol = 60,
}) {
  const [blackout, setBlackout] = useState(true);
  const [noTransition, setNoTransition] = useState(false);

  const scheduleReveal = (audio) => {
    const setup = () => {
      const delay = Math.max(0, (audio.duration - 0.5) * 1000);
      setTimeout(() => setBlackout(false), delay);
    };
    if (audio.readyState >= 1) setup();
    else audio.addEventListener("loadedmetadata", setup, { once: true });
  };

  useEffect(() => {
    const audio = new Audio(doorSfx);
    audio.volume = effectsOn ? effectsVol / 100 : 0;
    audio.play().catch(() => {});
    scheduleReveal(audio);
    return () => { audio.pause(); };
  }, []);

  const changeFase = (fase) => {
    setNoTransition(true);
    setBlackout(true);
    setTimeout(() => {
      onSetFase(fase);
      setNoTransition(false);
      setTimeout(() => setBlackout(false), 400);
    }, 16);
  };

  const n = houseId.replace("casa", "");
  const zoneTypes = HOUSES[houseId].zoneTypes ?? {};

  const activeBg          = faseActual === 3 ? bgFase3 : faseActual === 2 ? bgFase2 : bg;
  const activeRebuscados  = faseActual === 3 ? rebuscadosFase3 : faseActual === 2 ? rebuscadosFase2 : rebuscados;
  const activeOnScavenge  = faseActual === 3 ? onScavengeFase3 : faseActual === 2 ? onScavengeFase2 : onScavenge;

  const fase1Done = rebuscados.a && rebuscados.b && rebuscados.c;
  const fase2Done = rebuscadosFase2.a && rebuscadosFase2.b && rebuscadosFase2.c;

  // fase1 = hub: derecha → fase2 (si fase1 lista), izquierda → fase3 (si fase2 lista)
  // fase2 = izquierda vuelve a fase1
  // fase3 = derecha vuelve a fase1
  const showRightArrow =
    (faseActual === 1 && fase1Done) ||
    (faseActual === 3);
  const showLeftArrow =
    (faseActual === 1 && fase2Done) ||
    (faseActual === 2);

  const handleRightArrow = () => {
    if (faseActual === 1) changeFase(2);
    else if (faseActual === 3) changeFase(1);
  };
  const handleLeftArrow = () => {
    if (faseActual === 1) changeFase(3);
    else if (faseActual === 2) changeFase(1);
  };

  return (
    <div
      className={`fondo-${houseId}`}
      style={{ backgroundImage: `url(${activeBg})` }}
    >
      <div className={`house-blackout${blackout ? " active" : ""}${noTransition ? " no-transition" : ""}`} />

      {!currentEvent && (
        <button className={`btn-close-${houseId}`} onClick={onClose}>
          X
        </button>
      )}

      {currentEvent ? (
        <div className={`modal-event${n}`}>
          <p>{currentEvent.text}</p>
          {currentEvent.choices.map((choice, i) => (
            <button
              key={i}
              className={`btn-resolverEvent${n}`}
              onClick={() => onResolve(choice)}
            >
              {choice.text}
              <span className="choice-gain">
                {choice.effect.food !== 0 && (
                  <span className="gain-item">
                    <img src={foodImg} className="cost-icon" alt="comida" />
                    {choice.effect.food > 0 ? "+" : ""}{choice.effect.food}
                  </span>
                )}
                {choice.effect.water !== 0 && (
                  <span className="gain-item">
                    <img src={waterImg} className="cost-icon" alt="agua" />
                    {choice.effect.water > 0 ? "+" : ""}{choice.effect.water}
                  </span>
                )}
                {choice.effect.stamina !== 0 && (
                  <span className="gain-item">
                    <img src={staminaImg} className="cost-icon" alt="stamina" />
                    {choice.effect.stamina > 0 ? "+" : ""}{choice.effect.stamina}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className={`rebuscarHouse${n}`}>
          {!activeRebuscados.a && (
            <ScavengeButton
              className={`btn-rebuscarHouse${n}`}
              zoneType={zoneTypes.a}
              onClick={() => activeOnScavenge("a")}
            />
          )}
          {!activeRebuscados.b && (
            <ScavengeButton
              className={`btn-rebuscarHouse${n}-2`}
              zoneType={zoneTypes.b}
              onClick={() => activeOnScavenge("b")}
            />
          )}
          {!activeRebuscados.c && (
            <ScavengeButton
              className={`btn-rebuscarHouse${n}-3`}
              zoneType={zoneTypes.c}
              onClick={() => activeOnScavenge("c")}
            />
          )}
          {showRightArrow && (
            <button className="btn-fase2-arrow btn-fase2-arrow-right" onClick={handleRightArrow}>
              ›
            </button>
          )}
          {showLeftArrow && (
            <button className="btn-fase2-arrow btn-fase2-arrow-left" onClick={handleLeftArrow}>
              ‹
            </button>
          )}
        </div>
      )}
    </div>
  );
}
