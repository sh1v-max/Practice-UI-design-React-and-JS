import React, { useEffect, useState } from 'react'

const DigitalClock = () => {
  const [time, setTime] = useState(new Date())
  const [currentDate, setCurrentDate] = useState('')
  // const date = new Date()

  // method 1: normal useEffect, and will use time.toLocaleTimeString()
  // this method is not recommended
  // useEffect(() => {
  //   setInterval(() => {
  //     setTime((p) => p + 1)
  //   }, 1000)
  // }, [])

  // method 2: with synced time
  // to loose any time because of "1000ms"
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now)
      setCurrentDate(getFormattedDate())
      // fixing the delay
      const delay = 1000 - (now % 1000)
      setTimeout(tick, delay)
    }

    const timeoutId = setTimeout(tick, 1000 - (new Date() % 1000))
    return () => clearTimeout(timeoutId)
  }, [])

  // method 3: this is more efficient
  // manually constructing the time, without any delay
  function getDate() {
    let result = ''
    const date = new Date()

    let hour = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    const ampm = hour >= 12 ? 'PM' : 'AM'
    hour = hour % 12
    hour = hour ? hour : 12 // the hour '0' should be '12'

    result = `${String(hour).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`
    return result
  }

  // Get formatted date string
  function getFormattedDate() {
    const date = new Date()
    const options = {
      // weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  // Get day of week
  function getDayOfWeek() {
    const date = new Date()
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    return days[date.getDay()]
  }

  return (
    <div className="clock-container">
      <div className="clock-wrapper">
        <div className="date-display">
          <p className="day-of-week">{getDayOfWeek()}</p>
          <p className="full-date">{currentDate || getFormattedDate()}</p>
        </div>

        <div className="digital-clock">
          <div className="time-display">
            {getDate()}
            {/* we can pass arguments based on out req */}
            {/* {time.toLocaleTimeString('en-US')} */}
          </div>
        </div>

        <div className="clock-info">
          <div className="method-indicator">
            <span className="indicator-dot"></span>
            <span className="method-text">Synced Time Method</span>
          </div>
          <span className="extra-info">
            The displayed time is fetched from the browser's local system time.
            <br />
            Reloading the page will not cause any delay.
          </span>
        </div>
      </div>
    </div>
  )
}

export default DigitalClock

//? why not to use date.toLocaleTimeString() without any arguments??

// the issue with date.toLocaleTimeString() is that it returns the
// time in the user's locale format, which may not be what we want.
// For example, if the user's locale is set to a 12 hour clock, the
// function will return the time in 12 hour format, which may not be
// what we want. We may want the time in 24 hour format.
// without the argument, the function will return time based on user
// current location which they might not want to

//? why should we not call date.toLocaleTimeString() all the time??

// Calling date.toLocaleTimeString() repeatedly is inefficient
// because it doesn't use caching — it recalculates the formatted
// string every time by fetching locale data from large internal
// arrays, which adds processing overhead and can hurt performance in
// frequent or real-time updates.
