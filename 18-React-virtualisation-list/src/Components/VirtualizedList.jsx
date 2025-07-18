import React, { useState } from 'react'

const VirtualizedList = ({ list, height, width, itemHeight }) => {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)])
  // every time indices change, stare trigger re-render and 
  // visibleList will be updated based on new indices
  const visibleList = list.slice(indices[0], indices[1] + 1)
  const handleScroll = (e) => {
    // this is similar to sliding window concept
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
      style={{ height, width, overflow: 'auto' }}
    >
      {/* giving parent div a full height for scrolling */}
      <div style={{ height: list.length * itemHeight, position: 'relative' }}>
        {visibleList.map((item, index) => {
          return (
            <div
              key={item}
              className="item"
              style={{
                height: itemHeight,
                position: 'absolute',
                top: (indices[0] + index) * itemHeight,
                width: '100%',
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