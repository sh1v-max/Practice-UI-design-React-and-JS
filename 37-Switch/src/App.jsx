import React, { useState } from 'react'
import Switch from './Components/Switch'
import './index.css'

export const App = () => {
  const [isOn, setIsOn] = useState(false)
  const [isDarkModeOn, setIsDarkModeOn] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleToggle = () => {
    setIsOn(!isOn)
  }

  const handleDarkModeToggle = () => {
    setIsDarkModeOn((prev) => {
      const newValue = !prev
      document.body.classList.toggle('light-theme', !newValue)
      return newValue
    })
  }

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Switch Components</h1>
        <p>
          You can toggle multiple switches to control different settings and
          features. Each switch demonstrates different use cases and interactive
          behaviors.
        </p>
      </header>

      <div className="switches-container">

        <div className="switch-section">
          <h2>Theme Settings</h2>
          <Switch
            label="Day/Night Mode"
            isOn={isDarkModeOn}
            onToggle={handleDarkModeToggle}
            variant="theme"
          />
          <div className="switch-status">
            Theme: {isDarkModeOn ? 'Dark Theme 🌙' : 'Light Theme ☀️'}
          </div>
        </div>

        <div className="switch-section">
          <h2>Learning Progress</h2>
          <Switch
            label="Learning React"
            isOn={isOn}
            onToggle={handleToggle}
            variant="primary"
          />
          <div className="switch-status">
            Status: {isOn ? 'Active Learning Mode 📚' : 'Paused ⏸️'}
          </div>
        </div>

        <div className="switch-section">
          <h2>Notifications</h2>
          <Switch
            label="Push Notifications"
            isOn={notificationsEnabled}
            onToggle={handleNotificationsToggle}
            variant="notification"
          />
          <div className="switch-status">
            Notifications: {notificationsEnabled ? 'Enabled 🔔' : 'Disabled 🔕'}
          </div>
        </div>

        <div className="switch-section">
          <h2>Audio Settings</h2>
          <Switch
            label="Sound Effects"
            isOn={soundEnabled}
            onToggle={handleSoundToggle}
            variant="sound"
          />
          <div className="switch-status">
            Sound: {soundEnabled ? 'Enabled 🔊' : 'Muted 🔇'}
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>Built with React • by <a href="https://github.com/sh1v-max" target='_blank'>Shiv</a></p>
      </footer>
    </div>
  )
}
