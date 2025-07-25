import React, { useState } from 'react'

const Reply = ({ setShowReplyBox, addComment, id }) => {
  const [reply, setReply] = useState('')

  const handlePostReply = () => {
    if (!reply.trim()) return
    addComment(reply, id)
    setReply('')
    setShowReplyBox(false)
  }

  return (
    <div className="reply-form">
      <textarea
        className="reply-textarea"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
      ></textarea>
      <button className="post-reply-btn" onClick={handlePostReply}>
        Post Reply
      </button>
    </div>
  )
}

export default Reply
