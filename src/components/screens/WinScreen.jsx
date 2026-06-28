import bgWin from "../../assets/backgrounds/bg-hud-principal/fondo-win.png";

export default function WinScreen({ onNewGame }) {
  return (
    <div
      className="screen-win"
      style={{ backgroundImage: `url(${bgWin})` }}
    >
      <h2>Has sobrevivido</h2>
      <p>
        Aguantaste.

        No porque el mundo mejorara,
        sino porque tú no cediste.

        La señal sigue fallando,
        pero por primera vez no es silencio.

        La ayuda llegará pronto.

        Y esta vez…
        sigues aquí para verla.
      </p>
      <button className="newGame-win" onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
}
