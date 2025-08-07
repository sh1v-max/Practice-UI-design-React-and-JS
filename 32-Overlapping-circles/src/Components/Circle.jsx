import React from 'react'

const Circle = ({ x, y, color }) => {
  // console.log(color)
  return (
    <div
      className="circle-component"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50px, -50px)`,
        backgroundColor: color ?? '#ff4444',
        boxShadow: color ? `0 0 20px ${color}40` : '0 0 20px #ff444440'
      }}
    ></div>
  )
}

export default Circle