import { useState } from 'react'

const useComments = (commentsData) => {
  const [comments, setComments] = useState(commentsData.comments)

  // Add a comment
  const addComment = (value, parentId) => {
    const newId = Date.now()
    const newComment = { id: newId, value, parentId, children: [] }
    setComments((prevComments) => {
      const updatedComments = { ...prevComments, [newId]: newComment }
      updatedComments[parentId].children.push(newId)
      return updatedComments
    })
  }

  // Delete a comment and its children
  const deleteComment = (id) => {
    const parentId = comments[id].parentId
    setComments((prevComments) => {
      const updatedComments = { ...prevComments }
      updatedComments[parentId].children = updatedComments[parentId].children.filter(
        (childId) => childId !== id
      )
      const queue = [id]
      while (queue.length > 0) {
        const nodeToDelete = queue.shift()
        queue.push(...updatedComments[nodeToDelete].children)
        delete updatedComments[nodeToDelete]
      }
      return updatedComments
    })
  }

  return { comments, addComment, deleteComment }
}

export default useComments
