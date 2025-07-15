import React from 'react'

const Board = ({ size, board, handleClick }) => {
  // console.log(size, board)
  return (
    <div
      className="board"
      style={{ gridTemplateColumns: `repeat(${size}, 50px)` }}
    >
      {board.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return (
            <div
              onClick={() => handleClick(rowIdx, colIdx)}
              className="cell"
            >{cell}</div>
          )
        })
      })}
    </div>
  )
}

export default Board
