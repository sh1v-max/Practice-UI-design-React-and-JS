import React, { useRef, useState } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const startedSinceRef = useRef(0);
  const intervalRef = useRef(null);
  const lapCountRef = useRef(0);

  function start() {
    if (intervalRef.current) return;

    startedSinceRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(Date.now() - startedSinceRef.current);
    }, 10);
    setIsRunning(true);
  }

  function pause() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }

  function reset() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setLaps([]);
    startedSinceRef.current = 0;
    lapCountRef.current = 0;
    setIsRunning(false);
  }

  function addLap() {
    if (time > 0) {
      lapCountRef.current += 1;
      const newLap = {
        id: lapCountRef.current,
        time: time,
        formattedTime: getTime(),
      };
      setLaps((prevLaps) => [newLap, ...prevLaps]);
    }
  }

  function getTime() {
    const hours = Math.floor(time / (1000 * 3600))
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        <div className="time-display">
          <span className="time">{getTime()}</span>
          <div className="time-label">HH:MM:SS:MS</div>
        </div>

        <div className="controls">
          <button
            className={`btn ${isRunning ? 'btn-pause' : 'btn-start'}`}
            onClick={isRunning ? pause : start}
          >
            {isRunning ? 'Pause' : time > 0 ? 'Continue' : 'Start'}
          </button>

          <button className="btn btn-lap" onClick={addLap} disabled={time === 0 || !isRunning}>
            Lap
          </button>

          <button className="btn btn-reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      {laps.length > 0 && (
        <div className="laps-container">
          <h3 className="laps-title">Lap Times</h3>
          <div className="laps-list">
            {laps.map((lap) => (
              <div key={lap.id} className="lap-item">
                <span className="lap-number">Lap {lap.id}</span>
                <span className="lap-time">{lap.formattedTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stopwatch;
