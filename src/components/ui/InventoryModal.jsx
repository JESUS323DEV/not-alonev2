import { useState } from "react";
import { Hammer, Zap, Wrench, Layers, Minus, X } from "lucide-react";
import { WEAPONS } from "../../data/weapons.js";
import { GAME_CONFIG } from "../../config/gameConfig.js";

const WEAPON_ICONS = {
  bate: <Zap size={16} />,
  tuberia: <Minus size={16} />,
  palanca: <Wrench size={16} />,
};

const TIER_LABELS = {
  basic: "Básica",
  normal: "Normal",
  legendary: "Legendaria",
};

export default function InventoryModal({ inventory, onBoardUp, canBoardUp, onDiscard, onClose }) {
  const [confirmDiscard, setConfirmDiscard] = useState(null);

  const weapons = inventory.weapons ?? [];
  const tablones = inventory.tablones ?? 0;
  const tablonesStock = inventory.tablonesStock ?? 0;
  const clavos = inventory.clavos ?? 0;
  const hasMartillo = inventory.hasMartillo ?? false;

  return (
    <div className="inv-overlay" onClick={onClose}>
      <div className="inv-modal" onClick={(e) => e.stopPropagation()}>
        <button className="inv-close" onClick={onClose}><X size={16} /></button>

        <h3 className="inv-title">Inventario</h3>

        {/* Herramientas */}
        <section className="inv-section">
          <p className="inv-section-title">Herramientas</p>
          {hasMartillo ? (
            <div className="inv-item">
              <Hammer size={18} />
              <span>Martillo</span>
              <span className="inv-tag tag-perm">Permanente</span>
            </div>
          ) : (
            <p className="inv-empty">Sin herramientas</p>
          )}
        </section>

        {/* Proteccion base */}
        <section className="inv-section">
          <p className="inv-section-title">Base</p>
          <div className="inv-item">
            <Layers size={18} />
            <span>Tablones ventana</span>
            <span className="inv-count">{tablones}/3</span>
          </div>
          <div className="inv-item">
            <Layers size={16} />
            <span>Tablones (stock)</span>
            <span className="inv-count">{tablonesStock}</span>
          </div>
          <div className="inv-item">
            <Minus size={16} />
            <span>Clavos</span>
            <span className="inv-count">{clavos}</span>
          </div>
          {tablones < 3 && (
            <button
              className="inv-btn-boardup"
              onClick={onBoardUp}
              disabled={!canBoardUp}
            >
              Tapiar ventana ({GAME_CONFIG.CLAVO_PER_TABLON} clavos + 1 tablón)
            </button>
          )}
        </section>

        {/* Armas */}
        <section className="inv-section">
          <p className="inv-section-title">Armas ({weapons.length}/{GAME_CONFIG.MAX_WEAPONS})</p>
          {weapons.length === 0 && <p className="inv-empty">Sin armas</p>}
          {weapons.map((w) => {
            const def = WEAPONS[w.weaponId];
            return (
              <div key={w.id} className="inv-item">
                {WEAPON_ICONS[w.weaponId]}
                <span>{def?.name}</span>
                <span className="inv-tag">{TIER_LABELS[def?.tier]}</span>
                <span className="inv-uses">{w.usesLeft}/{def?.maxUses} usos</span>
                {confirmDiscard === w.id ? (
                  <>
                    <button className="inv-btn-danger" onClick={() => { onDiscard(w.id); setConfirmDiscard(null); }}>Confirmar</button>
                    <button className="inv-btn-cancel" onClick={() => setConfirmDiscard(null)}>No</button>
                  </>
                ) : (
                  <button className="inv-btn-discard" onClick={() => setConfirmDiscard(w.id)}>Tirar</button>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
