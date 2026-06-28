import bgModalRebuscar from "../../assets/backgrounds/houses/map-rebuscar2.png";
import puerta from "../../assets/ui/icons-hud-principal/icons-zona-loot/puerta.png";
import { HOUSE_IDS, HOUSES } from "../../data/housesConfig.js";
import HouseModal from "./HouseModal.jsx";
import { Lock, LockOpen } from "lucide-react";

export default function MapModal({
  houses,
  visitedHouses,
  rebuscadosCasas,
  rebuscadosCasasFase2,
  rebuscadosCasasFase3,
  onEnterHouse,
  onResolveEvent,
  onCloseHouse,
  onScavenge,
  onSetFase,
  onScavengeFase2,
  onScavengeFase3,
  effectsOn,
  effectsVol,
}) {
  return (
    <div
      className="cont-map-barrio"
      style={{ backgroundImage: `url(${bgModalRebuscar})` }}
    >
      <div className="contenido-map">
        {HOUSE_IDS.map((houseId, index) => {
          const n = index + 1;
          const house = houses[houseId];
          const visited = visitedHouses.includes(houseId);

          return (
            <div key={houseId} className="btn-entrarMap-wrapper">
              <button
                className={`btn-entrarMap${n}`}
                onClick={() => onEnterHouse(houseId)}
              >
                <img src={puerta} alt="Puerta" />
              </button>
              <span className={`house-lock house-lock-${n} ${visited ? "lock-open" : "lock-closed"}`}>
                {visited
                  ? <LockOpen size={12} strokeWidth={2.5} />
                  : <Lock size={12} strokeWidth={2.5} />
                }
              </span>

              {house.isOpen && (
                <HouseModal
                  houseId={houseId}
                  bg={HOUSES[houseId].bg}
                  bgFase2={HOUSES[houseId].bgFase2}
                  bgFase3={HOUSES[houseId].bgFase3}
                  faseActual={house.faseActual ?? 1}
                  currentEvent={house.currentEvent}
                  rebuscados={rebuscadosCasas[houseId]}
                  rebuscadosFase2={rebuscadosCasasFase2[houseId]}
                  rebuscadosFase3={rebuscadosCasasFase3[houseId]}
                  onResolve={(choice) => onResolveEvent(houseId, choice)}
                  onClose={() => onCloseHouse(houseId)}
                  onScavenge={(zone) => onScavenge(houseId, zone)}
                  onSetFase={(fase) => onSetFase(houseId, fase)}
                  onScavengeFase2={(zone) => onScavengeFase2(houseId, zone)}
                  onScavengeFase3={(zone) => onScavengeFase3(houseId, zone)}
                  effectsOn={effectsOn}
                  effectsVol={effectsVol}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
