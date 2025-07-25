import React, { useState } from 'react'

const PostCard = ({ commentCount = 0 }) => {
  const [votes, setVotes] = useState(1247)
  const [userVote, setUserVote] = useState(null) // null, 'up', or 'down'

  const handleUpvote = () => {
    if (userVote === 'up') {
      setVotes(votes - 1)
      setUserVote(null)
    } else if (userVote === 'down') {
      setVotes(votes + 2)
      setUserVote('up')
    } else {
      setVotes(votes + 1)
      setUserVote('up')
    }
  }

  const handleDownvote = () => {
    if (userVote === 'down') {
      setVotes(votes + 1)
      setUserVote(null)
    } else if (userVote === 'up') {
      setVotes(votes - 2)
      setUserVote('down')
    } else {
      setVotes(votes - 1)
      setUserVote('down')
    }
  }

  return (
    <div className="post-card">
      <div className="vote-section">
        <button 
          className={`vote-btn upvote ${userVote === 'up' ? 'active' : ''}`}
          onClick={handleUpvote}
        >
          ▲
        </button>
        <span className="vote-count">{votes}</span>
        <button 
          className={`vote-btn downvote ${userVote === 'down' ? 'active' : ''}`}
          onClick={handleDownvote}
        >
          ▼
        </button>
      </div>
      <div className="post-content">
        <div className="post-meta">
          <span className="subreddit">r/webdev</span>
          <span className="separator">•</span>
          <span className="posted-by">Posted by u/developer123</span>
          <span className="separator">•</span>
          <span className="time-ago">5 hours ago</span>
        </div>
        <h2 className="post-title">Building a Nested Comment System with React - Need Feedback!</h2>
        <div className="post-text">
          <p>Hey everyone! I just finished building a nested comment system using React hooks and I'm looking for some feedback on the architecture and user experience.</p>
          <p>The system supports:</p>
          <ul>
            <li>Infinite nesting levels</li>
            <li>Real-time adding/deleting comments</li>
            <li>Clean, Reddit-like interface</li>
          </ul>
          <p>What do you think? Any suggestions for improvements?</p>
        </div>
        <div className="post-actions">
          <button className="action-btn">
            💬 {commentCount} Comments
          </button>
          <button className="action-btn">🎁 Award</button>
          <button className="action-btn">📤 Share</button>
          <button className="action-btn">💾 Save</button>
        </div>
      </div>
    </div>
  )
}

export default PostCard