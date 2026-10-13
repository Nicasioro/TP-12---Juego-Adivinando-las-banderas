import { useState } from "react";
import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function GuessForm() {
  const { guess, hint, nextCountry, feedback } = useGame();
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    guess(text);
    setText("");
  };

  return (
    <div className="guess">
      {feedback && <p className="note" aria-live="polite">{feedback}</p>}

      <form className="guess__form" onSubmit={submit}>
        <input
          value={text}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
          placeholder={T.guessPlaceholder}
        />
        <button className="btn">{T.guess}</button>
      </form>

      <div className="guess__extras">
        <button type="button" className="link" onClick={hint}>{T.hint}</button>
        <button type="button" className="link" onClick={nextCountry}>{T.skip}</button>
      </div>
    </div>
  );
}