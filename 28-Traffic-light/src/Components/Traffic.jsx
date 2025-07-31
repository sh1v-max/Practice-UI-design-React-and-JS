import { useEffect, useState } from "react";
import Signal from "./Signal";

export default function Traffic({ 
  lights = ["red", "yellow", "green"], 
  duration = 2000,
  size = "normal",
}) {
  const [active, setActive] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(duration);

  useEffect(() => {

    const intervalId = setInterval(() => {
      setActive((prevActive) => {
        return (prevActive + 1) % lights.length;
      });
    }, currentDuration);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [lights.length, currentDuration]);

  const handleSpeedChange = (speed) => {
    setCurrentDuration(speed);
  };

  return (
    <div className="traffic-container">
      <div className="traffic-light">
        <div className="traffic-header">
          <div className="traffic-brand">TRAFFIC CONTROL</div>
          <div className="traffic-status"> RUNNING
          </div>
        </div>
        
        <div className="signals-container">
          {lights.map((color, index) => {
            return (
              <Signal 
                key={index} 
                isActive={active === index} 
                color={color}
                size={size}
              />
            );
          })}
        </div>

        <div className="speed-controls">
          <span className="speed-label">Speed Control:</span>
          <div className="speed-buttons">
            <button 
              className={`speed-btn ${currentDuration === 3000 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(3000)}
            >
              Slow
            </button>
            <button 
              className={`speed-btn ${currentDuration === 2000 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(2000)}
            >
              Normal
            </button>
            <button 
              className={`speed-btn ${currentDuration === 1000 ? 'active' : ''}`}
              onClick={() => handleSpeedChange(1000)}
            >
              Fast
            </button>
          </div>
        </div>

        <div className="traffic-info">
          <div className="current-light">
            Current: <span className="current-color">{lights[active].toUpperCase()}</span>
          </div>
          <div className="next-light">
            Next: <span className="next-color">
              {lights[(active + 1) % lights.length].toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}