import React from 'react'

const GrandParent = ({mode, themeMode, setThemeMode}) => {
  return (
    <div>
      <Parent mode = {mode} themeMode={themeMode} setThemeMode={setThemeMode}/>
    </div>
  )
}

function Parent({mode, themeMode, setThemeMode}) {
  return <Child mode = {mode} themeMode={themeMode} setThemeMode={setThemeMode}/>
}

function Child({mode, themeMode, setThemeMode}) {
  const text = themeMode === mode.Dark ? '🌑' : '☀️'
  
  return (
    <>
      <button className='theme-btn' onClick={setThemeMode}>{text}</button>
    </>
  )
}

export default GrandParent
