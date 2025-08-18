import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { Hello } from './Components/Hello.jsx'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)

// to do?
// create an input search to search for users
// you must add selected user as pills inside the input search

// accessibility:
// on successfully selecting a user, pointer should automatically move back to input field
// it must remove the user when clicking on the remove icon or when backspace is pressed
// add navigation on suggestions using arrow keys