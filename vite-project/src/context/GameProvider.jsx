import { useEffect, useState } from "react";
import { GameContext } from "./GameContext";
import { T } from "../texts";

const API = "https://countriesnow.space/api/v0.1/countries";
export const TIME = 15;

const rand = (a) => a[Math.floor(Math.random() * a.length)];
const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const norm = (s) =>
  s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const loadBoard = () => {
  try {
    return JSON.parse(localStorage.getItem("board")) || {};
  } catch {
    return {};
  }
};

export function GameProvider({ children }) {
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState(null);
  const [mode, setMode] = useState("flag"); // "flag" | "capital"
  const [player, setPlayer] = useState("");
  const [board, setBoard] = useState(loadBoard); // { nombre: puntos }
  const [timeLeft, setTimeLeft] = useState(TIME);
  const [revealed, setRevealed] = useState([]);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const score = board[player] ?? 0;
  const answer = current ? (mode === "flag" ? current.name : current.capital) : "";

  // Traer paises y capitales al montar
  useEffect(() => {
    Promise.all([
      fetch(`${API}/flag/images`).then((r) => r.json()),
      fetch(`${API}/capital`).then((r) => r.json()),
    ])
      .then(([f, c]) => {
        const caps = c.data || [];
        const list = f.data.map((x) => ({
          ...x,
          capital: caps.find(
            (k) => k.iso2 === x.iso2 || norm(k.name) === norm(x.name)
          )?.capital,
        }));
        setCountries(list);
        pickCountry(list, "flag");
      })
      .catch(() => setError(T.loadError));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistir ranking
  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  // Timer: -1 por segundo. En 0 resta 1 punto y pasa a la siguiente.
  useEffect(() => {
    if (!current || !player) return;
    if (timeLeft <= 0) {
      addPoints(-1);
      setFeedback(T.timeout + answer);
      nextCountry();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, current, player]);

  // Modo capitales: cada 5s se elimina una opcion incorrecta
  useEffect(() => {
    const elapsed = TIME - timeLeft;
    if (mode !== "capital" || elapsed === 0 || elapsed % 5 !== 0) return;
    setOptions((o) => {
      const wrong = o.filter((x) => x !== current?.capital);
      if (wrong.length <= 1) return o;
      const out = rand(wrong);
      return o.filter((x) => x !== out);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function pickCountry(list = countries, m = mode) {
    const pool = m === "capital" ? list.filter((c) => c.capital) : list;
    if (!pool.length) return;
    const next = rand(pool);
    setCurrent(next);
    setTimeLeft(TIME);
    setRevealed([]);
    if (m === "capital") {
      const others = shuffle(pool.filter((c) => c.name !== next.name)).slice(0, 2);
      setOptions(shuffle([next.capital, ...others.map((c) => c.capital)]));
    }
  }

  const nextCountry = () => pickCountry();
  const addPoints = (n) =>
    setBoard((b) => ({ ...b, [player]: (b[player] ?? 0) + n }));
  const resetScore = () => setBoard((b) => ({ ...b, [player]: 0 }));

  function guess(text) {
    if (!current) return;
    if (norm(text) === norm(answer)) {
      const gained = 10 + timeLeft; // los segundos que quedan suman
      addPoints(gained);
      setFeedback(T.correct + gained);
      nextCountry();
    } else {
      addPoints(-1);
      setFeedback(T.wrong);
    }
  }

  // Pista: revela una letra al azar y descuenta 2 segundos
  function hint() {
    if (mode !== "flag" || !current) return;
    const free = [...current.name]
      .map((_, i) => i)
      .filter((i) => current.name[i] !== " " && !revealed.includes(i));
    if (!free.length) return;
    setRevealed((r) => [...r, rand(free)]);
    setTimeLeft((t) => Math.max(t - 2, 0));
  }

  function changeMode(m) {
    setMode(m);
    pickCountry(countries, m);
  }

  const value = {
    countries, current, mode, player, board, score, timeLeft, revealed,
    options, feedback, error,
    setPlayer, guess, nextCountry, resetScore, hint, changeMode,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
