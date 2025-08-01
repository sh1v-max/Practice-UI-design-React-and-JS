import React from 'react'
import { Hello } from './Components/Hello'
import data from "./data/faqData.json"
import FAQ from './Components/FAQ'

export const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <div className="hero-section">
          <h1 className="app-title">Knowledge Base</h1>
          <p className="app-description">
            Welcome to our comprehensive FAQ section. Get instant answers to your questions 
            and learn more about our services and policies.
          </p>
        </div>
      </header>
      
      <main className="main-content">
        {/* <Hello data ={data}/> */}
        <FAQ data={data}/>
      </main>
      
      <footer className="app-footer">
        <p>Can't find what you're looking for? <a href="#contact" className="contact-link">Contact our support team</a></p>
      </footer>
    </div>
  )
}