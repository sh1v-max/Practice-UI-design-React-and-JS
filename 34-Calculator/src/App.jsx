import React from 'react'
import { Hello } from './Components/Hello'
import Calculator from './Components/Calculator'

export const App = () => {
  return (
    <div>
      {/* <Hello/> */}
      <Calculator/>
    </div>
  )
}


// task:
// make a simple calculator that can add, subtract, multiply, and divide  
// show what i am typing in the display  
// when i press "=", calculate and show the answer  
// keep a small history of last few calculations  
// allow clicking an old result in history to bring it back  
// add a button to clear the history  
// make it look nice in dark mode, like apple style with red/yellow/green dots  

// how?
// made calculator.jsx with:  
// - a display for current input  
// - buttons for numbers, operators, clear, backspace, equals  
// - a title bar with 3 colored dots (macos style)  
// made history section that:  
// - shows old calculations with expression and result  
// - lets me click an old result to reuse it  
// - has a "clear" button to remove all history  
// - shows "no history yet" if empty  
// styled everything in calculator.css:  
// - dark theme background  
// - orange for operators, grey for light buttons  
// - rounded corners and padding for modern look  
// saves history in localstorage so it stays after refresh  