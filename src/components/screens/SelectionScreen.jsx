import bgSelectPj from "../../assets/backgrounds/bg-hud-principal/fondo-select-pj.png";
import bgResumenPj from "../../assets/backgrounds/bg-hud-principal/fondo1.png";
import avatarYisus from "../../assets/characters/avatar-select-yisus.png";
import avatarLia from "../../assets/characters/avatar-select-lia.png";
import avatarLady from "../../assets/pets/avatar-lady.png";
import avatarTokio from "../../assets/pets/avatar-tokio.png";
import pjYisus from "../../assets/characters/pj-yisus.png";
import pjLia from "../../assets/characters/pj-women2.png";
import btnConfirmar from "../../assets/ui/btn-icons/btn-confirmar.png";
import btnComenzar from "../../assets/ui/btn-icons/btn-comenzar-partida.png";
import btnAtras from "../../assets/ui/btn-icons/btn-atras.png";
import { useState } from "react";
import { characters } from "../../data/characters.js";
import { initialGameState } from "../../data/initialState.js";

export default function SelectionScreen({
  selectedCharacter,
  setSelectedCharacter,
  selectedPet,
  setSelectedPet,
  characterConfirmed,
  setCharacterConfirmed,
  showSummary,
  setShowSummary,
  showHistory,
  setShowHistory,
  onStart,
}) {
  const [warnChar, setWarnChar] = useState(false);
  const [warnPet, setWarnPet]  = useState(false);

  const handleConfirmChar = () => {
    if (!selectedCharacter) { setWarnChar(true); return; }
    setWarnChar(false);
    setCharacterConfirmed(true);
  };

  const handleConfirmPet = () => {
    if (!selectedPet) { setWarnPet(true); return; }
    setWarnPet(false);
    setShowSummary(true);
  };

  return (
    <>
      {/* ======================================================
          HISTORIA DEL MUNDO - tiene prioridad sobre todo
          ====================================================== */}
      {showHistory && (
        <div
          className="cont-lore-history"
          style={{ backgroundImage: `url(${bgSelectPj})` }}
        >
          <div className="text-history">
            <h4>
              El mundo no se rompió de golpe. Simplemente dejó de sostenerse.
            </h4>
            <p>
              Las rutas fallaron. Los suministros llegaron tarde. La gente
              aguantó lo que pudo… hasta que aguantar ya no bastó.

              Ahora el tiempo se mide en noches superadas. En comida que dura
              un día más. En decisiones que no se pueden deshacer.

              Fuera no queda orden. Dentro, apenas queda margen.

              No estás a salvo. Pero tampoco estás solo.
            </p>
          </div>
          <div className="btn-start-game">
            <button
              onClick={() => {
                setShowHistory(false);
                onStart(selectedCharacter, selectedPet);
              }}
            >
              <img src={btnComenzar} alt="Comenzar partida" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================
          SELECCIÓN DE PERSONAJE
          ====================================================== */}
      {!characterConfirmed && !showHistory && (
        <div className="select-pj">
          <h2 className="h2-style">Selecciona personaje</h2>
          {warnChar && <p className="selection-warn">Selecciona un personaje</p>}

          <div className="cont-avatar-pj">
            <button
              className={`btn-avatar-yisus ${selectedCharacter === "man" ? "selected" : ""}`}
              onClick={() => { setSelectedCharacter("man"); setWarnChar(false); }}
            >
              <img className="avatarImg" src={avatarYisus} alt="Personaje Yisus" />
            </button>

            <button
              className={`btn-avatar-lia ${selectedCharacter === "woman" ? "selected" : ""}`}
              onClick={() => { setSelectedCharacter("woman"); setWarnChar(false); }}
            >
              <img className="avatarImg" src={avatarLia} alt="Personaje Lia" />
            </button>
          </div>

          <button className="btn-confirm-pj" onClick={handleConfirmChar}>
            <img className="img-btn" src={btnConfirmar} alt="Confirmar" />
          </button>
        </div>
      )}

      {/* ======================================================
          SELECCIÓN DE MASCOTA
          ====================================================== */}
      {characterConfirmed && !showHistory && (
        <div className="select-pet">
          <h2 className="h2-style">Selecciona mascota</h2>
          {warnPet && <p className="selection-warn">Selecciona una mascota</p>}

          <div className="cont-avatar-pet">
            <button
              className={`btn-pet-lady ${selectedPet === "lady" ? "selected" : ""}`}
              onClick={() => { setSelectedPet("lady"); setWarnPet(false); }}
            >
              <img src={avatarLady} alt="Avatar Lady" />
            </button>

            <button
              className={`btn-pet-tokio ${selectedPet === "tokio" ? "selected" : ""}`}
              onClick={() => { setSelectedPet("tokio"); setWarnPet(false); }}
            >
              <img src={avatarTokio} alt="Avatar Tokio" />
            </button>
          </div>

          <div className="confirmeBack-btn">
            <button className="btn-confirmar-pet" onClick={handleConfirmPet}>
              <img src={btnConfirmar} alt="Comenzar" />
            </button>

            <button
              className="btn-atras"
              onClick={() => {
                setSelectedPet(null);
                setCharacterConfirmed(false);
              }}
            >
              <img src={btnAtras} alt="Atras" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================
          MODAL RESUMEN - se superpone sobre selección de mascota
          ====================================================== */}
      {showSummary && !showHistory && (
        <div
          className="modal-summary"
          style={{ backgroundImage: `url(${bgResumenPj})` }}
        >
          <h2>Resumen</h2>

          <div className="img-selectPJ">
            <div className="cont-yisus">
              <div className="img-stats">
                <p>
                  <strong>Personaje:</strong>{" "}
                  {characters[selectedCharacter].name}
                </p>

                <div>
                  {(() => {
                    const char = characters[selectedCharacter];
                    const stamina = initialGameState.stamina + char.waterBonus;
                    const food    = initialGameState.food    + char.foodBonus;
                    const showStat = stamina >= food
                      ? { label: "Stamina inicial", value: stamina }
                      : { label: "Comida inicial",  value: food   };
                    return (
                      <>
                        <p><strong>{showStat.label}:</strong> {showStat.value}</p>
                        <p className="passive-summary">
                          <strong>{char.passive.name}:</strong> {char.passive.description}
                        </p>
                      </>
                    );
                  })()}
                </div>

                {selectedCharacter === "man" && (
                  <img src={pjYisus} alt="Yisus" />
                )}
                {selectedCharacter === "woman" && (
                  <img src={pjLia} alt="Lia" />
                )}
              </div>

              {/* LORE PERSONAJE */}
              {selectedCharacter === "man" && (
                <div className="lore-yisus">
                  <div className="text-lore-yisus">
                    <p>
                      Antes del colapso trabajaba en turnos largos, dormía poco
                      y siempre iba cansado. Cuando todo se vino abajo, no se
                      rompió… simplemente siguió. Su cuerpo aprendió a resistir
                      más de lo normal, a tirar con menos descanso.
                    </p>
                  </div>

                  {selectedPet === "lady" && (
                    <div className="lore-lady">
                      <img src={avatarLady} alt="Lady" />
                      <p>
                        Lady siempre está cerca. Cuando cae la noche y todo se
                        queda en silencio, no estoy solo.
                      </p>
                    </div>
                  )}
                  {selectedPet === "tokio" && (
                    <div className="lore-tokio">
                      <img src={avatarTokio} alt="Tokio" />
                      <p>
                        Tokio me ha ayudado más de lo que pensaba. Solo confío
                        en ella.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedCharacter === "woman" && (
                <div className="lore-lia">
                  <div className="texto-lore-lia">
                    <p>
                      Antes del colapso vivía contando, repartiendo, guardando
                      "por si acaso". Cuando todo se vino abajo, aprendió a
                      aprovechar cada resto.
                    </p>
                  </div>

                  {selectedPet === "lady" && (
                    <div className="lore-lady">
                      <img src={avatarLady} alt="Lady" />
                      <p>
                        Lady no hace ruido. Se queda cerca y espera. A veces
                        eso es lo único que necesito.
                      </p>
                    </div>
                  )}
                  {selectedPet === "tokio" && (
                    <div className="lore-tokio">
                      <img src={avatarTokio} alt="Tokio" />
                      <p>
                        Tokio no se queda quieta. Busca y vuelve cuando quiere.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="btn-modal-summary">
            <button
              className="confirm-summary"
              onClick={() => {
                setShowSummary(false);
                setShowHistory(true);
              }}
            >
              <img src={btnConfirmar} alt="Confirmar" />
            </button>

            <button
              className="btn-atras"
              onClick={() => setShowSummary(false)}
            >
              <img src={btnAtras} alt="Atras" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
