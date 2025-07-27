import React from 'react'
import { TypingEffect } from './Components/TypingEffect'

export const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="title">Typing Effect Demo</h1>
        <p className="subtitle">
          A simple React app demonstrating a smooth typing animation.
        </p>
      </header>

      <main className="app-main">
        <h2 className="section-title">Demo</h2>
        <TypingEffect
          texts={[
            'I love JavaScript and React.',
            "I'm a Frontend Developer.",
            'Building Beautiful Websites.',
            'Coding... Learning... Growing...',
            'Clean code, clean design.',
            'Transforming concepts into real products.',
          ]}
          delay={100}
        />
      </main>

      {/* Info Section */}
      <section className="info-section">
        <div className="card">
          <h3>About This Demo</h3>
          <p>
            This typing effect is built using React hooks including useState,
            useEffect, and useRef. It demonstrates proper timer management and
            cleanup to prevent memory leaks.
          </p>
        </div>

        <div className="card">
          <h3>Tech Stack Used</h3>
          <div className="tags">
            <span className="tag react">React</span>
            <span className="tag js">JavaScript</span>
            <span className="tag css">CSS3</span>
            <span className="tag hooks">Hooks</span>
          </div>
        </div>
      </section>

      <footer className="app-footer">
        <p>© 2025 TypingEffect App | Crafted with React</p>
      </footer>
    </div>
  )
}
