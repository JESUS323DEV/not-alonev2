import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import bgGameInitial from "../../assets/backgrounds/bg-hud-principal/fondo-3.png";
import bateIcon    from "../../assets/ui/icons-hud-principal/icons-tools-weapons/bate-icon.png";
import tuberiaIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/tuberia-icon.png";
import palancaIcon from "../../assets/ui/icons-hud-principal/icons-tools-weapons/palanca-icon.png";
import hitDoorSfx    from "../../assets/sfx/ui-events/hit-door.mp3";
import stepsSfx      from "../../assets/sfx/ui-events/steps.mp3";
import laughterSfx   from "../../assets/sfx/ui-events/maniacal-laughter.mp3";
import screamSfx     from "../../assets/sfx/ui-events/man-screaming.mp3";
import impactHitSfx  from "../../assets/sfx/ui-events/impact-hit.mp3";
import ambient12Sfx  from "../../assets/sfx/ui-events/sound-envents/events-1-2.mp3";
import ambient34Sfx  from "../../assets/sfx/ui-events/sound-envents/events-3-4.mp3";
import { WEAPONS } from "../../data/weapons.js";
import { pickEnemy, pickRandomText } from "../../data/enemies.js";

const WEAPON_IMGS   = { bate: bateIcon, tuberia: tuberiaIcon, palanca: palancaIcon };
const WEAPON_FILL   = { bate: "rgba(10,20,80,0.88)", tuberia: "rgba(55,15,80,0.88)", palanca: "rgba(80,60,5,0.88)" };
const WEAPON_BORDER = { bate: "rgba(60,100,220,0.5)", tuberia: "rgba(140,60,200,0.5)", palanca: "rgba(200,160,20,0.5)" };
const ENEMY_SOUNDS   = { enemy1: hitDoorSfx, enemy2: stepsSfx, enemy3: laughterSfx, enemy4: screamSfx };
const AMBIENT_SOUNDS = { enemy1: ambient12Sfx, enemy2: ambient12Sfx, enemy3: ambient34Sfx, enemy4: ambient34Sfx };
const TYPEWRITER_SPEED      = 35;
const ENEMY3_SOUND_START    = 13;
const ENEMY3_SOUND_DURATION = 4000;
const FADE_DURATION         = 600;

// ── Volúmenes base (0.0 a 1.0) ──
const VOL_AMBIENT  = 0.08;   // events-1-2 / events-3-4
const VOL_EFFECT   = 0.5;   // golpes / pasos / risa / scream
const VOL_IMPACT   = 0.8;   // impact-hit
const HIT_DELAY           = 350;

