import { useEffect, useRef, useState } from "react";
import stormSfx      from "./assets/sfx/ui-sounds/storm.mp3";
import refugio1Sfx   from "./assets/sfx/ui-sounds/sound-refugio.mp3";
import refugio2Sfx   from "./assets/sfx/ui-sounds/sound-refugio2.mp3";
import tutorialBgSfx from "./assets/sfx/sfx-tutorial/bg-tutorial/bg-tuto.mp3";

const REFUGIO_TRACKS = [refugio1Sfx, refugio2Sfx];

// ── Volúmenes base (0.0 a 1.0) ──
const VOL_STORM       = 0.09;
const VOL_REFUGIO     = 0.09;
const VOL_TUTORIAL_BG = 0.09;

import { useGameState } from "./hooks/useGameState.js";
import { useHouses } from "./hooks/useHouses.js";
import { usePet } from "./hooks/usePet.js";
import { useScavenge } from "./hooks/useScavenge.js";
import { useSelectionFlow } from "./hooks/useSelectionFlow.js";
import { useFloatingNumbers } from "./hooks/useFloatingNumbers.js";
import { useInventory } from "./hooks/useInventory.js";
import { useCombat } from "./hooks/useCombat.js";
import { useTutorial0 } from "./hooks/useTutorial0.js";

import WinScreen from "./components/screens/WinScreen.jsx";
import LoseScreen from "./components/screens/LoseScreen.jsx";
import SelectionScreen from "./components/screens/SelectionScreen.jsx";
import GameScreen from "./components/screens/GameScreen.jsx";
import EventModal from "./components/ui/EventModal.jsx";

import { STORAGE_KEYS } from "./config/storageKeys.js";
import { clearSave } from "./systems/saveSystem.js";

import logo from "./assets/ui/logos/logo2.png";
import bgSelectPj from "./assets/backgrounds/bg-hud-principal/fondo-select-pj.png";

import "./intro.css";
import "./styles-game.css";
import "./events.css";
import "./map-styles.css";
import "./styles-inside-house.css";
import "./win-lose.css";

