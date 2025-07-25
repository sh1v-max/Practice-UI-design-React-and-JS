import React, { useState } from 'react'

const Reply = ({ setShowReplyBox, addComment, id }) => {
  const [reply, setReply] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePostReply = async () => {
    if (reply.trim() === '') return
    
    setIsSubmitting(true)
    
    // Simulate network delay
    setTimeout(() => {
      addComment(reply, id)
      setReply('')
      setShowReplyBox(false)
      setIsSubmitting(false)
    }, 500)
  }

  const handleCancel = () => {
    setReply('')
    setShowReplyBox(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handlePostReply()
    }
  }

  return (
    <div className="reply-form">
      <div className="reply-input-container">
        <textarea
          className="reply-textarea"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What are your thoughts?"
          rows={4}
          disabled={isSubmitting}
        />
        <div className="reply-formatting-help">
          <span className="formatting-tip">Ctrl+Enter to submit</span>
        </div>
      </div>
      <div className="reply-actions">
        <button 
          className="cancel-btn" 
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button 
          className={`post-reply-btn ${reply.trim() === '' ? 'disabled' : ''}`}
          onClick={handlePostReply}
          disabled={reply.trim() === '' || isSubmitting}
        >
          {isSubmitting ? 'Posting...' : 'Comment'}
        </button>
      </div>
    </div>
  )
}

export default Reply