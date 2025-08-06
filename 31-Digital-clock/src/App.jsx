import React from 'react'
import { Hello } from './Components/Hello'
import DigitalClock from './Components/DigitalClock'

export const App = () => {
  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">Digital Clock</h1>
        <p className="app-subtitle">
          A sleek, real-time digital clock app
        </p>
      </div>

      <div className="app-content">
        {/* <Hello/> */}
        <DigitalClock />
      </div>

      <div className="app-footer">
        <div className="tech-badges">
          <a className="badge" href="https://reactjs.org/" target="_blank" rel="noreferrer">React</a>
          <a className="badge" href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' target="_blank" rel="noreferrer">JavaScript</a>
          <a className="badge" href='https://developer.mozilla.org/en-US/docs/Web/CSS' target="_blank" rel="noreferrer">CSS3</a>
        </div>
        <p className="footer-text">Built with love by <a href="https://github.com/sh1v-max" target="_blank" rel="noreferrer">Shiv</a></p>
      </div>
    </div>
  )
}