export default function App() {
  const { floats, staminaAlert, addFloat, triggerStaminaAlert } = useFloatingNumbers();
  const stormAudioRef      = useRef(null);
  const refugioAudioRef    = useRef(null);
  const refugioIndexRef    = useRef(0);
  const tutorialBgRef      = useRef(null);
  const [audioSettings, setAudioSettings] = useState({
    musicOn: true, musicVol: 80,
    effectsOn: true, effectsVol: 60,
  });
  const audioSettingsRef = useRef(audioSettings);
  useEffect(() => { audioSettingsRef.current = audioSettings; }, [audioSettings]);

  const {
    gameState,
    setGameState,
    eventoSinSalida,
    startGame,
    finishPhase0,
    resetToSelection,
    handleEventChoice,
    terminarDia,
  } = useGameState({ addFloat });

  const tutorial0 = useTutorial0({ setGameState, addFloat });

  const houses = useHouses({ gameState, setGameState, addFloat, triggerStaminaAlert });
  const pet = usePet({ gameState, setGameState, addFloat });
  const scavenge = useScavenge({ gameState, setGameState, addFloat });
  const inventory = useInventory({ gameState, setGameState });
  const combat = useCombat({ gameState, setGameState });
  const selectionFlow = useSelectionFlow();

  const newGame = () => {
    clearSave(STORAGE_KEYS.SAVE);
    houses.reset();
    pet.reset();
    scavenge.reset();
    selectionFlow.reset();
    tutorial0.reset();
    resetToSelection();
  };

  // Storm ambient sound during selection screens
  useEffect(() => {
    if (gameState.screen !== "selection") return;

    const audio = new Audio(stormSfx);
    audio.volume = audioSettings.musicOn ? (audioSettings.musicVol / 100) * VOL_STORM : 0;
    audio.loop = true;
    audio.play().catch(() => {});
    stormAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      stormAudioRef.current = null;
    };
  }, [gameState.screen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Música de fondo del tutorial (phase0)
  useEffect(() => {
    if (gameState.screen !== "game" || gameState.tutorialPhase !== "phase0") {
      if (tutorialBgRef.current) {
        tutorialBgRef.current.pause();
        tutorialBgRef.current.currentTime = 0;
        tutorialBgRef.current = null;
      }
      return;
    }

    const audio = new Audio(tutorialBgSfx);
    audio.volume = audioSettings.musicOn ? (audioSettings.musicVol / 100) * VOL_TUTORIAL_BG : 0;
    audio.loop = true;
    audio.play().catch(() => {});
    tutorialBgRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      tutorialBgRef.current = null;
    };
  }, [gameState.screen, gameState.tutorialPhase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Aplica cambios de volumen al tutorial bg en tiempo real
  useEffect(() => {
    const audio = tutorialBgRef.current;
    if (!audio) return;
    audio.volume = audioSettings.musicOn ? (audioSettings.musicVol / 100) * VOL_TUTORIAL_BG : 0;
  }, [audioSettings.musicOn, audioSettings.musicVol]);

  // Música del refugio — para cuando hay evento de combate, vuelve cuando termina
  useEffect(() => {
    if (gameState.screen !== "game" || gameState.showCombat || gameState.tutorialPhase === "phase0") {
      if (refugioAudioRef.current) {
        refugioAudioRef.current.onended = null;
        refugioAudioRef.current.pause();
        refugioAudioRef.current.currentTime = 0;
        refugioAudioRef.current = null;
      }
      return;
    }

    refugioIndexRef.current = 0;

    const playNext = () => {
      const s = audioSettingsRef.current;
      const audio = new Audio(REFUGIO_TRACKS[refugioIndexRef.current]);
      audio.volume = s.musicOn ? (s.musicVol / 100) * VOL_REFUGIO : 0;
      audio.onended = () => {
        refugioIndexRef.current = (refugioIndexRef.current + 1) % REFUGIO_TRACKS.length;
        playNext();
      };
      audio.play().catch(() => {});
      refugioAudioRef.current = audio;
    };

    playNext();

    return () => {
      if (refugioAudioRef.current) {
        refugioAudioRef.current.onended = null;
        refugioAudioRef.current.pause();
        refugioAudioRef.current.currentTime = 0;
        refugioAudioRef.current = null;
      }
    };
  }, [gameState.screen, gameState.showCombat, gameState.tutorialPhase]);

  // Aplica cambios de volumen de música al refugio en tiempo real
  useEffect(() => {
    const audio = refugioAudioRef.current;
    if (!audio) return;
    audio.volume = audioSettings.musicOn ? (audioSettings.musicVol / 100) * VOL_REFUGIO : 0;
  }, [audioSettings.musicOn, audioSettings.musicVol]);

  // Aplica cambios de volumen de música al storm en tiempo real
  useEffect(() => {
    const audio = stormAudioRef.current;
    if (!audio) return;
    audio.volume = audioSettings.musicOn ? (audioSettings.musicVol / 100) * VOL_STORM : 0;
  }, [audioSettings.musicOn, audioSettings.musicVol]);

  // Lightning flash on selection screen background
  useEffect(() => {
    if (gameState.screen !== "selection") return;

    const screen = document.querySelector(".bg-selectPj");
    if (!screen) return;

    const triggerFlash = () => {
      screen.classList.add("flash");
      setTimeout(() => screen.classList.remove("flash"), 800);
    };

    triggerFlash();
    const interval = setInterval(triggerFlash, 5000);
    return () => clearInterval(interval);
  }, [gameState.screen]);

  return (
    <div className="cont-select-pj main-screen">

      {gameState.screen === "win" && (
        <WinScreen onNewGame={newGame} />
      )}

      {gameState.screen === "lose" && (
        <LoseScreen onNewGame={newGame} />
      )}

      <div
        className="bg-selectPj"
        style={{ backgroundImage: `url(${bgSelectPj})` }}
      >
        <div className="contenido-select-pj">

          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          {gameState.showEvent && gameState.currentEvent && (
            <EventModal
              event={gameState.currentEvent}
              gameFood={gameState.food}
              gameWater={gameState.water}
              eventoSinSalida={eventoSinSalida}
              onChoice={handleEventChoice}
              onGoToLose={() =>
                setGameState((prev) => ({ ...prev, screen: "lose" }))
              }
            />
          )}

          {gameState.screen === "selection" && (
            <SelectionScreen
              {...selectionFlow}
              onStart={startGame}
            />
          )}

          {gameState.screen === "game" && (
            <GameScreen
              gameState={gameState}
              houses={houses}
              pet={pet}
              scavenge={scavenge}
              inventory={inventory}
              combat={combat}
              tutorial0={tutorial0}
              onTerminarDia={terminarDia}
              onNewGame={newGame}
              floats={floats}
              staminaAlert={staminaAlert}
              audioSettings={audioSettings}
              onAudioChange={setAudioSettings}
              finishPhase0={finishPhase0}
            />
          )}

        </div>
      </div>
    </div>
  );
}
