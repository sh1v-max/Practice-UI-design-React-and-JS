import React, { useState } from 'react'

const InteractiveGrid = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  )
  console.log(grid)

  return (
    <div className="container">
      {grid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return <div className="cell" key={`${rowIdx}-${colIdx}`}></div>
        })
      })}
    </div>
  )
}

export default InteractiveGrid
