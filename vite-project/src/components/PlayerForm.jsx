import { useState } from "react";
import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function PlayerForm() {
  const { setPlayer } = useGame();
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (name.trim()) setPlayer(name.trim());
  };

  return (
    <form className="card login" onSubmit={submit}>
      <h1 className="login__title">{T.title}</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={T.namePlaceholder}
        autoFocus
      />
      <button className="btn" disabled={!name.trim()}>{T.play}</button>
    </form>
  );
}
