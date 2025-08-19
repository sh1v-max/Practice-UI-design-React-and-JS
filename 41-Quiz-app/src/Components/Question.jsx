import React, { useState, useEffect } from 'react'
import Timer from './Timer'

const Question = ({ 
  question, 
  questionNumber,
  onAnswerClick = () => {}, 
  timerEnabled = true,
  timePerQuestion = 30 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeUp, setTimeUp] = useState(false)

  // console.log(question)

  useEffect(() => {
    setSelectedAnswer(null)
    setShowFeedback(false)
    setStartTime(Date.now())
    setTimeUp(false)
  }, [question])

  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null || timeUp) return
    
    const timeTaken = (Date.now() - startTime) / 1000
    setSelectedAnswer(option)
    setShowFeedback(true)
    
    setTimeout(() => {
      onAnswerClick(option.isCorrect, timeTaken)
    }, 1500)
  }

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setTimeUp(true)
      setShowFeedback(true)
      
      setTimeout(() => {
        onAnswerClick(false, timePerQuestion)
      }, 2000)
    }
  }

  const getButtonClass = (option) => {
    if (!showFeedback) return 'option-button'
    
    if (option.isCorrect) return 'option-button correct'
    if (selectedAnswer === option && !option.isCorrect) return 'option-button incorrect'
    return 'option-button disabled'
  }

  return (
    <div className="question">
      <div className="question-header">
        <div className="question-number">Question {questionNumber}</div>
        {timerEnabled && !showFeedback && (
          <Timer 
            duration={timePerQuestion} 
            onTimeUp={handleTimeUp}
            key={question.question}
          />
        )}
      </div>
      
      <h2 className="question-text">{question.question}</h2>
      
      {showFeedback && !timeUp && (
        <div className={`feedback ${selectedAnswer?.isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
          {selectedAnswer?.isCorrect ? '🎉 Correct!' : '❌ Wrong Answer!'}
          {!selectedAnswer?.isCorrect && (
            <div className="correct-answer">
              Correct answer: {question.answerOptions.find(opt => opt.isCorrect).text}
            </div>
          )}
        </div>
      )}

      {timeUp && (
        <div className="feedback time-up-feedback">
          ⏰ Time's Up!
          <div className="correct-answer">
            Correct answer: {question.answerOptions.find(opt => opt.isCorrect).text}
          </div>
        </div>
      )}

      <ul className="options">
        {question.answerOptions.map((option, index) => {
          return (
            <li key={option.text}>
              <button 
                className={getButtonClass(option)}
                onClick={() => handleAnswerClick(option)}
                disabled={selectedAnswer !== null || timeUp}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option.text}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Question