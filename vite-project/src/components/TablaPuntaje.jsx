import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function ScoreBoard() {
  const { player, score } = useGame();

  return (
    <div className="who">
      <span className="who__name">{player}</span>
      <span className="who__score"><b>{score}</b> {T.points}</span>
    </div>
  );
}