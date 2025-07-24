import React from 'react'
import DayTimeSlots from './DayTimeSlots'
import Events from './Events'
import events from "../data/events.json"

const DayView = () => {
  return (
    <div className='calendar'>
      <h1 className="calendar-title">My Calendar</h1>
      <p className="instructions">
        📌 Click on a time slot to plan events or view tasks.<br />
        Events are positioned by their start and end times.
      </p>
      <div className="line"></div>
      <DayTimeSlots />
      <Events events={events} />
    </div>
  )
}

export default DayView
