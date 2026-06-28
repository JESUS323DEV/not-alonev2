import { useState } from "react";
import { X, Clock } from "lucide-react";
import foodImg from "../../assets/ui/icons-hud-principal/hud-recursos/food.png";
import staminaImg from "../../assets/ui/icons-hud-principal/hud-recursos/stamina.png";
import waterImg from "../../assets/ui/icons-hud-principal/hud-recursos/water2.png";
import avatarYisus from "../../assets/characters/avatar-select-yisus.png";
import avatarLia from "../../assets/characters/avatar-select-lia.png";
import bateIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/bate-icon.png";
import tuberiaIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/tuberia-icon.png";
import palancaIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/palanca-icon.png";
import tablon2 from "../../assets/ui/icons-hud-principal/icons-tools-weapons/tablon-2.png";
import clavosIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/calvos-icon.png";
import { WEAPONS } from "../../data/weapons.js";

const CHARACTER_IMAGES = { man: avatarYisus, woman: avatarLia };
const CHARACTER_NAMES  = { man: "Yisus",     woman: "Lia" };

const RESOURCE_IMGS = { food: foodImg, water: waterImg, stamina: staminaImg, tablones: tablon2, clavos: clavosIcon };

const WEAPON_IMGS = { bate: bateIcon, tuberia: tuberiaIcon, palanca: palancaIcon };
const WEAPON_FILL = {
  bate:    "rgba(10, 20, 80, 0.88)",
  tuberia: "rgba(55, 15, 80, 0.88)",
  palanca: "rgba(80, 60, 5, 0.88)",
};
const WEAPON_BORDER = {
  bate:    "rgba(60, 100, 220, 0.5)",
  tuberia: "rgba(140, 60, 200, 0.5)",
  palanca: "rgba(200, 160, 20, 0.5)",
};

function WeaponSlot({ weapon, isEquipped, onClick }) {
  if (!weapon) {
    return (
      <div className="hud-weapon-slot slot-empty" onClick={onClick}>
        <span className="slot-empty-label">Sin arma</span>
      </div>
    );
  }
  const maxUses = WEAPONS[weapon.weaponId]?.maxUses ?? 1;
  const fillPct = Math.max(0, (weapon.usesLeft / maxUses) * 100);
  const broken  = weapon.usesLeft <= 0;
  return (
    <div
      className={`hud-weapon-slot${broken ? " slot-broken-state" : ""}${isEquipped ? " slot-equipped" : ""}`}
      style={{ borderColor: WEAPON_BORDER[weapon.weaponId] }}
      onClick={onClick}
    >
      <div className="slot-fill" style={{ height: `${fillPct}%`, background: WEAPON_FILL[weapon.weaponId] }} />
      <img src={WEAPON_IMGS[weapon.weaponId]} alt={weapon.weaponId} />
      {broken && (
        <div className="slot-broken-overlay">
          <X size={20} color="#ff4444" />
        </div>
      )}
    </div>
  );
}

export default function HUD({ characterId, food, stamina, water, day, timeLeft, floats = [], staminaAlert = false, inventory, onDiscard, onEquip, onAvatarClick, onTerminarDia, tutorialBlocked = false }) {
  const [showSelector, setShowSelector] = useState(false);

  const lowStamina    = stamina <= 5;
  const weapons       = inventory?.weapons      ?? [];
  const equippedId    = inventory?.equippedWeaponId ?? null;
  const equippedWeapon = weapons.find((w) => w.id === equippedId) ?? null;
  const tablonesStock = inventory?.tablonesStock ?? 0;
  const clavos        = inventory?.clavos        ?? 0;

  const handleSlotClick = () => {
    if (equippedWeapon?.usesLeft <= 0) {
      onDiscard?.(equippedWeapon.id);
    } else {
      setShowSelector((prev) => !prev);
    }
  };

  return (
    <div className="cont-hud">
      {/* Floating numbers */}
      {floats.map((f) => (
        <span
          key={f.id}
          className={`float-number float-${f.type} ${f.value > 0 ? "float-positive" : "float-negative"}`}
        >
          {f.value > 0 ? "+" : ""}{f.value}
          <img src={RESOURCE_IMGS[f.type]} className="float-icon" alt={f.type} />
        </span>
      ))}

      <div className="hud-yisus-lia">

        {/* Weapon selector popover */}
        {showSelector && weapons.length > 0 && (
          <div className="weapon-selector">
            {weapons.map((w) => (
              <div
                key={w.id}
                className="weapon-selector-item"
                onClick={() => { onEquip?.(w.id); setShowSelector(false); }}
              >
                <WeaponSlot weapon={w} isEquipped={w.id === equippedId} />
                <span className="selector-name">{WEAPONS[w.weaponId]?.name}</span>
                {w.usesLeft <= 0 && (
                  <button
                    className="selector-discard"
                    onClick={(e) => { e.stopPropagation(); onDiscard?.(w.id); setShowSelector(false); }}
                  >
                    Tirar
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Top row: día / timer / terminar */}
        <div className="hud-top-row">
          <p className="hud-day-label">Día: {day}</p>
          <p className="hud-timer"><Clock size={11} strokeWidth={1.8} />{timeLeft}s</p>
          <button className="btn-terminar-dia" onClick={onTerminarDia} disabled={tutorialBlocked} style={tutorialBlocked ? { opacity: 0.3, cursor: "not-allowed" } : {}}>Terminar día</button>
        </div>

        {/* Bottom row: arma / recursos */}
        <div className="hud-main-row">
          <WeaponSlot weapon={equippedWeapon} isEquipped onClick={handleSlotClick} />

          <div className="cont-recursos">
            <div className="cont-food">
              <img src={foodImg} alt="Food" />
              <p>{food}</p>
            </div>
            <div className={`cont-stamina ${lowStamina ? "low-stamina" : ""} ${staminaAlert ? "stamina-alert" : ""}`}>
              <img src={staminaImg} alt="Stamina" />
              <p>{stamina}</p>
            </div>
            <div className="cont-water">
              <img src={waterImg} alt="Agua" />
              <p>{water}</p>
            </div>
            <div className="hud-inv-item">
              <img src={tablon2} alt="Tablones" />
              <span>{tablonesStock}</span>
            </div>
            <div className="hud-inv-item">
              <img src={clavosIcon} alt="Clavos" />
              <span>{clavos}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
