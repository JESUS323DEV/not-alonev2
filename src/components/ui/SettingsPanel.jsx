import { useState } from "react";
import { X, RefreshCw, Info, Rocket, Music, Volume2 } from "lucide-react";

export default function SettingsPanel({ onNewGame, onClose, audioSettings, onAudioChange }) {
  const [confirmNew, setConfirmNew] = useState(false);

  const set = (key, value) => onAudioChange((prev) => ({ ...prev, [key]: value }));

  const handleNewGame = () => {
    if (confirmNew) {
      onNewGame();
      onClose();
    } else {
      setConfirmNew(true);
    }
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>

        <div className="settings-header">
          <span className="settings-title">Ajustes</span>
          <button className="settings-close" onClick={onClose}><X size={16} /></button>
        </div>

        {/* Music */}
        <div className="settings-row">
          <Music size={16} className="settings-icon" />
          <span className="settings-label">Música</span>
        </div>
        <input
          type="range" min={0} max={100} value={audioSettings.musicVol}
          className="settings-slider"
          onChange={(e) => set("musicVol", Number(e.target.value))}
        />

        {/* Effects */}
        <div className="settings-row">
          <Volume2 size={16} className="settings-icon" />
          <span className="settings-label">Efectos</span>
        </div>
        <input
          type="range" min={0} max={100} value={audioSettings.effectsVol}
          className="settings-slider"
          onChange={(e) => set("effectsVol", Number(e.target.value))}
        />

        <div className="settings-divider" />

        <button
          className={`settings-action ${confirmNew ? "confirm-state" : ""}`}
          onClick={handleNewGame}
          onMouseLeave={() => setConfirmNew(false)}
        >
          <RefreshCw size={16} />
          <span>{confirmNew ? "Confirmar" : "Nuevo juego"}</span>
        </button>

        <button className="settings-action placeholder">
          <Info size={16} />
          <span>Sobre el juego</span>
        </button>

        <button className="settings-action placeholder">
          <Rocket size={16} />
          <span>Próximamente</span>
        </button>

      </div>
    </div>
  );
}
