import React, { useEffect, useRef, useState } from 'react'

// goal:
// know how to use timer
// also when and how to clean up the timer
// it will exhaust browser's memory and crash

export const TypingEffect = ({ texts, delay }) => {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const velocityRef = useRef({ speed: 1, endIndex: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const currentText = texts[textIndex]
      if (velocityRef.current.endIndex === currentText.length) {
        velocityRef.current.speed = -1
      } else if (velocityRef.current.endIndex === 0) {
        velocityRef.current.speed = 1
        setTextIndex((prev) => (prev + 1) % texts.length) // Move to next text
      }
      velocityRef.current.endIndex += velocityRef.current.speed
      setDisplayText(currentText.slice(0, velocityRef.current.endIndex))
    }, delay)

    return () => clearInterval(interval)
  }, [delay, textIndex, texts])

  return (
    <div className="typing-container">
      <h1>
        {displayText}
        <span>|</span>
      </h1>
    </div>
  )
}
