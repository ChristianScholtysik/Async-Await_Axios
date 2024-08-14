import { useState } from "react";
import { startWaitTimer } from "../waitTimer";

const TimerThen = () => {
  const [message, setMessage] = useState<string>("");

  function handleStartTimer(): void {
    setMessage("Timer wurde gestartet");
    // ? startWaitTimer-Funktion aufrufen (3000 Millisekunden)
    // ? nach 3000 ms die Message setzen
    // ? ich registriere mich auf das Resolven des Promise
    startWaitTimer(3000).then(() => {
      // ? diese Zeile Code wird also erst am Ende ausgeführt
      setMessage("Die Zeit ist vorbei.");
    });
    setMessage("Timer läuft");
  }

  return (
    <div>
      <h2>Timer Beispiel mit Promise then</h2>
      <button onClick={handleStartTimer}>Start Timer</button>
      <p>{message}</p>
    </div>
  );
};

export default TimerThen;
