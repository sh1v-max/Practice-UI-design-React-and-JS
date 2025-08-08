import React from 'react' // useEffect, useState, createContext, useContext, memo,
import { Hello } from './Components/Hello'
import useTheme, { ThemeProvider, ThemeMode } from './context/useTheme'
// import GrandParent from './Components/GrandParent'

const AppContext = () => {
  return (
    <ThemeProvider>
      <GrandParent />
    </ThemeProvider>
  )
}

const GrandParent = () => {
  return (
    <div>
      <Parent />
    </div>
  )
}

// using memo will stop all child components from rerendering
// but it's not good for performance
// const MemoizedGrandParent = memo(GrandParent)

const Parent = () => {
  return <Child />
}

const Child = () => {
  const { themeMode, handleToggle } = useTheme()
  const text = themeMode === ThemeMode.Dark ? '🌑' : '☀️'

  return (
    <>
      <button className="theme-btn" onClick={handleToggle}>
        {text}
      </button>
    </>
  )
}

export default AppContext
