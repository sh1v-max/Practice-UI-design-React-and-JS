import React, { useEffect, useRef, useState } from 'react'

export const TypingEffect = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState(text.slice(0, 10));
  const velocityRef = useRef({speed: 1, endIndex: 0})
  useEffect(() => {
    
  }, [delay, text])
  
  console.log(text, delay)
  return (
    <div>
      <h1 className="text-3xl font-bold">
        {displayText}
        <span>|</span>
      </h1>
    </div>
  )
}
