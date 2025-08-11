import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { Hello } from './Components/Hello.jsx'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)


// task:
// build a bar chart visualizer

// how to:
// fetched the data from api, and transformed into map to use it
// stored in state
// prepared axis out of data using useEffect
// rendered data using map on data