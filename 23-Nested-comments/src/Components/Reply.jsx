import React, { useState } from 'react'

const Reply = ({ setShowReplyBox }) => {
  const [reply, setReply] = useState('')
  const handlePostReply = () => {
    setReply('')
    setShowReplyBox(false)
  }
  // console.log(setShowReplyBox)

  return (
    <div className="reply-form">
      <textarea
        className="reply-textarea"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Write a reply..."
      ></textarea>
      <button className="post-reply-btn" onClick={handlePostReply}>
        post reply
      </button>
    </div>
  )
}

export default Reply
