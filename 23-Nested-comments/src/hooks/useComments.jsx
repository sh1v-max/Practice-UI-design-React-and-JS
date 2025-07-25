import { useState } from 'react'

const useComments = (commentsData) => {
  const [comments, setComments] = useState(commentsData.comments)

  // Add a comment
  const addComment = (value, parentId) => {
    const newId = Date.now()
    const newComment = { 
      id: newId, 
      value, 
      parentId, 
      children: [],
      createdAt: new Date().toISOString(),
      author: 'currentUser',
      votes: 1
    }
    
    setComments((prevComments) => {
      const updatedComments = { ...prevComments, [newId]: newComment }
      
      // Add to parent's children array
      if (updatedComments[parentId]) {
        updatedComments[parentId] = {
          ...updatedComments[parentId],
          children: [...updatedComments[parentId].children, newId]
        }
      }
      
      return updatedComments
    })
  }

  // Delete a comment and all its children
  const deleteComment = (id) => {
    setComments((prevComments) => {
      const updatedComments = { ...prevComments }
      const commentToDelete = updatedComments[id]
      
      if (!commentToDelete) return prevComments
      
      const parentId = commentToDelete.parentId
      
      // Remove from parent's children array
      if (updatedComments[parentId]) {
        updatedComments[parentId] = {
          ...updatedComments[parentId],
          children: updatedComments[parentId].children.filter(
            (childId) => childId !== id
          )
        }
      }
      
      // Delete the comment and all its children recursively
      const deleteRecursively = (commentId) => {
        const comment = updatedComments[commentId]
        if (comment && comment.children) {
          comment.children.forEach(deleteRecursively)
        }
        delete updatedComments[commentId]
      }
      
      deleteRecursively(id)
      return updatedComments
    })
  }

  // Get comment count
  const getCommentCount = () => {
    return Object.keys(comments).length - 1 // Subtract 1 for root comment
  }

  // Get nested comment count for a specific comment
  const getNestedCount = (commentId) => {
    const comment = comments[commentId]
    if (!comment || !comment.children) return 0
    
    let count = comment.children.length
    comment.children.forEach(childId => {
      count += getNestedCount(childId)
    })
    
    return count
  }

  return { 
    comments, 
    addComment, 
    deleteComment, 
    getCommentCount,
    getNestedCount 
  }
}

export default useComments