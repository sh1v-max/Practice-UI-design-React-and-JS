import React, { useEffect, useRef, useState } from 'react'

const CountDownTimer = () => {
  const [time, setTime] = useState({
    hour: '',
    minute: '',
    second: '',
  })
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const handleChange = (e, field) => {
    const input = e.target.value

    // only digits or empty string
    if (!/^\d*$/.test(input)) return

    setTime((prev) => ({
      ...prev,
      [field]: input,
    }))
  }

  const handleStart = () => {
    if (
      time.hour.length === 0 &&
      time.minute.length === 0 &&
      time.second.length === 0
    ) {
      return
    }
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setTime({
      hour: '',
      minute: '',
      second: '',
    })
    console.log('reset button clicked')
  }

  const normalizeTime = () => {
    let hour = parseInt(time.hour || '0', 10)
    let minute = parseInt(time.minute || '0', 10)
    let second = parseInt(time.second || '0', 10)

    if (isNaN(hour)) hour = 0
    if (isNaN(minute)) minute = 0
    if (isNaN(second)) second = 0

    minute += Math.floor(second / 60)
    second = second % 60

    hour += Math.floor(minute / 60)
    minute = minute % 60

    setTime({
      hour: hour.toString(),
      minute: minute.toString(),
      second: second.toString(),
    })
  }

  useEffect(() => {
    if (isRunning) {
      // timer start
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const copyPrevTime = { ...prevTime }
          copyPrevTime.second--
          if (copyPrevTime.second < 0) {
            copyPrevTime.minute--
            copyPrevTime.second = 59
            if (copyPrevTime.minute < 0) {
              copyPrevTime.hour--
              copyPrevTime.minute = 59
              if (copyPrevTime.hour < 0) {
                clearInterval(intervalRef.current)
                setIsRunning(false)
                return {
                  hour: '',
                  minute: '',
                  second: '',
                }
              }
            }
          }
          return copyPrevTime
        })
      }, 1000)
    }
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [isRunning])

  return (
    <div className="container">
      <h1 className="title">Countdown Timer</h1>

      <div className="formatted-time">
        {String(time.hour || 0).padStart(2, '0')}:
        {String(time.minute || 0).padStart(2, '0')}:
        {String(time.second || 0).padStart(2, '0')}
      </div>

      <div className="inputs-container">
        <input
          className="time-input"
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, 'hour')}
          onBlur={normalizeTime}
          type="text"
          placeholder="HH"
        />
        <span className="colon">:</span>
        <input
          className="time-input"
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, 'minute')}
          onBlur={normalizeTime}
          type="text"
          placeholder="MM"
        />
        <span className="colon">:</span>
        <input
          className="time-input"
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, 'second')}
          onBlur={normalizeTime}
          type="text"
          placeholder="SS"
        />
      </div>

      <div className="button-container">
        <button className="btn" onClick={handleStart}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  )
}

export default CountDownTimer
