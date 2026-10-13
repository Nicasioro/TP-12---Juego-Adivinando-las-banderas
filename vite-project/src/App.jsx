import "./App.css";
import { GameProvider } from "./context/GameProvider";
import Game from "./components/Juego";

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
