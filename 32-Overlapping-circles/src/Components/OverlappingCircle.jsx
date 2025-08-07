import React, { useEffect, useState } from 'react'
import Circle from './Circle'

const OverlappingCircle = () => {
  const [circles, setCircles] = useState([])

  useEffect(() => {
    const canvas = document.querySelector('.circle-canvas')
    if (canvas) {
      canvas.addEventListener('click', handleCanvasClick)
      return () => {
        canvas.removeEventListener('click', handleCanvasClick)
      }
    }
  }, [])

  // a function to generate random hex color
  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return `#${randomColor.padStart(6, '0')}`
  }

  function handleCanvasClick(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const newCircle = { x, y }

    setCircles((prevCircles) => {
      const oldCircle = [...prevCircles]
      const newColor = getRandomColor();

      oldCircle.forEach((c) => {
        const x1 = c.x
        const y1 = c.y
        const x2 = newCircle.x
        const y2 = newCircle.y
        const xDiff = x2 - x1
        const yDiff = y2 - y1
        const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
        const RADIUS_SUM = 100;

        if (distance < RADIUS_SUM) {
          // adding color to the circle object
          newCircle.color = newColor;
          c.color = newColor;
        }
      })

      oldCircle.push(newCircle)
      return oldCircle
    })
  }

  return (
    <div className="circle-canvas">
      <div className="canvas-info">
        <span className="circle-count">Circles: {circles.length}</span>
        <button 
          className="clear-button" 
          onClick={() => setCircles([])}
        >
          Clear All
        </button>
      </div>
      
      {circles.map((circle, index) => {
        return <Circle key={index} x={circle.x} y={circle.y} color={circle.color} />
      })}
      
      {circles.length === 0 && (
        <div className="empty-state">
          <p>Click anywhere to create your first circle!</p>
        </div>
      )}
    </div>
  )
}

export default OverlappingCircle