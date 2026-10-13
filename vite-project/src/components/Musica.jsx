import { useEffect, useRef, useState } from "react";
import musica from "../assets/musica.mp3";

export default function Musica() {
  const audioRef = useRef(null);
  const [sonando, setSonando] = useState(false);

  useEffect(() => {
    const audio = new Audio(musica);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    audio.play().then(() => setSonando(true)).catch(() => setSonando(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setSonando(true);
    } else {
      audio.pause();
      setSonando(false);
    }
  };

  return (
    <button type="button" className="btn btn--ghost musica" onClick={toggle}>
      {sonando ? "🔊" : "🔇"}
    </button>
  );
}