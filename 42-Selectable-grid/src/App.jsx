import React from 'react'
import { Hello } from './Components/Hello'
import SelectableGrid from './Components/SelectableGrid'

export const App = () => {
  return (
    <div className="app-container">
      {/* <Hello/> */}
      <div className="app-header">
        <h1 className="app-title">Selectable Grid</h1>
      </div>
      
      <div className="grid-container">
        <SelectableGrid rows={15} cols={15} />
      </div>
      
      <footer className="app-footer">
        <p>Built with React • By <a href="https://github.com/sh1v-max" target='_blank'>Shiv</a></p>
      </footer>
    </div>
  )
}