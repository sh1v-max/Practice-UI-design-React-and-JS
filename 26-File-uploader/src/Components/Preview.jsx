import React from 'react'

const Preview = ({ fileDetail, onRemove }) => {
  console.log(fileDetail)
  
  // Check if file is PDF
  const isPDF = fileDetail.type === 'application/pdf'
  
  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="file-preview">
      {isPDF ? (
        <div className="file-icon pdf-icon">
          <span>PDF</span>
        </div>
      ) : (
        <img
          className="thumbnail"
          src={URL.createObjectURL(fileDetail)}
          alt={fileDetail.name}
        />
      )}
      <div className='file-info'>
        <span className="file-name">{fileDetail.name}</span>
        <div className="file-details">
          <span className="file-size">{formatFileSize(fileDetail.size)}</span>
          <span className="file-type">{isPDF ? 'PDF Document' : 'Image'}</span>
        </div>
      </div>
      <button onClick={() => onRemove(fileDetail.name)} className='remove-btn'>×</button>
    </div>
  )
}

export default Preview