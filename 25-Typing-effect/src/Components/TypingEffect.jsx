import React, { useEffect, useRef, useState } from 'react'

// goal:
// know how to use timer
// also when and how to clean up the timer
// it will exhaust browser's memory and crash

export const TypingEffect = ({ text, delay }) => {
  // using slice to move the cursor
  const [displayText, setDisplayText] = useState(text.slice(0, 10))
  const velocityRef = useRef({ speed: 1, endIndex: 0 })
  useEffect(() => {
    const interval = setInterval(() => {
      if (velocityRef.current.endIndex === text.length) {
        velocityRef.current.speed = -1
      } else if (velocityRef.current.endIndex === 0) {
        velocityRef.current.speed = 1
      }
      velocityRef.current.endIndex += velocityRef.current.speed
      setDisplayText(text.slice(0, velocityRef.current.endIndex))
    }, delay)

    return () => {
      clearInterval(interval)
    }
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
