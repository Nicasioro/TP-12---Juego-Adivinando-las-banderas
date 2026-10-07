import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function Flag() {
  const { current, mode, revealed } = useGame();
  if (!current) return <p className="muted">{T.loading}</p>;

  const mask = [...current.name]
    .map((c, i) => (c === " " ? "\u00a0\u00a0" : revealed.includes(i) ? c : "_"))
    .join(" ");

  return (
    <figure className="flag">
      <img className="flag__img" src={current.flag} alt="" />
      <figcaption className="flag__caption">
        {mode === "flag" ? mask : T.capitalQuestion}
      </figcaption>
    </figure>
  );
}
