import React from 'react'
import DayTimeSlots from './DayTimeSlots'
import Events from './Events'
import events from "../data/events.json"


const DayView = () => {
  return (
    <div className='calender'>
      <h1>My Calender</h1>
      <div className="line"></div>
      <DayTimeSlots/>
      <Events events = {events}/>
    </div>
  )
}

export default DayView