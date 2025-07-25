import React, { useState, useEffect } from 'react';

const Tabs = ({ tabsData, onChange }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__container">
        {tabsData.map((item, index) => {
          return (
            <button
              key={index}
              className={`tab-button ${currentTabIndex === index ? 'active' : ''}`}
              onClick={() => {
                setCurrentTabIndex(index)
                onChange(index)
              }}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
      <div className="tabs__content">{tabsData[currentTabIndex].content}</div>
    </div>
  )
}

export default Tabs
