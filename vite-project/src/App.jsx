import "./App.css";
import { GameProvider } from "./context/GameProvider";
import Game from "./components/Game";

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
