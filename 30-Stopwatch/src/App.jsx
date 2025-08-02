import React from 'react'
import { Hello } from './Components/Hello'
import Stopwatch from './Components/Stopwatch'

export const App = () => {
  return (
    <div className="App">
      <div className="app-header">
        <h1>Stopwatch</h1>
        {/* <p className="app-description">
          A stopwatch with lap timing functionality. Features automatic pause/resume 
          when switching browser tabs to ensure accurate timing.
        </p> */}
      </div>
      <Stopwatch />
    </div>
  )
}
