import React from 'react'

const DayTimeSlots = () => {
  const slots = Array.from({length: 24}).map((_, index) => {
    const hour = index
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const ampm = hour < 12 ? 'AM' : 'PM'
    const timeString = hour === 0 ? '12 AM' : `${displayHour} ${ampm}`
    
    return {
      hour,
      timeString,
      displayHour,
      ampm
    }
  })
  
  return (
    <div className='time-slots-container'>
      {slots.map((slot) => (
        <div key={slot.hour} className="time-slot">
          <div className='time-label'>
            <span className='hour'>{slot.displayHour}:00</span>
            <span className='ampm'>{slot.ampm}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DayTimeSlots