import { useState } from 'react'
import Comment from './Components/Comment'
import commentsData from './data/commentsData.json'
import './styles.css'

export default function App() {
  const [comments, setComments] = useState(commentsData.comments)
  // console.log(comments)
  const addComment = (value, parentId) => {
    const newId = Date.now()
    const newComment = {id:newId, value, parentId, children:[]}
    setComments((prevComments) => {
      const updatedComment = {...prevComments, [newId]:newComment}
      updateComment[parentId].children.push(newId)
    })
  }

  return <Comment comment = {comments[1]} allComments = {comments}/>
}
