import React from 'react'
import Comment from './Comment'
import Reply from './Reply'

const main = ({ comment, allComments, addComment, deleteComment }) => {
  return (
    <div className="header">
      <h1>Discuss here</h1>
      {/* <Comment/> */}
      <Comment
        comment={comment[1]}
        allComments={allComments}
        addComment={addComment}
        deleteComment={deleteComment}
      />
      <Reply
        setShowReplyBox={setShowReplyBox}
        addComment={addComment}
        id={comment.id}
      />
    </div>
  )
}

export default main
