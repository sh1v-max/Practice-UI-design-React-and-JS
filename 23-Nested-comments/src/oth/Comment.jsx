import React, { useState } from 'react'
import Reply from './Reply'

const Comment = ({ comment, allComments, addComment, deleteComment }) => {
  const [showReplyBox, setShowReplyBox] = useState(false)

  const handleReplyToggle = () => {
    setShowReplyBox(!showReplyBox)
  }

  return (
    <div className="comment-container">
      <div className="comment-header">
        <p className="comment-value">{comment.value}</p>
        <div className="comment-actions">
          <button className="reply-btn" onClick={handleReplyToggle}>
            {showReplyBox ? 'Cancel' : 'Reply'}
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteComment(comment.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {showReplyBox && (
        <Reply
          setShowReplyBox={setShowReplyBox}
          addComment={addComment}
          id={comment.id}
        />
      )}
      {/* Render child comments */}
      <div className="nested-comments">
        {comment.children.map((childId) => (
          <Comment
            key={childId}
            comment={allComments[childId]}
            allComments={allComments}
            addComment={addComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  )
}

export default Comment
