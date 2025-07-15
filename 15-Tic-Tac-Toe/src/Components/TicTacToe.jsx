import React, { useState } from 'react'
import Board from './Board'

const TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(
    Array.from({ length: size }, () => {
      return Array(size).fill(null)
    })
  )
  const [turnX, setTurnX] = useState(true)
  const status = turnX ? "Player X turn" : "Player O turn"

  // console.log(board)
  const handleClick = (rowIdx, colIdx) => {
    // to prevent clicking when there's already a value
    if(board[rowIdx][colIdx]){
      return
    }
    console.log("clicked at: ", rowIdx, colIdx)
    const deepCopyBoard = JSON.parse(JSON.stringify(board))
    deepCopyBoard[rowIdx][colIdx] = turnX ? "X" : "O"
    console.log(deepCopyBoard)
    setBoard(deepCopyBoard)
    setTurnX(!turnX)
  }

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <Board handleClick={handleClick} size={size} board={board}/>
      <div className="status">{status}</div>
      <button>Reset</button>
    </div>
  )
}

export default TicTacToe
