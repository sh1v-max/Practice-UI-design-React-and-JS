import { useState } from 'react'
import Comment from './Components/Comment'
import commentsData from './data/commentsData.json'
import './styles.css'

export default function App() {
  const [comments, setComments] = useState(commentsData.comments)
  // console.log(comments)

  // add a comment
  const addComment = (value, parentId) => {
    const newId = Date.now()
    const newComment = { id: newId, value, parentId, children: [] }
    setComments((prevComments) => {
      const updatedComment = { ...prevComments, [newId]: newComment }
      updatedComment[parentId].children.push(newId)
      return updatedComment
    })
  }

  // delete a comment
  const deleteComment = (id) => {
    const parentId = comments[id].parentId
    setComments((prevComments) => {
      const updatedComments = { ...prevComments }
      updatedComments[parentId].children = updatedComments[parentId].children.filter(
        (childId) => {
          return childId !== id
        }
      )
      return updatedComments
    })
  }

  return (
    <Comment
      comment={comments[1]}
      allComments={comments}
      addComment={addComment}
      deleteComment={deleteComment}
    />
  )
}
