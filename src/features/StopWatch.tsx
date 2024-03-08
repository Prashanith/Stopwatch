import { useState } from "react";

function StopWatch() {
  const [timeElapsed, setElapsedTime] = useState<number | null>(null);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [laps, setLaps] = useState<string[]>([]);

  function addLap() {
    const lap =
      Math.floor((timeElapsed! / (1000 * 60 * 60)) % 24)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor((timeElapsed! / (1000 * 60)) % 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      Math.floor((timeElapsed! / 1000) % 60)
        .toString()
        .padStart(2, "0");
    setLaps((prevLaps) => [...prevLaps, lap]);
  }

  function startPauseTime() {
    const date = Date.now();
    setStartTime((prev) => date);
    console.log(startTime);
    setInterval(() => {
      setElapsedTime((prev) => Date.now() - date);
    }, 1000);
  }

  function resetTime() {
    setLaps((laps) => []);
    setStartTime((prev) => null);
    setElapsedTime((prev) => null);
  }

  return (
    <div className="flex flex-row justify-around items-center space-x-4">
      <div
        id="stopWatch"
        className="flex flex-col justify-center items-center space-y-10"
      >
        <div id="time">
          {startTime && timeElapsed && (
            <div className="text-white text-9xl flex flex-row justify-center items-center">
              <p className="hours time">
                {Math.floor((timeElapsed / (1000 * 60 * 60)) % 24)
                  .toString()
                  .padStart(2, "0")}
              </p>
              <p className="diff">:</p>
              <p className="minutes time">
                {Math.floor((timeElapsed / (1000 * 60)) % 60)
                  .toString()
                  .padStart(2, "0")}
              </p>
              <p className="diff">:</p>
              <p className="seconds time">
                {Math.floor((timeElapsed / 1000) % 60)
                  .toString()
                  .padStart(2, "0")}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center items-center space-x-8">
          <button type="button" className="timerBtn" onClick={() => addLap()}>
            <img src="./lap.svg" alt="Add Lap" height={220} width={220} />
          </button>
          <button
            type="button"
            className="timerBtn"
            onClick={() => startPauseTime()}
          >
            <img src="./play.svg" alt="Add Lap" />
          </button>
          <button
            type="button"
            className="timerBtn"
            onClick={() => resetTime()}
          >
            <img src="./reset.svg" alt="Add Lap" />
          </button>
        </div>
      </div>
      <div className="lapList flex flex-col justify-center items-center space-y-4 h-3/4 overflow-y-scroll scroll-m-0 scroll-p-0">
        {laps.length > 0 && (
          <h1 className="text-4xl text-blue-800 font-extrabold">LAPS</h1>
        )}
        {laps.map((value, i) => {
          return (
            <div className="shadow bg-blue-800 rounded-2xl w-60 text-white px-6 py-4 flex flex-row justify-between items-center">
              <span>{i + 1}</span>
              <span>{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StopWatch;
