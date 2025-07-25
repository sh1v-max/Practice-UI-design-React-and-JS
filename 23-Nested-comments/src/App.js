import React from 'react'
import Header from './Components/Header'
import PostCard from './Components/PostCard'
import Comment from './Components/Comment'
import commentsData from './data/commentsData.json'
import './styles.css'
import useComments from './hooks/useComments'

export default function App() {
  const {comments, addComment, deleteComment} = useComments(commentsData)

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <PostCard />
        <div className="comments-section">
          <div className="comments-header">
            <h3>Comments</h3>
            <span className="comments-count">{Object.keys(comments).length - 1} comments</span>
          </div>
          <div className="comments-container">
            <Comment
              comment={comments[1]}
              allComments={comments}
              addComment={addComment}
              deleteComment={deleteComment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}