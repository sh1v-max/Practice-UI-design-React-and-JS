import React, { useEffect, useState } from 'react'

const MemoryGame = () => {
  const [cards, setCards] = useState(generateGrid())
  const [isLock, setIsLock] = useState(false)
  const [flippedCard, setFlippedCard] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(
    localStorage.getItem('highScore') || 0
  )
  const [matchedPairs, setMatchedPairs] = useState(0)

  const handleClick = (index) => {
    if (cards[index].isFlipped || isLock) return
    const copyCards = [...cards]
    copyCards[index].isFlipped = true
    setCards(copyCards)
    setFlippedCard([...flippedCard, index])
    setCurrentScore((prev) => prev + 1)
  }

  useEffect(() => {
    if (flippedCard.length === 2) {
      setIsLock(true)
      setTimeout(() => {
        const [first, second] = flippedCard
        if (cards[first].number !== cards[second].number) {
          setCards((prevCards) => {
            const copyCards = [...prevCards]
            copyCards[first].isFlipped = false
            copyCards[second].isFlipped = false
            return copyCards
          })
        } else {
          setMatchedPairs((prev) => prev + 1)
        }
        setIsLock(false)
        setFlippedCard([])
      }, 1000)
    }
  }, [flippedCard])

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      if (currentScore < highScore || highScore === 0) {
        setHighScore(currentScore)
        localStorage.setItem('highScore', currentScore)
      }
      alert(`You Won! Your Score: ${currentScore}`)
    }
  }, [matchedPairs])

  const resetGame = () => {
    setCards(generateGrid())
    setFlippedCard([])
    setCurrentScore(0)
    setMatchedPairs(0)
    setIsLock(false)
  }

  return (
    <div className="game-container">
      <h1 className="game-title">🧠 Memory Game</h1>
      <div className="scoreboard">
        <p>Current Score: {currentScore}</p>
        <p>Best Score: {highScore}</p>
      </div>
      <div className="instructions">
        <p>Match all pairs with the least number of flips!</p>
      </div>
      <div className="grid-container">
        {cards.map(({ id, number, isFlipped }) => (
          <button
            key={id}
            className={`cards ${isFlipped ? 'flipped' : ''}`}
            onClick={() => handleClick(id)}
          >
            {isFlipped ? number : ''}
          </button>
        ))}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        🔄 Reset Game
      </button>
    </div>
  )
}

function generateGrid() {
  const arr = Array.from({ length: 10 }, (_, index) => index + 1) // 9 pairs = 18 cards
  const grid = [...arr, ...arr].sort(() => Math.random() - 0.5)
  return grid.map((item, index) => ({
    id: index,
    number: item,
    isFlipped: false,
  }))
}

export default MemoryGame
