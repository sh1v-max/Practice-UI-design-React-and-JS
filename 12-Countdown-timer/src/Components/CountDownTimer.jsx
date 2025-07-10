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
    const input = e.target.value;
  
    // to allow empty string
    if (input === "") {
      setTime((prev) => ({ ...prev, [field]: "" }));
      return;
    }
  
    // corner case, solve for number back to 0
    const value = parseInt(input, 10);
    if (isNaN(value)) return;
  
    let newTime = { ...time, [field]: value };
  
    // hour, minute, and second change simultaneously
    let hour = parseInt(newTime.hour || 0, 10);
    let minute = parseInt(newTime.minute || 0, 10);
    let second = parseInt(newTime.second || 0, 10);
  
    minute += Math.floor(second / 60);
    second = second % 60;
  
    hour += Math.floor(minute / 60);
    minute = minute % 60;
  
    setTime({
      hour: hour,
      minute: minute,
      second: second,
    });
  };
  
  

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
    let { hour, minute, second } = time;
    minute += Math.floor(second / 60);
    second = second % 60;
    hour += Math.floor(minute / 60);
    minute = minute % 60;
    setTime({ hour, minute, second });
  };
  

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
      <div className="formatted-time">
        {String(time.hour || 0).padStart(2, '0')}:
        {String(time.minute || 0).padStart(2, '0')}:
        {String(time.second || 0).padStart(2, '0')}
      </div>
      <div className="inputs-container">
        <input
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, 'hour')}
          onBlur={normalizeTime}
          type="text"
          placeholder="HH"
        />
        :
        <input
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, 'minute')}
          onBlur={normalizeTime}
          type="text"
          placeholder="MM"
        />
        :
        <input
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, 'second')}
          onBlur={normalizeTime}
          type="text"
          placeholder="SS"
        />
      </div>
      <div className="button-container">
        <button onClick={handleStart}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default CountDownTimer
