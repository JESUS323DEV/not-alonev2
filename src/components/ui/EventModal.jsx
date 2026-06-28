import { useEffect } from "react";
import { Clock } from "lucide-react";
import bgGameInitial from "../../assets/backgrounds/bg-hud-principal/fondo-3.png";
import foodImg from "../../assets/ui/icons-hud-principal/hud-recursos/food.png";
import waterImg from "../../assets/ui/icons-hud-principal/hud-recursos/water2.png";

export default function EventModal({
  event,
  gameFood,
  gameWater,
  eventoSinSalida,
  onChoice,
  onGoToLose,
}) {
  useEffect(() => {
    const triggerFlash = () => {
      const modal = document.querySelector(".modal-event");
      if (!modal) return;
      modal.classList.add("flash");
      setTimeout(() => modal.classList.remove("flash"), 800);
    };

    triggerFlash();
    const interval = setInterval(triggerFlash, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="modal-event"
      style={{ backgroundImage: `url(${bgGameInitial})` }}
    >
      <div className="modal-box">
        <div className="event-choices">
          <div className="cont-event">
            <p>{event.text}</p>

            {event.choices.map((choice, index) => {
              const sinComida =
                choice.effect.food < 0 &&
                gameFood + choice.effect.food < 0;
              const sinAgua =
                choice.effect.water < 0 &&
                gameWater + choice.effect.water < 0;
              const bloqueado = sinComida || sinAgua;

              return (
                <button
                  key={index}
                  onClick={() => onChoice(choice)}
                  className={`event-choice-btn ${bloqueado ? "bloqueado" : ""}`}
                  disabled={bloqueado}
                >
                  <span>{choice.text}</span>
                  <span className="choice-costs">
                    {choice.effect.food !== 0 && (
                      <span className="cost food">
                        <img src={foodImg} className="cost-icon" alt="comida" />
                        {choice.effect.food > 0 ? "+" : ""}
                        {choice.effect.food}
                      </span>
                    )}
                    {choice.effect.water !== 0 && (
                      <span className="cost water">
                        <img src={waterImg} className="cost-icon" alt="agua" />
                        {choice.effect.water > 0 ? "+" : ""}
                        {choice.effect.water}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}

            {eventoSinSalida && (
              <div className="evento-sin-salida">
                <p>Perdiste</p>
                <button className="btn-evento-lose" onClick={onGoToLose}>
                  Continuar
                </button>
              </div>
            )}
          </div>

          <div className="event-resources">
            <p><img src={foodImg} className="cost-icon" alt="comida" /> Comida actual: {gameFood}</p>
            <p><img src={waterImg} className="cost-icon" alt="agua" /> Agua actual: {gameWater}</p>
            <p>
              <Clock size={12} strokeWidth={1.8} /> Consumo al final del día: -10
              <img src={foodImg} className="cost-icon" alt="comida" /> - 10
              <img src={waterImg} className="cost-icon" alt="agua" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
