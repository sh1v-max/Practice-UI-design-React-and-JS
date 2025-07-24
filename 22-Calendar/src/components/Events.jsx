import React from 'react'

const Events = ({events}) => {
  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':').map(Number)
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const ampm = hour < 12 ? 'AM' : 'PM'
    const displayMinute = minute === 0 ? '' : `:${minute.toString().padStart(2, '0')}`
    return `${displayHour}${displayMinute} ${ampm}`
  }

  const getEventColor = (index) => {
    const colors = [
      'event-blue',
      'event-green', 
      'event-purple',
      'event-orange',
      'event-red',
      'event-teal'
    ]
    return colors[index % colors.length]
  }

  return (
    <div className='events-wrapper'>
      {events.map((event, index) => {
        const startHour = parseInt(event.start.split(":")[0])
        const startMinute = parseInt(event.start.split(":")[1])
        const endHour = parseInt(event.end.split(":")[0])
        const endMinute = parseInt(event.end.split(":")[1])
        
        const top = startHour * 80 + (startMinute / 60) * 80
        const height = (endHour - startHour) * 80 + ((endMinute - startMinute) / 60) * 80
        
        const startTime = formatTime(event.start)
        const endTime = formatTime(event.end)
        
        return (
          <div
            key={event.id}
            className={`event ${getEventColor(index)}`}
            style={{ 
              top: `${top}px`, 
              height: `${height}px`,
              minHeight: '60px'
            }}
          >
            <div className='event-content'>
              <div className='event-title'>{event.title}</div>
              <div className='event-time'>{startTime} - {endTime}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Events