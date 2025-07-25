import { useState } from 'react'
import Comment from './Components/Comment'
import commentsData from './data/commentsData.json'
import './styles.css'
import useComments from './hooks/useComments'

export default function App() {
  const {comments, addComment, deleteComment} = useComments(commentsData)

  return (
    <Comment
      comment={comments[1]}
      allComments={comments}
      addComment={addComment}
      deleteComment={deleteComment}
    />
  )
}
