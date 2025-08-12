import React, { useState } from 'react'
import { Hello } from './Components/Hello'
import Dialog from './Components/Dialog'

export const App = () => {
  const [showDialog, setShowDialog] = useState(false)

  function handleShowDialog() {
    setShowDialog(!showDialog)
  }

  function handleCloseDialog() {
    setShowDialog(false)
  }

  return (
    <div className='app'>
      <header className="app-header">
        <h1 className="app-title">Dialogue Popup using React</h1>
        <p className="app-subtitle">
          Click the button to open the More Info dialog.
        </p>
      </header>

      <button onClick={handleShowDialog} className="open-dialog-btn">
        More Info
      </button>

      {showDialog && (
        <Dialog onClose={handleCloseDialog}>
          <h1>Dialog Accessibility Features</h1>
          <ul className="feature-list">
            <li>Should cover the whole page and block interactions</li>
            <li>Uses createPortal to render outside of the app component</li>
            <li>Dialog component is sibling of the body to cut interaction with rest of the page</li>
            <li>Focus does not leave the dialog until it is closed</li>
            <li>Pressing Tab cycles through dialog elements</li>
            <li>First focusable element is focused when dialog opens</li>
            <li>Pressing Escape closes the dialog</li>
            <li>Pressing Tab on the last element focuses the first focusable element</li>
          </ul>
          <div className="dialog-buttons">
            <button onClick={handleCloseDialog} className='save'>Save</button>
            <button onClick={handleCloseDialog} className='cancel'>Close</button>
          </div>
        </Dialog>
      )}
    </div>
  )
}
