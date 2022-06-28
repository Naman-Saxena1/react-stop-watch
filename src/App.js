import React, { useState } from "react";
import "./styles.css";

export default function App() {
  let initialTimerState = {
    stopWatchHours: 0,
    stopWatchMinutes: 0,
    stopWatchSeconds: 0
  };
  const [stopWatchTime, setStopWatchTime] = useState(initialTimerState);
  const [timerId, setTimerid] = useState();
  const { stopWatchHours, stopWatchMinutes, stopWatchSeconds } = stopWatchTime;

  function startTimer() {
    if (timerId) {
      return;
    }
    let newTimerId = setInterval(() => {
      setStopWatchTime((prev) => {
        if (prev.stopWatchSeconds === 59) {
          if (prev.stopWatchMinutes === 59) {
            return {
              ...prev,
              stopWatchHours: prev.stopWatchHours + 1,
              stopWatchMinutes: 0,
              stopWatchSeconds: 0
            };
          } else {
            return {
              ...prev,
              stopWatchMinutes: prev.minutes + 1,
              stopWatchSeconds: 0
            };
          }
        } else {
          return { ...prev, stopWatchSeconds: prev.stopWatchSeconds + 1 };
        }
      });
    }, 1000);

    setTimerid(newTimerId);
  }

  function stopTimer() {
    clearInterval(timerId);
    setTimerid(null);
  }

  function resetTimer() {
    clearInterval(timerId);
    setTimerid(null);
    setStopWatchTime((prev) => initialTimerState);
  }

  return (
    <div className="App">
      <p>
        {stopWatchHours < 10 ? 0 : ""}
        {stopWatchHours}:{stopWatchMinutes < 10 ? 0 : ""}
        {stopWatchMinutes}:{stopWatchSeconds < 10 ? 0 : ""}
        {stopWatchSeconds}
      </p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
