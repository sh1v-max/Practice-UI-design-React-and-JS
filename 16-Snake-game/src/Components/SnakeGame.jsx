import React, { useEffect, useRef, useState } from 'react'

const GRID_SIZE = 15
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill(0)
)
const INITIAL_SNAKE = [
  [7, 7],
  [6, 7],
]

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID_SIZE)
  const y = Math.floor(Math.random() * GRID_SIZE)
  return [x, y]
}

const SnakeGame = () => {
  // console.log(GAMEGRID)
  const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE)

  const directionRef = useRef([1, 0])
  const foodRef = useRef(generateFood())

  const isSnakeBodyDiv = (xc, yc) => {
    return snakeBody.some(([x, y]) => {
      return x === xc && y === yc
    })
  }

    const isSnakeHead = (xc, yc) => {
    return snakeBody.length > 0 && snakeBody[0][0] === xc && snakeBody[0][1] === yc
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const newHead = [
          prevSnakeBody[0][0] + directionRef.current[0],
          prevSnakeBody[0][1] + directionRef.current[1],
        ]
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] > GRID_SIZE ||
          prevSnakeBody.some(([x, y]) => {
            return newHead[0] === x && newHead[1] === y
          })
        ) {
          directionRef.current = [1, 0]
          return INITIAL_SNAKE
        }
        const copySnakeBody = prevSnakeBody.map((arr) => [...arr])
        // food and pop tail logic
        if (
          newHead[0] === foodRef.current[0] &&
          newHead[1] === foodRef.current[1]
        ) {
          foodRef.current = generateFood()
        } else {
          copySnakeBody.pop()
        }
        copySnakeBody.unshift(newHead)
        return copySnakeBody
      })
    }, 200)
    const handleDirection = (e) => {
      const key = e.key
      // console.log(key)
      if (key === 'ArrowUp' || (key === 'w' && directionRef.current[1] != 1)) {
        directionRef.current = [0, -1]
      } else if (
        key === 'ArrowLeft' ||
        (key === 'a' && directionRef.current[0] != 1)
      ) {
        directionRef.current = [-1, 0]
      } else if (
        key === 'ArrowRight' ||
        (key === 'd' && directionRef.current[0] != -1)
      ) {
        directionRef.current = [1, 0]
      } else if (
        key === 'ArrowDown' ||
        (key === 's' && directionRef.current[1] != -1)
      ) {
        directionRef.current = [0, 1]
      }
    }

    window.addEventListener('keydown', handleDirection)
    // clean up
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('keydown', handleDirection)
    }
  }, [])

  return (
    <div className="parent">
      <div className="game-header">
        <h1>Snake Game</h1>
        <div className="score">Score: {snakeBody.length - 2}</div>
        <div className="controls">
          <span>Use WASD or Arrow Keys to move</span>
        </div>
      </div>
      <div className="container">
        {GAMEGRID.map((row, yc) => {
          return row.map((cell, xc) => {
            return (
              <div
                key={`${xc}-${yc}`}
                className={`cell ${isSnakeBodyDiv(xc, yc) ? 'snake' : ''}
                ${isSnakeHead(xc, yc) ? 'snake-head' : ''}
              ${
                foodRef.current[0] === xc && foodRef.current[1] === yc
                  ? 'food'
                  : ''
              }`}
              ></div>
            )
          })
        })}
      </div>
    </div>
  )
}

export default SnakeGame
