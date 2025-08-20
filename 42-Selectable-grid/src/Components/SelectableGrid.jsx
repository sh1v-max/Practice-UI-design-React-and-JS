import React, { useCallback, useState } from 'react'

const SelectableGrid = ({ rows = 10, cols = 10 }) => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [selectedBoxes, setSelectedBoxes] = useState([])

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseDown = (boxNumber) => {
    setIsMouseDown(true)
    setSelectedBoxes([boxNumber])
  }

  const handleMouseEnter = useCallback(
    (boxNumber) => {
      if (isMouseDown) {
        const startBox = selectedBoxes[0]
        const endBox = boxNumber

        const startRow = Math.floor((startBox - 1) / cols)
        const startCol = (startBox - 1) % cols
        const endRow = Math.floor((endBox - 1) / cols)
        const endCol = (endBox - 1) % cols

        const minRow = Math.min(startRow, endRow)
        const maxRow = Math.max(startRow, endRow)
        const minCol = Math.min(startCol, endCol)
        const maxCol = Math.max(startCol, endCol)

        const selected = []
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * cols + col + 1)
          }
        }

        setSelectedBoxes(selected)
      }
    },
    [isMouseDown]
  )

  const clearSelection = () => {
    setSelectedBoxes([])
  }

  return (
    <div className="selectable-grid-wrapper">
      <div className="grid-header">
        <div className="grid-info">
          <span className="grid-dimensions">{rows} × {cols} Grid</span>
          <span className="selected-count">
            {selectedBoxes.length} cell{selectedBoxes.length !== 1 ? 's' : ''} selected
          </span>
        </div>
        <button 
          className="clear-button" 
          onClick={clearSelection}
          disabled={selectedBoxes.length === 0}
        >
          Clear Selection
        </button>
      </div>
      
      <div
        className="grid"
        onMouseUp={handleMouseUp}
      >
        {[...Array(rows * cols).keys()].map((_, i) => (
          <div
            key={i}
            className={`box ${selectedBoxes.includes(i + 1) ? 'selected' : ''}`}
            onMouseDown={() => handleMouseDown(i + 1)}
            onMouseEnter={() => handleMouseEnter(i + 1)}
          >
            {/* {i + 1} */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectableGrid