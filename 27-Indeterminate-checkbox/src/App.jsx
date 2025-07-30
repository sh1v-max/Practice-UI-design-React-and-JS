import React, { useState } from 'react'
import data from './Components/Data/data'
import IndeterminateCheckbox from './Components/IndeterminateCheckbox'
import { STATUS } from './Components/Constants/constants'

export const App = () => {
  const [checkboxState, setCheckBoxState] = useState(data)

  const computeStatus = (node) => {
    if (!node.children || !node.children.length > 0) {
      return
    }
    let checkedCount = 0
    let uncheckedCount = 0
    let indeterminateCount = 0
    node.children.map((child) => {
      if (child.status === STATUS.CHECKED) checkedCount++
      if (child.status === STATUS.UNCHECKED) uncheckedCount++
      if (child.status === STATUS.INDETERMINATE) indeterminateCount++
    })
    if (checkedCount === node.children.length) {
      node.status = STATUS.CHECKED
    } else if (uncheckedCount === node.children.length) {
      node.status = STATUS.UNCHECKED
    } else if (checkedCount > 0 || indeterminateCount > 0) {
      node.status = STATUS.INDETERMINATE
    }
  }
  const traverse = (targetId, node, isDescendent, ancestorStatus) => {
    if (node.id === targetId) {
      if (node.status === STATUS.CHECKED) {
        node.status = STATUS.UNCHECKED
      } else {
        node.status = STATUS.CHECKED
      }
    }
    if (isDescendent) {
      node.status = ancestorStatus
    }
    if (node.children && node.children.length > 0) {
      node.children.map((child) => {
        traverse(
          targetId,
          child,
          node.id === targetId || isDescendent,
          node.status
        )
      })
    }
    computeStatus(node)
  }

  const handleChange = (targetId) => {
    console.log(targetId)
    // deep cloning, because we've nested children
    const cloneCheckboxState = JSON.parse(JSON.stringify(checkboxState))
    // we've 3 root nodes here
    cloneCheckboxState.map((rootNode) => {
      traverse(targetId, rootNode)
    })

    setCheckBoxState(cloneCheckboxState)
  }

  return (
    <div>
      <h1>Indeterminate Checkbox</h1>
      <IndeterminateCheckbox
        handleChange={handleChange}
        checkboxData={checkboxState}
      />
    </div>
  )
}
