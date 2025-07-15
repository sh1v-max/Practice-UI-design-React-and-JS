import React, { useState } from 'react'
import Board from './Board'
import { checkWinner, initialState } from '../Utils/TicTacToeUtils'

const TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(initialState(size))
  const winner = checkWinner(board, size)
  // console.log(winner)
  const [turnX, setTurnX] = useState(true)
  const status = winner
    ? `Winner: ${winner}`
    : turnX
    ? 'Player X turn'
    : 'Player O turn'

  // console.log(board)
  const handleClick = (rowIdx, colIdx) => {
    // to prevent clicking when there's already a value
    if (board[rowIdx][colIdx] || winner) {
      return
    }
    // console.log("clicked at: ", rowIdx, colIdx)
    const deepCopyBoard = JSON.parse(JSON.stringify(board))
    deepCopyBoard[rowIdx][colIdx] = turnX ? 'X' : 'O'
    // console.log(deepCopyBoard)
    setBoard(deepCopyBoard)
    setTurnX(!turnX)
  }

  const handleReset = () => {
    setBoard(initialState(size))
  }

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>
      <Board handleClick={handleClick} size={size} board={board} />
      <div className="status">{status}</div>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default TicTacToe
