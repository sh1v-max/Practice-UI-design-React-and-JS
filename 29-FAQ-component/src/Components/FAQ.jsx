import React from 'react'
import { useState } from 'react';
import QnA from './QnA';

const FAQ = ({data}) => {
  const [showIndex, setShowIndex] = useState(-1);
  
  const handleQnA = (index) => {
    setShowIndex((prevIndex) => {
      if (prevIndex === index) {
        return -1;
      }
      return index;
    });
  };

  const expandAll = () => {
    setShowIndex(-2); // Special value to show all
  };

  const collapseAll = () => {
    setShowIndex(-1);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">Find answers to common questions below</p>
        <div className="faq-controls">
          <button className="control-btn" onClick={expandAll}>Expand All</button>
          <button className="control-btn" onClick={collapseAll}>Collapse All</button>
        </div>
      </div>
      
      <div className="faq-list">
        {data.faqs.map((qna, index) => {
          return (
            <QnA
              key={index}
              qna={qna}
              showAns={index === showIndex || showIndex === -2}
              handleQnA={() => handleQnA(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FAQ