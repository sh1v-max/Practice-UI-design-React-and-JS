import React, { useState, useEffect } from 'react'
// import { Hello } from './Components/Hello'
import questions from './Constants/questions.json'
import Question from './Components/Question'
import Result from './Components/Result'
import Welcome from './Components/Home'
import ProgressBar from './Components/ProgressBar'
import Timer from './Components/Timer'

export const App = () => {
  const [gameState, setGameState] = useState('welcome')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [timePerQuestion, setTimePerQuestion] = useState(30)
  const [totalTime, setTotalTime] = useState(0) 
  const [quizSettings, setQuizSettings] = useState({
    timerEnabled: true,
    showProgress: true,
    randomizeQuestions: false,
    questionsToShow: questions.length
  })
  const [shuffledQuestions, setShuffledQuestions] = useState(questions)

  useEffect(() => {
    if (gameState === 'playing') {
      let questionsToUse = [...questions]
      if (quizSettings.randomizeQuestions) {
        questionsToUse = questionsToUse.sort(() => Math.random() - 0.5)
      }
      questionsToUse = questionsToUse.slice(0, quizSettings.questionsToShow)
      setShuffledQuestions(questionsToUse)
    }
  }, [gameState, quizSettings])

  // all the logics in app.js
  const handleNextQuestion = (isCorrect, timeTaken) => {
    setCurrentQuestion(currentQuestion + 1)
    setUserAnswers([...userAnswers, { isCorrect, timeTaken }])
    setTotalTime(totalTime + timeTaken)
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setUserAnswers([])
    setScore(0)
    setTotalTime(0)
    setGameState('welcome')
  }

  const startQuiz = (settings) => {
    setQuizSettings(settings)
    setGameState('playing')
  }

  const finishQuiz = () => {
    setGameState('finished')
  }

  useEffect(() => {
    if (currentQuestion >= shuffledQuestions.length && gameState === 'playing') {
      finishQuiz()
    }
  }, [currentQuestion, shuffledQuestions.length, gameState])

  return (
    <div className="app">
      {/* <Hello/> */}
      
      {gameState === 'welcome' && (
        <Welcome 
          onStartQuiz={startQuiz}
          totalQuestions={questions.length}
        />
      )}

      {gameState === 'playing' && (
        <>
          <div className="quiz-header">
            <h1>Tech Knowledge Quiz</h1>
            
            {quizSettings.showProgress && (
              <ProgressBar 
                current={currentQuestion + 1} 
                total={shuffledQuestions.length} 
              />
            )}
            
            <div className="quiz-stats">
              <span>Question {currentQuestion + 1} of {shuffledQuestions.length}</span>
              <span>Score: {score}/{currentQuestion}</span>
            </div>
          </div>

          {currentQuestion < shuffledQuestions.length && (
            <Question
              question={shuffledQuestions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              onAnswerClick={handleNextQuestion}
              timerEnabled={quizSettings.timerEnabled}
              timePerQuestion={timePerQuestion}
            />
          )}
        </>
      )}

      {gameState === 'finished' && (
        <Result
          userAnswers={userAnswers}
          questions={shuffledQuestions}
          score={score}
          totalTime={totalTime}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  )
}