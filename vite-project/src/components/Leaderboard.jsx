import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function Leaderboard() {
  const { board, player } = useGame();
  const rows = Object.entries(board).sort((a, b) => b[1] - a[1]);

  return (
    <table className="ranking">
      <caption>{T.ranking}</caption>
      <tbody>
        {rows.map(([name, pts], i) => (
          <tr key={name} className={name === player ? "ranking__me" : ""}>
            <td>{i + 1}</td>
            <td>{name}</td>
            <td>{pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
