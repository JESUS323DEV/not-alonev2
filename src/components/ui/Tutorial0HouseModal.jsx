import { useState, useEffect } from "react";
import caja      from "../../assets/ui/icons-hud-principal/icons-zona-loot/caja.png";
import toolsCaja from "../../assets/ui/icons-hud-principal/icons-zona-loot/tools-caja.png";
import doorSfx   from "../../assets/sfx/ui-sounds/houses-sound/open-and-close-door2.mp3";

export default function Tutorial0HouseModal({
  houseId,
  bg,
  lootType,
  onLoot,
  onClose,
  effectsOn = true,
  effectsVol = 60,
}) {
  const [blackout, setBlackout] = useState(true);

  useEffect(() => {
    const audio = new Audio(doorSfx);
    audio.volume = effectsOn ? effectsVol / 100 : 0;
    audio.play().catch(() => {});
    const setup = () => {
      const delay = Math.max(0, (audio.duration - 0.5) * 1000);
      setTimeout(() => setBlackout(false), delay);
    };
    if (audio.readyState >= 1) setup();
    else audio.addEventListener("loadedmetadata", setup, { once: true });
    return () => { audio.pause(); };
  }, []);

  const handleLoot = () => {
    onLoot();
    setBlackout(true);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div
      className="fondo-tutorial-house"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`house-blackout${blackout ? " active" : ""}`} />

      <button
        className={`btn-loot-tutorial-house btn-loot-tutorial-${houseId}`}
        onClick={handleLoot}
      >
        <img src={lootType === "weapon" ? toolsCaja : caja} alt="Loot" />
      </button>
    </div>
  );
}
