import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { Hello } from './Components/Hello.jsx'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App/>
)

// task:
// to build a simple switch component with accessibility features
// passing props and suitable toggle functionality and on/off states
// handle all props and events
// can add more desired features 

// added role="switch" for accessibility
// added area-checked={isOn} for screen readers
// visible focused when tab is pressed
// dynamically added all switch from app.jsx, and used switch component to render them all
// made them accessible with aria attributes
// added toggle functionality for each switch
// added dark mode toggle functionality
// added light theme toggle functionality
// added sound toggle functionality
// added notification toggle functionality