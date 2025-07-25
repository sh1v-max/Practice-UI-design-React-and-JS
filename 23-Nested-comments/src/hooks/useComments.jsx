import React, { useState } from 'react'

const useComments = (commentsData) => {
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
      // creating to queue to store the updated comments
      const queue = [id]
      while(queue.length > 0){
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