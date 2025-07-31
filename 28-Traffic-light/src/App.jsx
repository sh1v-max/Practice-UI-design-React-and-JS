import React, { useState } from 'react'
import { Hello } from './Components/Hello'
import Traffic from './Components/Traffic'

export const App = () => {
  const [selectedMode, setSelectedMode] = useState('standard');

  const modes = {
    standard: {
      lights: ["red", "yellow", "green"],
      duration: 2000,
      size: "normal"
    },
    uk: {
      lights: ["red", "red-yellow", "yellow", "green"],
      duration: 2500,
      size: "normal"
    }
  };


}