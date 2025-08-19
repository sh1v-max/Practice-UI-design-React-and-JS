import React, { useState, useEffect } from 'react'

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    setTimeLeft(duration) // Reset when duration changes
  }, [duration])

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const getTimerClass = () => {
    if (timeLeft <= 5) return 'timer critical'
    if (timeLeft <= 10) return 'timer warning'
    return 'timer'
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={getTimerClass()}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-text">{formatTime(timeLeft)}</div>
    </div>
  )
}

export default Timer