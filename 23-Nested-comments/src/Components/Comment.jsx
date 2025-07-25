import React, { useState, useMemo } from 'react'
import Reply from './Reply'

const Comment = ({ comment, allComments, addComment, deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [votes, setVotes] = useState(Math.floor(Math.random() * 50) + 1)
  const [userVote, setUserVote] = useState(null)

  // Generate username once and memoize it based on comment ID
  const username = useMemo(() => {
    const usernames = ['techguru42', 'codewizard', 'reactfan88', 'jsdev99', 'frontendpro', 'webmaster2024']
    // Use comment ID as seed for consistent username
    return usernames[comment.id % usernames.length]
  }, [comment.id])

  // Generate time ago once and memoize it based on comment ID
  const timeAgo = useMemo(() => {
    const times = ['2m', '5m', '15m', '1h', '3h', '6h', '12h', '1d']
    // Use comment ID as seed for consistent time
    return times[comment.id % times.length]
  }, [comment.id])

  const handleReplyClick = () => {
    setShowReplyBox(!showReplyBox)
  }

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed)
  }

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
    <div className={`comment-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="comment-voting">
        <button 
          className={`vote-btn comment-upvote ${userVote === 'up' ? 'active' : ''}`}
          onClick={handleUpvote}
        >
          ▲
        </button>
        <span className="comment-vote-count">{votes}</span>
        <button 
          className={`vote-btn comment-downvote ${userVote === 'down' ? 'active' : ''}`}
          onClick={handleDownvote}
        >
          ▼
        </button>
      </div>
      
      <div className="comment-content">
        <div className="comment-header">
          <div className="comment-meta">
            <span className="username">u/{username}</span>
            <span className="separator">•</span>
            <span className="time-ago">{timeAgo} ago</span>
            <button className="collapse-btn" onClick={handleCollapseClick}>
              {isCollapsed ? '[+]' : '[-]'}
            </button>
          </div>
        </div>
        
        {!isCollapsed && (
          <>
            <div className="comment-body">
              <p className="comment-text">{comment.value}</p>
            </div>
            
            <div className="comment-actions">
              <button className="action-btn reply-btn" onClick={handleReplyClick}>
                💬 {showReplyBox ? 'Cancel' : 'Reply'}
              </button>
              <button className="action-btn award-btn">
                🎁 Award
              </button>
              <button className="action-btn share-btn">
                📤 Share
              </button>
              <button className="action-btn report-btn">
                ⚠️ Report
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => deleteComment(comment.id)}
              >
                🗑️ Delete
              </button>
            </div>
            
            {showReplyBox && (
              <Reply
                setShowReplyBox={setShowReplyBox}
                addComment={addComment}
                id={comment.id}
              />
            )}
            
            {comment.children && comment.children.length > 0 && (
              <div className="nested-comments">
                {comment.children.map((childId) => {
                  return (
                    <Comment
                      key={childId}
                      comment={allComments[childId]}
                      allComments={allComments}
                      addComment={addComment}
                      deleteComment={deleteComment}
                    />
                  )
                })}
              </div>
            )}
          </>
        )}
        
        {isCollapsed && comment.children && comment.children.length > 0 && (
          <div className="collapsed-indicator">
            <span className="collapsed-text">
              {comment.children.length} more repl{comment.children.length === 1 ? 'y' : 'ies'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment