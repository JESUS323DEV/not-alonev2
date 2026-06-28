import { X } from "lucide-react";
import { characters } from "../../data/characters.js";
import { WEAPONS } from "../../data/weapons.js";
import pjYisus from "../../assets/characters/pj-yisus.png";
import pjLia from "../../assets/characters/pj-women2.png";
import foodImg from "../../assets/ui/icons-hud-principal/hud-recursos/food.png";
import waterImg from "../../assets/ui/icons-hud-principal/hud-recursos/water2.png";
import staminaImg from "../../assets/ui/icons-hud-principal/hud-recursos/stamina.png";
import tablon2 from "../../assets/ui/icons-hud-principal/icons-tools-weapons/tablon-2.png";
import clavosIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/calvos-icon.png";
import bateIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/bate-icon.png";
import tuberiaIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/tuberia-icon.png";
import palancaIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/palanca-icon.png";

const PJ_IMGS    = { man: pjYisus, woman: pjLia };
const WEAPON_IMGS = { bate: bateIcon, tuberia: tuberiaIcon, palanca: palancaIcon };
const WEAPON_FILL = {
  bate:    "rgba(10, 20, 80, 0.88)",
  tuberia: "rgba(55, 15, 80, 0.88)",
  palanca: "rgba(80, 60, 5, 0.88)",
};

const STACK = { food: 40, water: 40, tablones: 5, clavos: 5 };

function buildGrid(inventory) {
  const items = [];
  const weapons = inventory?.weapons ?? [];
  const food    = inventory?.food    ?? 0;
  const water   = inventory?.water   ?? 0;
  const tablones = inventory?.tablonesStock ?? 0;
  const clavos   = inventory?.clavos        ?? 0;

  weapons.forEach((w) => {
    const maxUses = WEAPONS[w.weaponId]?.maxUses ?? 1;
    const fillPct = Math.max(0, (w.usesLeft / maxUses) * 100);
    items.push({ kind: "weapon", weapon: w, fillPct, broken: w.usesLeft <= 0 });
  });

  const pushStack = (kind, total, stackSize, img) => {
    if (total === 0) {
      items.push({ kind, img, amount: 0, fillPct: 0, empty: true });
      return;
    }
    const full  = Math.floor(total / stackSize);
    const rest  = total % stackSize;
    for (let i = 0; i < full; i++)
      items.push({ kind, img, amount: stackSize, fillPct: 100 });
    if (rest > 0)
      items.push({ kind, img, amount: rest, fillPct: (rest / stackSize) * 100 });
  };

  pushStack("food",    food,    STACK.food,    foodImg);
  pushStack("water",   water,   STACK.water,   waterImg);
  pushStack("tablones",tablones,STACK.tablones,tablon2);
  pushStack("clavos",  clavos,  STACK.clavos,  clavosIcon);

  return items;
}

function GridCell({ item }) {
  if (item.kind === "weapon") {
    const { weapon, fillPct, broken } = item;
    return (
      <div className="inv-cell inv-cell-weapon">
        <div className="inv-cell-fill" style={{ height: `${fillPct}%`, background: WEAPON_FILL[weapon.weaponId] }} />
        <img src={WEAPON_IMGS[weapon.weaponId]} alt={weapon.weaponId} className="inv-cell-img" />
        {broken && <span className="inv-cell-broken">X</span>}
        <span className="inv-cell-label">{WEAPONS[weapon.weaponId]?.name}</span>
      </div>
    );
  }

  return (
    <div className={`inv-cell inv-cell-resource${item.empty ? " inv-cell-empty" : ""}`}>
      <div className="inv-cell-fill" style={{ height: `${item.fillPct}%`, background: "rgba(200,146,42,0.25)" }} />
      <img src={item.img} alt={item.kind} className="inv-cell-img" />
      {!item.empty && <span className="inv-cell-amount">{item.amount}</span>}
    </div>
  );
}

export default function CharacterModal({ characterId, inventory, onClose, tutorialEquip = false, onEquip }) {
  const char  = characters[characterId];
  const items = buildGrid(inventory);

  return (
    <div className="char-modal-overlay" onClick={onClose}>
      <div className="char-modal" onClick={(e) => e.stopPropagation()}>

        <button className="char-modal-close" onClick={onClose}><X size={16} /></button>

        {/* PJ section */}
        <div className="char-modal-pj">
          <img src={PJ_IMGS[characterId]} alt={char.name} className="char-modal-pj-img" />
          <div className="char-modal-info">
            <h3 className="char-modal-name">{char.name}</h3>
            <p className="char-modal-lore">{char.lore}</p>
            <div className="char-modal-passive">
              <span className="passive-tag">{char.passive.name}</span>
              <p>{char.passive.description}</p>
            </div>
          </div>
        </div>

        <div className="char-modal-divider" />

        {/* Inventory */}
        <p className="char-modal-inv-title">Inventario</p>
        <div className="char-modal-grid">
          {/* Fila 1: 3 slots de arma siempre visibles */}
          {[0, 1, 2].map((slot) => {
            const w = items.filter(i => i.kind === "weapon")[slot] ?? null;
            const isUnequipped = w && inventory.equippedWeaponId !== w.weapon.id;
            const shouldPulse  = tutorialEquip && isUnequipped;
            return w
              ? (
                <div
                  key={`w${slot}`}
                  className={shouldPulse ? "tutorial-equip-pulse" : ""}
                  onClick={shouldPulse ? () => onEquip?.(w.weapon.id) : undefined}
                  style={shouldPulse ? { cursor: "pointer", borderRadius: "0.3rem" } : {}}
                >
                  <GridCell item={w} />
                </div>
              )
              : <div key={`w${slot}`} className="inv-cell inv-cell-weapon inv-cell-empty"><span className="inv-cell-label">—</span></div>;
          })}
          {/* Filas siguientes: recursos */}
          {items.filter(i => i.kind !== "weapon").map((item, i) => (
            <GridCell key={`r${i}`} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}
