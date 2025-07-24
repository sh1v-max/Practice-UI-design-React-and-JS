import React from 'react'

const DayTimeSlots = () => {
  const slots = Array.from({length: 24}).map((_, index) => index)
  // const slots = []
  // for ( let i = 0; i < slots.length; i++){
  //   slots.push(i)
  // }
  console.log(slots)
  
  return (
    <>
      {slots.map((slot) => (
        <div key={slot} className="time-slot">
          <span>{slot}:00</span>
        </div>
      ))}
    </>
  )
}

export default DayTimeSlots