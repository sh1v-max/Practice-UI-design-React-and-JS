import React from 'react'

const QnA = ({ qna, showAns, handleQnA }) => {
  return (
    <div className={`qna ${showAns ? 'active' : ''}`}>
      <div className="question-section" onClick={handleQnA}>
        <h3 className="question">{qna.question}</h3>
        <span className="toggle-icon">{showAns ? '−' : '+'}</span>
      </div>
      
      <div className={`answer-section ${showAns ? 'show' : ''}`}>
        <div className="answer-content">
          <div className="divider"></div>
          <p className="answer">{qna.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default QnA