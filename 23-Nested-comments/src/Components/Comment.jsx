import React, { useState } from 'react'
import Reply from './Reply'

const Comment = () => {
  const [showReplyBox, setShowReplyBox] = useState(false)
  
  return (
    <div className="comment-container">
      <div className="header">
        <h1>Discussions</h1>
      </div>
      <div className="comment-header">
        <p className='comment-value'>Comment</p>
        <div className="comment-actions">
          <button className='reply-btn'>Reply</button>
          <button className='delete-btn'>Delete</button>
        </div>
      </div>
      {showReplyBox && <Reply />}
    </div>
  )
}

export default Comment
