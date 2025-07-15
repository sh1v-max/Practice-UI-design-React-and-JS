import React from 'react'

const Board = ({ size, board, handleClick }) => {
  // console.log(size, board)
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 80px)` }}
    >
      {board.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              onClick={() => handleClick(rowIdx, colIdx)}
              className={`cell ${cell === 'X' ? 'x-cell' : cell === 'O' ? 'o-cell' : ''}`}
            >
              {cell}
            </div>
          )
        })
      })}
    </div>
  )
}

export default Board