import { useGame } from "../context/GameContext";
import PlayerForm from "./PlayerForm";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";
import Flag from "./Flag";
import GuessForm from "./GuessForm";
import Leaderboard from "./Leaderboard";

export default function Game() {
  const { player, error } = useGame();
  if (error) return <p className="card">{error}</p>;
  if (!player) return <PlayerForm />;

  return (
    <main className="card">
      <ScoreBoard />
      <Timer />
      <Flag />
      <GuessForm />
      <Leaderboard />
    </main>
  );
}
