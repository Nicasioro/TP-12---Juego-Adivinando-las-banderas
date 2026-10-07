import { useState } from "react";
import { useGame } from "../context/GameContext";
import { T } from "../texts";

export default function GuessForm() {
  const { mode, options, guess, hint, nextCountry, feedback } = useGame();
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    guess(text);
    setText("");
  };

  return (
    <div className="guess">
      {mode === "flag" ? (
        <form className="guess__form" onSubmit={submit}>
          <input
            value={text}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            onChange={(e) => setText(e.target.value)}
            placeholder={T.guessPlaceholder}
          />
          <div className="row">
            <button className="btn">{T.guess}</button>
            <button type="button" className="btn btn--ghost" onClick={hint}>
              {T.hint}
            </button>
          </div>
        </form>
      ) : (
        <div className="options">
          {options.map((o) => (
            <button key={o} className="btn btn--option" onClick={() => guess(o)}>
              {o}
            </button>
          ))}
        </div>
      )}
      <button className="btn btn--link" onClick={nextCountry}>{T.skip}</button>
      <p className="feedback" aria-live="polite">{feedback}</p>
    </div>
  );
}