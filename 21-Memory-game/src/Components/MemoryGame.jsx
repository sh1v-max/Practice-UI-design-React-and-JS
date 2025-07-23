import React, { useEffect, useState } from 'react'

const MemoryGame = () => {
  const [cards, setCards] = useState(generateGrid())
  const [isLock, setIsLock] = useState(false)
  const [flippedCard, setFlippedCard] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('memoryGameHighScore')
    return saved ? parseInt(saved) : 0
  })
  const [moves, setMoves] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock || gameCompleted) {
      return
    }

    if (!gameStarted) {
      setGameStarted(true)
    }

    const copyCards = [...cards]
    copyCards[index].isFlipped = true
    setCards(copyCards)
    setFlippedCard([...flippedCard, index])
  }

  const resetGame = () => {
    setCards(generateGrid())
    setFlippedCard([])
    setCurrentScore(0)
    setMoves(0)
    setGameCompleted(false)
    setIsLock(false)
    setGameStarted(false)
  }

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions)
  }

  useEffect(() => {
    if (flippedCard.length === 2) {
      setIsLock(true)
      setMoves(prev => prev + 1)
      
      setTimeout(() => {
        if (cards[flippedCard[0]].number === cards[flippedCard[1]].number) {
          // Match found
          setCurrentScore(prev => prev + 10)
        } else {
          // No match
          setCards((prevCards) => {
            const copyCards = [...prevCards]
            copyCards[flippedCard[0]].isFlipped = false
            copyCards[flippedCard[1]].isFlipped = false
            return copyCards
          })
        }
        setIsLock(false)
        setFlippedCard([])
      }, 1000)
    }
  }, [flippedCard, cards])

  // Check if game is completed
  useEffect(() => {
    const allFlipped = cards.every(card => card.isFlipped)
    if (allFlipped && gameStarted) {
      setGameCompleted(true)
      const finalScore = currentScore + Math.max(0, 100 - moves)
      setCurrentScore(finalScore)
      
      if (finalScore > highScore) {
        setHighScore(finalScore)
        localStorage.setItem('memoryGameHighScore', finalScore.toString())
      }
    }
  }, [cards, currentScore, highScore, moves, gameStarted])

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">Memory Master</h1>
        <button className="instructions-btn" onClick={toggleInstructions}>
          {showInstructions ? '!' : '!'}
        </button>
      </div>

      {showInstructions && (
        <div className="instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on cards to flip them and reveal numbers</li>
            <li>Find matching pairs of numbers</li>
            <li>Match all pairs to win the game</li>
            <li>Score: +10 points per match</li>
            <li>Bonus: Up to 100 points based on efficiency</li>
          </ul>
        </div>
      )}

      <div className="game-stats">
        <div className="stat-item">
          <span className="stat-label">Current Score:</span>
          <span className="stat-value">{currentScore}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">High Score:</span>
          <span className="stat-value">{highScore}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Moves:</span>
          <span className="stat-value">{moves}</span>
        </div>
      </div>

      {gameCompleted && (
        <div className="completion-message">
          <h2>🎉 Congratulations! 🎉</h2>
          <p>You completed the game in {moves} moves!</p>
          <p>Final Score: {currentScore}</p>
          {currentScore === highScore && <p className="new-record">🏆 New High Score! 🏆</p>}
        </div>
      )}

      <div className="grid-container">
        {cards.map(({ id, number, isFlipped }) => {
          return (
            <button 
              key={id}
              className={`cards ${isFlipped ? 'flipped' : ''}`} 
              onClick={() => handleClick(id)}
            >
              {isFlipped ? number : '?'}
            </button>
          )
        })}
      </div>

      <div className="game-controls">
        <button className="reset-btn" onClick={resetGame}>
          New Game
        </button>
      </div>
    </div>
  )
}

function generateGrid() {
  const arr = Array.from({ length: 18 }, (_, index) => index + 1)
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5)
  const cards = grid.map((item, index) => {
    return { id: index, number: item, isFlipped: false }
  })
  return cards
}

export default MemoryGame