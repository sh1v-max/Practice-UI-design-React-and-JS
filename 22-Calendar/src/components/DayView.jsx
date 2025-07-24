import React from 'react'
import DayTimeSlots from './DayTimeSlots'

const DayView = () => {
  return (
    <div className='calender'>
      <h1>My Calender</h1>
      <div className="line"></div>
      <DayTimeSlots/>
    </div>
  )
}

export default DayView