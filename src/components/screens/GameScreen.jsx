import { useState, useEffect, useRef } from "react";
import { Settings } from "lucide-react";
import bgGameInitial from "../../assets/backgrounds/bg-hud-principal/fondo-3.png";
import bgTutorial0   from "../../assets/backgrounds/houses/world-tutorial/refugio-tutorial/refugio-tuto.png";
import avatarYisus from "../../assets/characters/avatar-select-yisus.png";
import avatarLia   from "../../assets/characters/avatar-select-lia.png";

const CHAR_AVATARS = { man: avatarYisus, woman: avatarLia };
import world     from "../../assets/ui/icons-hud-principal/icons-zona-loot/mapa.png";
import caja      from "../../assets/ui/icons-hud-principal/icons-zona-loot/caja.png";
import tablon1   from "../../assets/ui/icons-hud-principal/icons-tools-weapons/tablon-1.png";
import toolsCaja from "../../assets/ui/icons-hud-principal/icons-zona-loot/tools-caja.png";
import { HOUSE_IDS }        from "../../data/housesConfig.js";
import HUD                  from "../ui/HUD.jsx";
import PetButton            from "../ui/PetButton.jsx";
import MapModal             from "../ui/MapModal.jsx";
import CombatModal          from "../ui/CombatModal.jsx";
import SettingsPanel        from "../ui/SettingsPanel.jsx";
import CharacterModal       from "../ui/CharacterModal.jsx";
import Tutorial0MapModal    from "../ui/Tutorial0MapModal.jsx";
import LoreModal            from "../ui/LoreModal.jsx";
import bgLore0 from "../../assets/backgrounds/houses/world-tutorial/lore-img-tutorial/bg-lore-fase0.png";
import bgLore1 from "../../assets/backgrounds/houses/world-tutorial/lore-img-tutorial/bg-lore-1.png";
import bgLore2 from "../../assets/backgrounds/houses/world-tutorial/lore-img-tutorial/bg-lore-2.png";
import bgLore3 from "../../assets/backgrounds/houses/world-tutorial/lore-img-tutorial/bg-lore-3.png";

