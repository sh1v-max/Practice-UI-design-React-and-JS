import React, { useRef, useState } from 'react'

const ToastContainer = () => {
  // const [show, setShow] = useState()
  const [toasts, setToasts] = useState([])
  const timesRef = useRef({})
  console.log(timesRef)
  const handleClose = (id) => {
    clearInterval(timesRef.current[id])
    delete timesRef.current[id]
    setToasts((prevToasts) => {
      const filteredArray = prevToasts.filter((toast) => {
        return toast.id !== id
      })
      return filteredArray
    })
  }
  const handleAdd = (message, type) => {
    const id = new Date().getTime() // Unique ID for each toast
    const newToasts = [...toasts, { id, message, type }]
    setToasts(newToasts)
    timesRef.current[id] = setTimeout(() => {
      handleClose(id)
    }, 6000)
  }

  return (
    <div className="container">
      <div className="toast-container">
        {toasts.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}>x</span>
            </div>
          )
        })}
      </div>
      <div className="btn-container">
        <button
          className="success-btn"
          onClick={() => handleAdd('Success', 'success')}
        >
          Success Toast
        </button>
        <button className="info-btn" onClick={() => handleAdd('Info', 'info')}>
          Info Toast
        </button>
        <button
          className="warning-btn"
          onClick={() => handleAdd('Warning', 'warning')}
        >
          Warning Toast
        </button>
        <button
          className="error-btn"
          onClick={() => handleAdd('Error', 'error')}
        >
          Error Toast
        </button>
      </div>
    </div>
  )
}

export default ToastContainer
