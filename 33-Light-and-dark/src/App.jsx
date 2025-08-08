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
    <div>
      {/* <Hello/> */}
      <span>Hello i'm learning react</span>
      {/* always pass handler function, and not the set value */}
      <GrandParent
        mode={ThemeMode}
        themeMode={themeMode}
        setThemeMode={handleToggle}
      />
    </div>
  )
}

const GrandParent = ({ themeMode, setThemeMode }) => {
  return (
    <div>
      <Parent themeMode={themeMode} setThemeMode={setThemeMode} />
    </div>
  )
}

const Parent = ({ themeMode, setThemeMode }) => {
  return <Child themeMode={themeMode} setThemeMode={setThemeMode} />
}

const Child = ({ themeMode, setThemeMode }) => {
  const text = themeMode === ThemeMode.Dark ? '🌑' : '☀️'

  return (
    <>
      <button className="theme-btn" onClick={setThemeMode}>
        {text}
      </button>
    </>
  )
}