export default function CombatModal({ inventory, onResolve, onClose, onGameLose, isTutorial = false, effectsOn = true, effectsVol = 60 }) {
  const weapons        = inventory?.weapons ?? [];
  const equippedId     = inventory?.equippedWeaponId ?? null;
  const equippedWeapon = weapons.find((w) => w.id === equippedId) ?? null;

  const [enemy]        = useState(() => pickEnemy(!!equippedWeapon, isTutorial));
  const [incomingText] = useState(() => pickRandomText(enemy.incoming));
  const [confrontText] = useState(() => pickRandomText(enemy.confront));
  const [phase, setPhase]               = useState("incoming");
  const [result, setResult]             = useState(null);
  const [resultText, setResultText]     = useState("");
  const [loseAfterResult, setLoseAfterResult] = useState(false);
  const [displayed, setDisplayed]       = useState("");
  const [typingDone, setTypingDone]     = useState(false);
  const [blackout, setBlackout]         = useState(false);
  const modalRef      = useRef(null);
  const audioRef      = useRef(null);
  const ambientRef    = useRef(null);
  const soundTimerRef = useRef(null);

  // sonido ambiental de fondo durante todo el evento
  useEffect(() => {
    const src = AMBIENT_SOUNDS[enemy.id];
    if (!src) return;
    const audio = new Audio(src);
    audio.volume = effectsOn ? (effectsVol / 100) * VOL_AMBIENT : 0;
    audio.loop = true;
    audio.play().catch(() => {});
    ambientRef.current = audio;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // arranca sonido de efecto solo en incoming
  useEffect(() => {
    const src = ENEMY_SOUNDS[enemy.id];
    if (!src) return;
    const audio = new Audio(src);
    audio.volume = effectsOn ? (effectsVol / 100) * VOL_EFFECT : 0;
    if (enemy.id === "enemy3") {
      audio.currentTime = ENEMY3_SOUND_START;
      audio.loop = false;
      soundTimerRef.current = setTimeout(() => audio.pause(), ENEMY3_SOUND_DURATION);
    } else {
      audio.loop = true;
    }
    audio.play().catch(() => {});
    audioRef.current = audio;
    return () => {
      clearTimeout(soundTimerRef.current);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // efecto maquina de escribir solo en incoming
  useEffect(() => {
    if (phase !== "incoming") return;
    const text  = incomingText;
    const speed = enemy.id === "enemy3"
      ? Math.floor(ENEMY3_SOUND_DURATION / text.length)
      : TYPEWRITER_SPEED;
    setDisplayed("");
    setTypingDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [phase]);

  // para el sonido de efecto cuando termina de escribir
  useEffect(() => {
    if (typingDone && phase === "incoming" && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [typingDone, phase]);

  // flash en cada cambio de fase (excepto resolving)
  useEffect(() => {
    if (phase === "resolving") return;
    const el = modalRef.current;
    if (!el) return;
    el.classList.add("flash");
    const t = setTimeout(() => el.classList.remove("flash"), 800);
    return () => clearTimeout(t);
  }, [phase]);

  const handleDefend = () => {
    // fade a oscuro
    setBlackout(true);

    setTimeout(() => {
      // golpe en el punto más oscuro
      const impact = new Audio(impactHitSfx);
      impact.volume = effectsOn ? (effectsVol / 100) * VOL_IMPACT : 0;
      impact.play().catch(() => {});

      // resolver combate
      const res  = onResolve(enemy, "defend");
      const text = res.won ? pickRandomText(enemy.winText) : pickRandomText(enemy.loseText);
      setResultText(text);
      setResult(res);

      // tras el golpe, fade de vuelta y mostrar resultado
      setTimeout(() => {
        setBlackout(false);
        setPhase("result");
      }, HIT_DELAY);
    }, FADE_DURATION);

    setPhase("resolving");
  };

  const handleDialogue = () => {
    onResolve(enemy, "dialogue");
    setResultText(pickRandomText(enemy.dialogueOption.resultText));
    setResult({ won: true, dialogue: true });
    setPhase("result");
  };

  const handleHelp = () => {
    setResultText(enemy.helpLoseText);
    setLoseAfterResult(true);
    setPhase("result");
  };

  const handleIgnore = () => {
    setResultText(enemy.ignoreText);
    setLoseAfterResult(false);
    setPhase("result");
  };

  const handleContinueResult = () => {
    if (loseAfterResult) onGameLose();
    else onClose();
  };

  const renderWeaponSlot = () => {
    if (!equippedWeapon) {
      return <p className="combat-weapon-note">No llevas nada encima.</p>;
    }
    const maxUses = WEAPONS[equippedWeapon.weaponId]?.maxUses ?? 1;
    const fillPct = Math.max(0, (equippedWeapon.usesLeft / maxUses) * 100);
    const broken  = equippedWeapon.usesLeft <= 0;
    return (
      <div className="combat-weapon-slot-wrap">
        <div
          className={`hud-weapon-slot${broken ? " slot-broken-state" : ""} slot-equipped`}
          style={{ borderColor: WEAPON_BORDER[equippedWeapon.weaponId] }}
        >
          <div className="slot-fill" style={{ height: `${fillPct}%`, background: WEAPON_FILL[equippedWeapon.weaponId] }} />
          <img src={WEAPON_IMGS[equippedWeapon.weaponId]} alt={equippedWeapon.weaponId} />
          {broken && (
            <div className="slot-broken-overlay">
              <X size={20} color="#ff4444" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const isHelpTrap = enemy.helpTrap;

  return (
    <div
      ref={modalRef}
      className={`modal-event combat-event${phase === "confront" ? " phase-confront" : ""}`}
      style={{ backgroundImage: `url(${bgGameInitial})` }}
    >
      {/* overlay de oscurecimiento */}
      <div className={`combat-blackout${blackout ? " active" : ""}`} />

      <div className="modal-box">
        <div className="event-choices">
          <div className={`cont-event${phase === "result" ? " combat-result-appear" : ""}`}>

            {phase === "incoming" && (
              <>
                <p>{displayed}</p>
                {typingDone && (
                  <button className="event-choice-btn" onClick={() => setPhase("confront")}>
                    Continuar
                  </button>
                )}
              </>
            )}

            {phase === "confront" && (
              <>
                <p>{confrontText}</p>
                {isHelpTrap ? (
                  <>
                    <button className="event-choice-btn" onClick={handleHelp}>
                      Abrir la puerta
                    </button>
                    <button className="event-choice-btn combat-btn-secondary" onClick={handleIgnore}>
                      No abrir
                    </button>
                  </>
                ) : (
                  <>
                    {renderWeaponSlot()}
                    <button className="event-choice-btn" onClick={handleDefend}>
                      Salir a defender
                    </button>
                    {enemy.dialogueOption && (
                      <button className="event-choice-btn combat-btn-secondary" onClick={handleDialogue}>
                        {enemy.dialogueOption.label}
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {phase === "resolving" && null}

            {phase === "result" && (
              <>
                <p>{resultText}</p>
                {result && !result.won && !result.dialogue && !loseAfterResult && (
                  <p className="combat-stolen">
                    {(result.stolenFood > 0 || result.stolenWater > 0)
                      ? `Se llevaron ${result.stolenFood} de comida y ${result.stolenWater} de agua.`
                      : "Los tablones aguantaron. Esta vez."}
                  </p>
                )}
                <button className="event-choice-btn" onClick={handleContinueResult}>
                  Continuar
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
