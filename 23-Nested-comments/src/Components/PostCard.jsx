import React, { useState } from 'react'

const PostCard = ({ commentCount }) => {
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
        <h2 className="post-title">
          Dark vs Light Mode – What Do Developers Prefer?
        </h2>
        <div className="post-text">
          <p>
            Hey everyone! I’ve been experimenting with building dark and light
            themes for a project, and it got me curious — which one do
            developers actually prefer when coding or browsing?
          </p>
          <p>Here’s what I’m exploring:</p>
          <ul>
            <li>Seamless switching between dark and light themes</li>
            <li>Persistent theme storage (remembers user preference)</li>
            <li>Accessibility and readability in both modes</li>
          </ul>
          <p>
            Personally, I lean towards dark mode, but I’ve heard some developers
            find light mode better for focus.
            <strong>
              {' '}
              What’s your take? Should projects always support both modes?
            </strong>
          </p>
        </div>

        <div className="post-actions">
          {/* <button className="action-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M2 1a1 1 0 0 0-1 1v11.793l2.146-2.147A.5.5 0 0 1 3.5 12H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
            </svg>
            {commentCount} Comments
          </button> */}
          <button className="action-btn">🎁 Award</button>
          <button className="action-btn">📤 Share</button>
          <button className="action-btn">💾 Save</button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
