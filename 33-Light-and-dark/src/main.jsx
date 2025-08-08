import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import { Hello } from './Components/Hello.jsx'
import { App } from './App.jsx'
import  AppContext  from './AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    {/* <AppContext/> */}
  </StrictMode>,
)

// purpose of this project?
// to check how to transfer data from parent to nested children
// passing props
// any state management lib, like redux
// provider context api


// what to do?
// implement dark/light theme switcher
// with prop drilling
// with context api
// why use custom hook for context?

// 3 ways do make dark/light theme

// prop drilling will render all the children component every time
// wether you use prop drilling or context, as long as state changes, all the children will be re-rendered
// we can use memoization to prevent that but it's not performance friendly
// now, to counter that, we can change the structure of the app, will pass grandChild component as prop
// because props are immutable, it won't trigger re-rendering