import React from 'react'
import Comment from './Components/Comment'
import commentsData from './data/commentsData.json'
import useComments from './hooks/useComments'
import TopBar from './Components/Post'
import './styles.css'

export default function App() {
  const { comments, addComment, deleteComment } = useComments(commentsData)

  return (
    <div className="app-container">
      <TopBar />
      <div className="comments-section">
        <h2 className="comments-heading">Discussion</h2>
        <Comment
          comment={comments[1]}
          allComments={comments}
          addComment={addComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  )
}
