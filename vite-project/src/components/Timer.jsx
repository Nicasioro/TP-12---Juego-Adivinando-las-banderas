import { useGame } from "../context/GameContext";
import { TIME } from "../context/GameProvider";

export default function Timer() {
  const { timeLeft } = useGame();
  return (
    <div className="timer" role="timer" aria-label={`${timeLeft}s`}>
      <div
        className={`timer__bar ${timeLeft <= 5 ? "timer__bar--low" : ""}`}
        style={{ width: `${(timeLeft / TIME) * 100}%` }}
      />
      <span className="timer__text">{timeLeft}s</span>
    </div>
  );
}
