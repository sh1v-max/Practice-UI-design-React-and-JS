import React, { useState } from 'react'
import Preview from './Preview'

export const FileUploader = () => {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf'
      if (!isValidType) {
        alert(`${file.name} is not supported. Only images and PDF files are allowed.`)
      }
      return isValidType
    })
    setFiles([...files, ...validFiles])
  }
  const removeFile = (fileName) => {
    const filteredFiles = files.filter((file) => file.name !== fileName)
    setFiles(filteredFiles)
  }
  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    // we'll get file in "dataTransfer.files"
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/') || file.type === 'application/pdf'
      if (!isValidType) {
        alert(`${file.name} is not supported. Only images and PDF files are allowed.`)
      }
      return isValidType
    })
    setFiles([...files, ...validFiles])
  }

  return (
    <div className="file-uploader">
      {/* Instructions */}
      <div className="instructions">
        <h2>Upload Your Files</h2>
        <p>Supported files types: jpg, jpeg, png, pdf</p>
      </div> 

      {/* drag and drop zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
      >
        <div className="dropzone-icon">📁</div>
        <p>Drag and Drop files here or</p>
        <input
          onChange={handleChange}
          type="file"
          multiple
          accept="image/*,.pdf"
          className="hidden-input"
          id="file-input"
        />
        <label className="browse-btn" htmlFor="file-input">
          Browse Files
        </label>
      </div>

      {/* File count */}
      {files.length > 0 && (
        <div className="file-count">
          {files.length} file{files.length > 1 ? 's' : ''} selected
        </div>
      )}

      {/* Preview zone */}
      <div className="preview-container">
        {files.map((file) => {
          return (
            <Preview key={file.name} fileDetail={file} onRemove={removeFile} />
          )
        })}
      </div>
    </div>
  )
}