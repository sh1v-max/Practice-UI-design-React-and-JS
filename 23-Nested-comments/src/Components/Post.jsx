import React from 'react'

const TopBar = () => {
  return (
    <header className="top-bar">
      <h1 className="app-title">Nested Comments App</h1>
      <nav className="top-nav">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">Trending</button>
        <button className="nav-btn">About</button>
      </nav>
    </header>
  )
}

export default TopBar
