import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function ScoreBoard() {
  const { player, score, mode, changeMode, resetScore } = useGame();
  const other = mode === "flag" ? "capital" : "flag";

  return (
    <header className="scoreboard">
      <div>
        <span className="scoreboard__player">{player}</span>
        <strong className="scoreboard__value">{score}</strong>
        <span className="scoreboard__unit">{T.points}</span>
      </div>
      <div className="row">
        <button className="btn btn--ghost" onClick={() => changeMode(other)}>
          {T.switchTo}{other === "flag" ? T.modeFlags : T.modeCapitals}
        </button>
        <button className="btn btn--ghost" onClick={resetScore}>{T.reset}</button>
      </div>
    </header>
  );
}