export default function GameScreen({
  gameState,
  houses,
  pet,
  scavenge,
  inventory,
  combat,
  tutorial0,
  onTerminarDia,
  onNewGame,
  floats,
  staminaAlert,
  audioSettings,
  onAudioChange,
  finishPhase0,
}) {
  const [showSettings, setShowSettings]   = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [screenFade, setScreenFade]       = useState(false);

  const tutorialPhase = gameState.tutorialPhase ?? "done";
  const isPhase0      = tutorialPhase === "phase0";

  const prevDayRef = useRef(gameState.day);
  useEffect(() => {
    if (gameState.day !== prevDayRef.current) {
      houses.closeAll();
      prevDayRef.current = gameState.day;
    }
  }, [gameState.day]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIntroLoreContinue = () => {
    tutorial0.setShowIntroLore(false);
    tutorial0.setShowMapOverlay(true);
  };

  const handleOverlayMapClick = () => {
    tutorial0.setShowMapOverlay(false);
    tutorial0.setShowPreMapLore(true);
  };

  const handlePreMapLoreContinue = () => {
    tutorial0.setShowPreMapLore(false);
    tutorial0.setShowMap(true);
  };

  const handlePostLootLoreContinue = () => {
    tutorial0.setShowPostLootLore(false);
    setTimeout(() => setScreenFade(true), 0);
    setTimeout(() => {
      setScreenFade(false);
      setTimeout(() => {
        setScreenFade(true);
        setTimeout(() => {
          tutorial0.setEndLoreSlide(1);
          setScreenFade(false);
        }, 1700);
      }, 1400);
    }, 1700);
  };

  const handleEndLoreContinue = () => {
    tutorial0.setEndLoreSlide(0);
    finishPhase0?.();
  };

  const combatTransition = !gameState.showCombat ? "idle"
    : houses.showMap ? "prompt"
    : "ready";

  const handleReturnToShelter = () => {
    setScreenFade(true);
    setTimeout(() => {
      houses.closeAll();
      setScreenFade(false);
    }, 700);
  };

  const anyHouseOpen   = HOUSE_IDS.some((id) => houses.houses[id].isOpen);
  const anyEventActive = HOUSE_IDS.some((id) => houses.houses[id].isOpen && houses.houses[id].currentEvent !== null);
  const tutorialBlocked = tutorialPhase === "collect" || tutorialPhase === "equip" || tutorialPhase === "repair" || tutorialPhase === "phase0";
  const showTablones    = (!anyHouseOpen && !houses.showMap) || combatTransition === "ready";

  return (
    <div
      className="cont-game"
      style={{ backgroundImage: `url(${isPhase0 ? bgTutorial0 : bgGameInitial})` }}
    >
      <div className={`screen-transition-fade${screenFade ? " active" : ""}`} />

      {/* ── FASE 0: pre-apocalipsis ── */}
      {isPhase0 && (
        <>
          {/* Lore de inicio */}
          {tutorial0.showIntroLore && (
            <LoreModal
              img={bgLore0}
              text="Las calles siguen llenas de gente. Nadie sabe lo que viene. Llevas días escuchando rumores en la radio, cortes de señal, noticias que se contradicen. Esta mañana decidiste salir a por suministros antes de que todo el mundo tuviera la misma idea."
              onContinue={handleIntroLoreContinue}
            />
          )}

          {/* Overlay oscuro + botón mapa pulsando */}
          {!tutorial0.showIntroLore && tutorial0.showMapOverlay && !tutorial0.showMap && (
            <>
              <div className="phase0-overlay" />
              <button className="btn-hud-world phase0-map-pulse" onClick={handleOverlayMapClick}>
                <img src={world} alt="Mapa" />
              </button>
            </>
          )}

          {/* Lore antes de abrir el mapa */}
          {!tutorial0.showIntroLore && !tutorial0.showMapOverlay && tutorial0.showPreMapLore && !tutorial0.showMap && (
            <LoreModal
              img={bgLore1}
              text="[Placeholder] El mapa marca dos puntos cercanos. Una tienda y la estación del tren. Si hay algo que llevarse, estará ahí."
              onContinue={handlePreMapLoreContinue}
            />
          )}

          {/* Botón mapa normal tras cerrar overlay (si vuelve del mapa sin haber looteado todo) */}
          {!tutorial0.showIntroLore && !tutorial0.showMapOverlay && !tutorial0.showPreMapLore && !tutorial0.showMap && !tutorial0.showPostLootLore && tutorial0.endLoreSlide === 0 && (
            <button className="btn-hud-world" onClick={() => tutorial0.setShowMap(true)}>
              <img src={world} alt="Mapa" />
            </button>
          )}

          {/* Mapa tutorial */}
          {tutorial0.showMap && (
            <Tutorial0MapModal
              houses={tutorial0.houses}
              onEnterHouse={tutorial0.enterHouse}
              onLoot={tutorial0.lootHouse}
              onCloseHouse={tutorial0.closeHouse}
              effectsOn={audioSettings?.effectsOn ?? true}
              effectsVol={audioSettings?.effectsVol ?? 60}
            />
          )}

          {/* Modal tras lootear las 2 casas */}
          {tutorial0.showPostLootLore && (
            <LoreModal
              img={bgLore1}
              text="[Placeholder] Ya no hay nada más que hacer aquí. Es hora de volver al refugio."
              onContinue={handlePostLootLoreContinue}
            />
          )}

          {/* Lore final slide 1 */}
          {tutorial0.endLoreSlide === 1 && (
            <LoreModal
              img={bgLore2}
              text="Cuando volviste al refugio, algo había cambiado. Las sirenas no paraban. La gente corría sin dirección. Cerraste la puerta y escuchaste el mundo desmoronarse al otro lado."
              onContinue={() => tutorial0.setEndLoreSlide(2)}
            />
          )}

          {/* Lore final slide 2 */}
          {tutorial0.endLoreSlide === 2 && (
            <LoreModal
              img={bgLore3}
              text="Han pasado horas. O días. Ya no estás seguro. Lo que tienes es lo que tienes. Lo que no tienes, tendrás que encontrarlo. Nadie viene a buscarte. Nadie sabe que estás aquí."
              onContinue={handleEndLoreContinue}
            />
          )}

          {/* HUD visible en fase 0 */}
          <HUD
            characterId={gameState.characterId}
            food={gameState.food}
            stamina={gameState.stamina}
            water={gameState.water}
            day={gameState.day}
            timeLeft={gameState.timeLeft}
            floats={floats}
            staminaAlert={staminaAlert}
            inventory={gameState.inventory}
            onDiscard={inventory.discardWeapon}
            onEquip={inventory.equipWeapon}
            onAvatarClick={() => {}}
            onTerminarDia={onTerminarDia}
            tutorialBlocked={true}
          />
        </>
      )}

      {/* ── JUEGO NORMAL ── */}
      {!isPhase0 && (
        <>
          {gameState.showCombat && combatTransition === "prompt" && (
            <div className="combat-map-prompt">
              <p>Alguien está en tu refugio.</p>
              <button className="event-choice-btn" onClick={handleReturnToShelter}>
                Volver al refugio
              </button>
            </div>
          )}

          {gameState.showCombat && combatTransition === "ready" && (
            <CombatModal
              inventory={gameState.inventory}
              onResolve={combat.resolveCombat}
              onClose={combat.closeCombat}
              onGameLose={combat.closeCombatAndLose}
              isTutorial={gameState.tutorialPhase === "combat"}
              effectsOn={audioSettings?.effectsOn ?? true}
              effectsVol={audioSettings?.effectsVol ?? 60}
            />
          )}

          {showTablones && (
            <>
              {[...Array(gameState.inventory?.tablones ?? 0)].map((_, i) => (
                <img
                  key={i}
                  src={tablon1}
                  className="window-tablon"
                  style={{ top: `${32 - i * 11}%` }}
                  alt=""
                />
              ))}
              {tutorialPhase === "repair" && inventory.canBoardUp() && (
                <button className="btn-reparar-ventana" onClick={inventory.boardUp}>
                  Reparar
                </button>
              )}
              {tutorialPhase === "done" && (gameState.inventory?.tablones ?? 0) < 3 && inventory.canBoardUp() && (
                <button className="btn-reparar-ventana" onClick={inventory.boardUp}>
                  Reparar
                </button>
              )}
            </>
          )}

          {showInventory && (
            <CharacterModal
              characterId={gameState.characterId}
              inventory={{
                ...gameState.inventory,
                food:  gameState.food,
                water: gameState.water,
              }}
              onClose={() => setShowInventory(false)}
              tutorialEquip={tutorialPhase === "equip"}
              onEquip={(id) => { inventory.equipWeapon(id); setShowInventory(false); }}
            />
          )}

          <div className="hud-lady-yisus">
            <div className="hud-lady-world">

              {!anyEventActive && (
                <PetButton
                  petId={gameState.petId}
                  ladyState={pet.ladyState}
                  ladyTimer={pet.ladyTimer}
                  onSend={pet.enviarLady}
                  onClaim={pet.reclamarLady}
                />
              )}

              {!anyHouseOpen && (
                <>
                  {!scavenge.rebuscados.sofa && (
                    <button className="btn-rebuscar1" onClick={() => scavenge.rebuscar("sofa")}>
                      <img src={caja} alt="Buscar" />
                    </button>
                  )}
                  {!scavenge.rebuscados.mesa && (
                    <button className="btn-rebuscar2" onClick={() => scavenge.rebuscar("mesa")}>
                      <img src={caja} alt="Buscar" />
                    </button>
                  )}
                  {!scavenge.rebuscados.armario && (
                    <button className="btn-rebuscar3" onClick={() => scavenge.rebuscar("armario")}>
                      <img src={toolsCaja} alt="Herramientas" />
                    </button>
                  )}

                  <button className="btn-settings" onClick={() => setShowSettings(true)}>
                    <Settings size={20} />
                  </button>

                  {!tutorialBlocked && (
                    <button onClick={() => houses.setShowMap((prev) => !prev)} className="btn-hud-world">
                      <img src={world} alt="World" />
                    </button>
                  )}

                  <button
                    className={`btn-avatar-hud${tutorialPhase === "equip" && !showInventory ? " tutorial-equip-pulse" : ""}`}
                    onClick={() => setShowInventory(true)}
                  >
                    <img src={CHAR_AVATARS[gameState.characterId]} alt="avatar" />
                  </button>
                </>
              )}

              {showSettings && (
                <SettingsPanel
                  onNewGame={onNewGame}
                  onClose={() => setShowSettings(false)}
                  audioSettings={audioSettings}
                  onAudioChange={onAudioChange}
                />
              )}

              {houses.showMap && (
                <MapModal
                  houses={houses.houses}
                  visitedHouses={houses.visitedHouses}
                  rebuscadosCasas={houses.rebuscadosCasas}
                  rebuscadosCasasFase2={houses.rebuscadosCasasFase2}
                  rebuscadosCasasFase3={houses.rebuscadosCasasFase3}
                  onEnterHouse={houses.enterHouse}
                  onResolveEvent={houses.resolveHouseEvent}
                  onCloseHouse={houses.closeHouse}
                  onScavenge={houses.scavengeHouse}
                  onSetFase={houses.setHouseFase}
                  onScavengeFase2={houses.scavengeHouseFase2}
                  onScavengeFase3={houses.scavengeHouseFase3}
                  effectsOn={audioSettings?.effectsOn ?? true}
                  effectsVol={audioSettings?.effectsVol ?? 60}
                />
              )}
            </div>

            <HUD
              characterId={gameState.characterId}
              food={gameState.food}
              stamina={gameState.stamina}
              water={gameState.water}
              day={gameState.day}
              timeLeft={gameState.timeLeft}
              floats={floats}
              staminaAlert={staminaAlert}
              inventory={gameState.inventory}
              onDiscard={inventory.discardWeapon}
              onEquip={inventory.equipWeapon}
              onAvatarClick={() => setShowInventory(true)}
              onTerminarDia={onTerminarDia}
              tutorialBlocked={tutorialBlocked}
            />
          </div>
        </>
      )}
    </div>
  );
}
