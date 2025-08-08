import React, { useEffect, useState } from 'react'
import { Hello } from './Components/Hello'
// import GrandParent from './Components/GrandParent'

const ThemeMode = {
  Light: 1,
  Dark: 2,
}

const ThemeClass = {
  // using square brackets for variables
  [ThemeMode.Dark]: 'dark',
  [ThemeMode.Light]: 'light',
}

export const App = () => {
  const [themeMode, setThemeMode] = useState(ThemeMode.Dark)

  useEffect(() => {
    addThemeClass(ThemeClass[themeMode])
  }, [])

  function addThemeClass(className, removeClassName) {
    const body = document.getElementsByTagName('body')[0]
    removeThemeClassFromBody(body, removeClassName)
    body.classList.add(className)
  }

  function removeThemeClassFromBody(body, className) {
    if(!className) return
    body.classList.remove(className)
  }

  function handleToggle() {
    const newThemeMode =
      themeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    setThemeMode(newThemeMode)
    const removeClassName = ThemeClass[themeMode]
    addThemeClass(ThemeClass[newThemeMode], removeClassName)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Theme App</h1>
        <p className="app-description">
          A React application demonstrating dark and light mode implementation using Context API and prop drilling
        </p>
      </header>

      <main className="app-main">

        <div className="theme-section">
          <p className="section-description">
            Click the button below to toggle between dark and light modes
          </p>
          
          {/* always pass handler function, and not the set value */}
          <GrandParent
            mode={ThemeMode}
            themeMode={themeMode}
            setThemeMode={handleToggle}
          />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React • Theme switching with prop drilling example</p>
      </footer>
    </div>
  )
}

const GrandParent = ({ themeMode, setThemeMode }) => {
  return (
    <div className="grandparent-container">
      <div className="component-label">GrandParent Component</div>
      <Parent themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  )
}

const Parent = ({ themeMode, setThemeMode }) => {
  return (
    <div className="parent-container">
      <div className="component-label">Parent Component</div>
      <Child themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  )
}

const Child = ({ themeMode, setThemeMode }) => {
  const text = themeMode === ThemeMode.Dark ? '🌑' : '☀️'

  return (
    <div className="child-container">
      <div className="component-label">Child Component</div>
      <button className="theme-btn" onClick={setThemeMode}>
        <span className="theme-icon">{text}</span>
        <span className="theme-text">
          Switch to {themeMode === ThemeMode.Dark ? 'Light' : 'Dark'} Mode
        </span>
      </button>
    </div>
  )
}