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

// task:
// build a dialog component
// show dialog using a state variable
// an onClose function to close the dialog
// and we can block the rest of the page
// close by escape key
// fully accessible

// accessibility:
// should cover the whole page and block interactions
// should use createPortal to render the dialog component outside of the app component
// dialog component should always be sibling of the body to let you cut the interaction with the rest of the page
// how to make dialog component a sibling of the body?
// use a portal to render the dialog component outside of the app component, using createPortal
// createPortal(), it takes two arguments, the first is the element to render, the second is the container where to render it
// focus should not leave the dialog until it is closed, pressing tab should cycle through the dialog elements
// first focusable element should be focused when the dialog is opened
// pressing escape should close the dialog
// pressing tab on the last focusable element should focus the first focusable element

