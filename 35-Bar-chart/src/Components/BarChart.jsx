import React from 'react'

const BarChart = ({ data, yAxis }) => {
  if (!data || !yAxis) {
    return <div className="no-data">No data available</div>
  }

  return (
    <div className="bar-chart-container">
      <div className="chart-box">
        <div className="y-axis-container">
          {yAxis.map((val, index) => (
            <div key={index} className="y-axis-tick">
              <span>{val}</span>
            </div>
          ))}
        </div>
        <div className="bars-container">
          {Object.entries(data).map(([key, val]) => (
            <div className="bar-wrapper" key={key}>
              <div 
                className="bar" 
                style={{ height: `${val}%` }}
                data-value={val}
                title={`Number ${key}: ${val} occurrences`}
              />
              <div className="x-axis-label">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarChart