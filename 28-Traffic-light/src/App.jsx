import React, { useState } from 'react'
import { Hello } from './Components/Hello'
import Traffic from './Components/Traffic'

export const App = () => {
  const [selectedMode, setSelectedMode] = useState('standard');

  const modes = {
    standard: {
      lights: ["red", "yellow", "green"],
      duration: 2000,
      size: "normal"
    },
    uk: {
      lights: ["red", "red-yellow", "yellow", "green"],
      duration: 2500,
      size: "normal"
    }
  };

  return (
    <div className="app">
      {/* <Hello/> */}
      
      <header className="app-header">
        <h1 className="app-title">🚦 Smart Traffic Light System</h1>
        <p className="app-subtitle">
          Interactive traffic light simulator with multiple control modes
        </p>
      </header>

      <main className="app-main">
        <div className="mode-selector">
          <h3 className="mode-title">Select Traffic Mode:</h3>
          <div className="mode-buttons">
            {Object.keys(modes).map((mode) => (
              <button
                key={mode}
                className={`mode-btn ${selectedMode === mode ? 'active' : ''}`}
                onClick={() => setSelectedMode(mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <Traffic 
          lights={modes[selectedMode].lights}
          duration={modes[selectedMode].duration}
          size={modes[selectedMode].size}
          autoPlay={true}
        />

        <div className="app-info">
          <div className="info-card">
            <p>Default Duration: {(modes[selectedMode].duration / 1000)} second</p>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React • Traffic Light Simulator v2.0</p>
      </footer>
    </div>
  )
}