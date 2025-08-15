import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { Hello } from './Components/Hello.jsx'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
    <App/>
)


// task to do:
// instal react-router-dom
// enclose the App component with BrowserRouter