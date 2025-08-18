import React from 'react'

const Pills = ({ image, text, onClick }) => {
  return (
    <span className="user-pill" onClick={onClick} title={`Remove ${text}`}>
      <img src={image} alt={text} className="pill-avatar" />
      <span className="pill-text">{text}</span>
      <span className="pill-remove">&times;</span>
    </span>
  )
}

export default Pills