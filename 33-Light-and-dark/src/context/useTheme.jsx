import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null)
// console.log(myCT)

const ThemeMode = {
  Light: 1,
  Dark: 2,
}

const ThemeClass = {
  // using square brackets for variables
  [ThemeMode.Dark]: 'dark',
  [ThemeMode.Light]: 'light',
}

function ThemeProvider({ children }) {
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
    if (!className) return
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
      <ThemeContext.Provider value={{ themeMode, handleToggle }}>
        {/* <MemoizedGrandParent /> */}
        {children}
      </ThemeContext.Provider>
    </div>
  )
}

export { ThemeProvider, ThemeMode }

export default function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
