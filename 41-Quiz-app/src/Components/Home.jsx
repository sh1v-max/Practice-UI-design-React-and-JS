import React, { useState } from 'react'

const Home = ({ onStartQuiz, totalQuestions }) => {
  const [settings, setSettings] = useState({
    timerEnabled: true,
    showProgress: true,
    randomizeQuestions: true,
    questionsToShow: totalQuestions
  })

  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    })
  }

  const handleStartQuiz = () => {
    onStartQuiz(settings)
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-header">
        <h1 className="app-title">🧠 Tech Quiz</h1>
        <p className="app-subtitle">Test your knowledge of technology, programming, and computing</p>
      </div>

      <div className="welcome-content">
        <div className="quiz-info">
          <h3>📋 Quiz Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">📚</span>
              <div>
                <p>{totalQuestions} questions</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <div>
                <p>30 seconds per question</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <p>1 point per correct answer</p>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-settings">
          <div className="setting-item">
            <label className="range-label">
              Number of Questions: {settings.questionsToShow}
            </label>
            <input
              type="range"
              min="5"
              max={totalQuestions}
              value={settings.questionsToShow}
              onChange={(e) => handleSettingChange('questionsToShow', parseInt(e.target.value))}
              className="range-slider"
            />
          </div>
        </div>

        <button className="start-button" onClick={handleStartQuiz}>
          🚀 Start Quiz
        </button>

        <div className="app-features">
          <h3>✨ Features</h3>
          <div className="features-grid">
            <span>⏱️ Timer</span>
            <span>📊 Progress Tracking</span>
            <span>🎲 Question Randomization</span>
            <span>📈 Detailed Analytics</span>
            <span>🏆 Performance Scoring</span>
            <span>📱 Responsive Design</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home