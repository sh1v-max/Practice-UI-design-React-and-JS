import React from 'react'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">🗨️</span>
          <span className="logo-text">CommentHub</span>
        </div>
        <nav className="nav-menu">
          <a href="#" className="nav-link">Popular</a>
          <a href="#" className="nav-link">All</a>
          <a href="#" className="nav-link">Random</a>
        </nav>
        <div className="user-actions">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </header>
  )
}

export default Header