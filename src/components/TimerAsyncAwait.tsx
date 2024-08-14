import { useState } from "react";
import { startWaitTimer } from "../waitTimer";

const TimerAsyncAwait = () => {
  const [message, setMessage] = useState<string>("");

  // ? vor die function muss ein async, sonst kann ich await nicht verwenden
  async function handleStartTimer() {
    setMessage("Timer wurde gestartet");
    // ? warte an dieser Stelle bis die Funktion startWaitTimer fertig ist
    // ? await muss immer vor dem Funktionsaufruf stehen
    await startWaitTimer(3000);
    setMessage("Zeit ist abgelaufen");
  }

  // ? auch bei der Arrow-Function muss das async vor die runden Klammern mit den Parametern
  const handleStartTimerArrow = async () => {
    setMessage("Timer wurde gestartet");
    // ? warte an dieser Stelle bis die Funktion startWaitTimer fertig ist
    // ? await muss immer vor dem Funktionsaufruf stehen
    await startWaitTimer(3000);
    setMessage("Zeit ist abgelaufen");
  };

  return (
    <div>
      <h2>Timer Beispiel mit async await</h2>
      <button onClick={handleStartTimer}>Start Timer</button>
      <p>{message}</p>
    </div>
  );
};

export default TimerAsyncAwait;
