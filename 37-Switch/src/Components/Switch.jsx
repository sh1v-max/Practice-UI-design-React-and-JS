import React from 'react'

const Switch = ({ isOn, onToggle = () => {}, label = '', variant = 'primary' }) => {
  return (
    <div className={`switch ${variant}`}>
      <label className="switch-label">
        <input
          type="checkbox"
          role="switch"
          aria-checked={isOn}
          checked={isOn}
          onChange={onToggle}
        />
        <span className="slider"></span>
        <span className="switch-text">{label}</span>
      </label>
    </div>
  )
}

export default Switch