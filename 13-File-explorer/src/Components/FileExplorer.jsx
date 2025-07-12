import React, { useState } from 'react'

const FileExplorer = ({ folderData }) => {
  const [showChildren, setShowChildren] = useState(false)
  console.log(folderData)

  const handleClick = () => {
    if (folderData.type === 'folder') {
      setShowChildren(!showChildren);
    }
  }

  return (
    <div className="node">
      <div
        className={`node-label ${folderData.type}`}
        onClick={handleClick}
      >
        {folderData.type === 'folder' ? (
          <span>{showChildren ? '📂' : '📁'}</span>
        ) : (
          <span>📄</span>
        )}
        <span className="node-name">{folderData.name}</span>
      </div>

      {showChildren && folderData.children && (
        <div className="children">
          {folderData.children.map((child, index) => (
            <FileExplorer key={index} folderData={child} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FileExplorer
