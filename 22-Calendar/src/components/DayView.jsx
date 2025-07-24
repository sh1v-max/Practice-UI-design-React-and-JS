import React from 'react'
import DayTimeSlots from './DayTimeSlots'
import Events from './Events'
import events from "../data/events.json"

const DayView = () => {
  const today = new Date()
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
  const date = today.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })

  return (
    <div className='calendar-container'>
      <div className='calendar-header'>
        <div className='calendar-title'>
          <h1>Calendar</h1>
          <div className='calendar-subtitle'>
            <span className='day-name'>{dayName}</span>
            <span className='date'>{date}</span>
          </div>
        </div>
        <div className='calendar-controls'>
          <button className='btn-today'>Today</button>
          <div className='nav-buttons'>
            <button className='btn-nav'>‹</button>
            <button className='btn-nav'>›</button>
          </div>
        </div>
      </div>
      
      <div className='calendar-body'>
        <div className='time-column'>
          <DayTimeSlots/>
        </div>
        <div className='events-column'>
          <div className='events-container'>
            <Events events={events}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayView