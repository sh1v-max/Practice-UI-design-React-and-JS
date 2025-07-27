import React from 'react'
import { TypingEffect } from './Components/TypingEffect'

export const App = () => {
  return (
    <div className='app'>
      <h2 className='text-xl font-bold'>Typing Effect</h2>
      <TypingEffect text = "I'm a Frontend Developer." delay = "100"/>
    </div>
  )
}
