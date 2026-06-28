import bgMap  from "../../assets/backgrounds/houses/world-tutorial/mapa-rebuscar-tutorial.png";
import puerta from "../../assets/ui/icons-hud-principal/icons-zona-loot/puerta.png";
import { TUTORIAL_HOUSE_IDS, TUTORIAL_HOUSES } from "../../data/tutorialHousesConfig.js";
import Tutorial0HouseModal from "./Tutorial0HouseModal.jsx";

export default function Tutorial0MapModal({
  houses,
  onEnterHouse,
  onLoot,
  onCloseHouse,
  effectsOn,
  effectsVol,
}) {
  return (
    <div
      className="cont-map-barrio"
      style={{ backgroundImage: `url(${bgMap})` }}
    >
      {TUTORIAL_HOUSE_IDS.map((id) => {
        const house  = houses[id];
        const config = TUTORIAL_HOUSES[id];

        return (
          <div key={id}>
            <button
              className={`btn-entrarMap-tuto btn-entrarMap-tuto-${id}${!house.looted ? " phase0-map-pulse" : ""}`}
              onClick={() => onEnterHouse(id)}
            >
              <img src={puerta} alt={config.label} />
              {house.looted && <span className="tuto-looted-check">✓</span>}
            </button>

            {house.isOpen && (
              <Tutorial0HouseModal
                houseId={id}
                bg={config.bg}
                lootType={config.lootType}
                onLoot={() => onLoot(id)}
                onClose={() => onCloseHouse(id)}
                effectsOn={effectsOn}
                effectsVol={effectsVol}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
