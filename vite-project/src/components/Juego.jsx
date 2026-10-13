import { useGame } from "../context/GameContext";
import PlayerForm from "./FormJugador";
import ScoreBoard from "./TablaPuntaje";
import Timer from "./Timer";
import Banderingas from "./Banderingas";
import GuessForm from "./GuessForm";
import Leaderboard from "./Leaderboard";
import { useEffect } from "react";
import Musica from "./Musica";



export default function Game() {
  const { player, error } = useGame();
  if (error) return <p className="card">{error}</p>;
  if (!player) return <PlayerForm />;
    useEffect(() => {
    document.body.classList.add("bg2");
    return () => document.body.classList.remove("bg2");
  }, []);


  return (
    <main className="card">
      <ScoreBoard />
      <Timer />
      <Banderingas />
      <GuessForm />
      <Leaderboard />
      <Musica />
    </main>
  );
}
