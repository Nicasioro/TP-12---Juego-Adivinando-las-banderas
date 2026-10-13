import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function Flag() {
  const { current, revealed } = useGame();
  if (!current) return <p className="muted">{T.loading}</p>;

  const mask = [...current.name]
    .map((c, i) => (c === " " ? "\u00a0\u00a0" : revealed.includes(i) ? c : "_"))
    .join(" ");

  return (
    <figure className="postcard">
      <img className="postcard__img" src={current.flag} alt="" />
      <figcaption className="postcard__mask">{mask}</figcaption>
    </figure>
  );
}