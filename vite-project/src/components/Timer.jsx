import { useGame } from "../context/GameContext";

export default function Timer() {
  const { timeLeft } = useGame();
  return <div className="clock" role="timer">{timeLeft}s</div>;
}