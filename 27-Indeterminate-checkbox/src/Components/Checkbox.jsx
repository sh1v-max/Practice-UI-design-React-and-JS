import React, { useEffect, useRef } from 'react'
import { STATUS } from './Constants/constants'

const Checkbox = ({id, label, status, handleChange}) => {
  // console.log(status)
  // when accessing dom, use ref
  const checkboxRef = useRef()
  useEffect(() => {
    if (status === STATUS.INDETERMINATE) {
      checkboxRef.current.indeterminate = true
    } else {
      checkboxRef.current.indeterminate = false
    }
  }, [status])

  return (
    <div>
      {/* indeterminate state is not HTML property, we need js */}
      <input
        ref={checkboxRef}
        type="checkbox"
        onChange={() => handleChange(id)}
        checked={status === STATUS.CHECKED}
      />
      <label htmlFor="">{label}</label>
    </div>
  )
}

export default Checkbox
