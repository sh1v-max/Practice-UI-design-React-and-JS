import React, { useState } from 'react'

const VirtualizedList = ({ list, height, width, itemHeight }) => {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)])
  // every time indices change, stare trigger re-render and 
  // visibleList will be updated based on new indices
  const visibleList = list.slice(indices[0], indices[1] + 1)
  const handleScroll = (e) => {
    const {scrollTop} = e.target
    console.log(scrollTop)
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex = newStartIndex + Math.floor(height / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  }

  return (
    <div
      className="container"
      onScroll={handleScroll}
      style={{ height, width, background: 'grey', overflow: 'auto' }}
    >
      <div style={{ height: list.length * itemHeight, position: 'relative' }}>
        {visibleList.map((item, index) => {
          return (
            <div
              className="item"
              style={{
                height: itemHeight,
                background: 'coral',
                borderTop: '5px solid grey',
                position: 'absolute',
                top: (indices[0] + index) * itemHeight,
                width: '100%',
                textAlign: 'center',
                // color: 'whitesmoke',
              }}
            >
              {'Item ' + item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VirtualizedList
