import React, { useEffect, useRef, useState } from 'react'

const InteractiveGrid = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 3 }, () => new Array(3).fill(false))
  )
  console.log(grid)

  // now we need something, a variable to store the order of the cells
  // now, we can not create const queue = [], because it will be overwritten by each render as empty array
  // we can't use state either, because we need state only when we want to change the UI based on state change
  // so, now we will use ref
  const queue = useRef([])
  console.log(queue)

  const handleOnClick = (rowIdx, colIdx, flag) => {
    if(grid[rowIdx][colIdx] && flag) {
      return
    }
    // const gridDeepCopy = grid.map((row) => [...row])
    // gridDeepCopy[rowIdx][colIdx] = flag
    // if (flag) queue.current.push([rowIdx, colIdx])
    // setGrid(gridDeepCopy)
    // there is still a bug, we're not getting updated value of grid
    // to get updated value of grid, we will pass a callback inside setGrid
    setGrid((prevGrid) => {
      const gridDeepCopy = prevGrid.map((row) => [...row])
      gridDeepCopy[rowIdx][colIdx] = flag
      if (flag) queue.current.push([rowIdx, colIdx])
      return gridDeepCopy
    })
  }

  useEffect(() => {
    if (queue.current.length === 9) {
      queue.current.forEach(([rowIdx, colIdx], idx) => {
        setTimeout(() => handleOnClick(rowIdx, colIdx, false), 1000 * (idx + 1))
      })
      // console.log('start removing color')
      // to prevent timer from running again and again and...
      queue.current = []
    }
  })

  return (
    <div className="container">
      {grid.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return (
            <div
              className={`cell ${cell ? 'active' : ''}`}
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleOnClick(rowIdx, colIdx, true)}
            ></div>
          )
        })
      })}
    </div>
  )
}

export default InteractiveGrid
