import React from 'react'

const Result = ({ userAnswers, questions, score, totalTime, resetQuiz = () => {} }) => {
  const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length
  const percentage = Math.round((correctAnswers / questions.length) * 100)
  const averageTime = Math.round(totalTime / questions.length)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "🏆 Outstanding! You're a tech wizard!", class: "excellent" }
    if (percentage >= 80) return { message: "🎉 Great job! You know your tech!", class: "great" }
    if (percentage >= 70) return { message: "👍 Good work! Keep learning!", class: "good" }
    if (percentage >= 50) return { message: "📚 Not bad, but room for improvement!", class: "average" }
    return { message: "💪 Keep studying and try again!", class: "needs-improvement" }
  }

  const performance = getPerformanceMessage()

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  return (
    <div className="results">
      <div className="results-header">
        <h2>🎯 Quiz Complete!</h2>
        <div className={`performance-badge ${performance.class}`}>
          {performance.message}
        </div>
      </div>

      <div className="score-summary">
        <div className="score-circle">
          <div className="score-text">
            <span className="score-number">{correctAnswers}</span>
            <span className="score-total">/{questions.length}</span>
          </div>
          <div className="percentage">{percentage}%</div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Time</span>
            <span className="stat-value">{formatTime(totalTime)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Time</span>
            <span className="stat-value">{formatTime(averageTime)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{percentage}%</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="retry-button" onClick={resetQuiz}>
          🔄 Try Again
        </button>
      </div>

      <div className="detailed-results">
        <h3>📊 Detailed Results</h3>
        
        <ul className="question-results">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index]
            const correctOption = question.answerOptions.find((ans) => ans.isCorrect)
            
            return (
              <li key={index} className={`result-item ${userAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="question-summary">
                  <span className="question-number">Q{index + 1}</span>
                  <span className="question-text">{question.question}</span>
                  <span className="time-taken">{formatTime(userAnswer.timeTaken)}</span>
                </div>
                
                {(
                  <div className="correct-answer-display">
                    <span className="correct-label">Correct Answer:</span>
                    <span className="correct-text">{correctOption.text}</span>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Result