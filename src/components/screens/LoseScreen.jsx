import bgLose from "../../assets/backgrounds/bg-hud-principal/fondo-lose.png";

export default function LoseScreen({ onNewGame }) {
  return (
    <div
      className="screen-lose"
      style={{ backgroundImage: `url(${bgLose})` }}
    >
      <h2>Perdiste</h2>
      <p>
        Aguantaste…
        hasta que ya no alcanzó.
        Cada decisión fue correcta
        hasta que dejó de ser suficiente.
        El mundo siguió.
        Tú no.
      </p>
      <button className="newGame-lose" onClick={onNewGame}>
        New Game
      </button>
    </div>
  );
}
