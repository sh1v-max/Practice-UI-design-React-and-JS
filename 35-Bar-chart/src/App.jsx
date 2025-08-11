import React, { useEffect, useState } from 'react'
import { Hello } from './Components/Hello'
import BarChart from './Components/BarChart'

export const App = () => {
  const [freq, setFreq] = useState(undefined)
  const [yAxis, setYAxis] = useState(undefined)
  const [loading, setLoading] = useState(false)

  const fetchNumber = async () => {
    setLoading(true)
    try {
      const url =
        'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'
      const res = await fetch(url)
      let data = await res.text()
      data = data.split('\n').filter(Boolean)
      // creating a map and storing data in it
      const map = {}
      data?.forEach((item) => {
        if (map[item]) {
          map[item] = map[item] + 1
        } else {
          map[item] = 1
        }
      })
      setFreq(map)
      console.log(freq)
      // console.log(map)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // creating y axis
  useEffect(() => {
    if (freq) {
      const max = Math.max(...Object.values(freq))
      const maxVal = Math.ceil(max / 10) * 10
      // this will get the max value
      // console.log(maxVal)
      let arr = []
      for (let i = maxVal / 10; i >= 0; i--) {
        arr.push(i * 10)
      }
      setYAxis(arr)
      // console.log(arr)
    }
  }, [freq])
  console.log('freq: ' + yAxis)
  // now, we've got the y axis and the data, time to plot

  useEffect(() => {
    fetchNumber()
  }, [])

  const handleRefresh = () => {
    fetchNumber()
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="app-title">Bar Chart Visualizer</h1>
        <p className="app-description">
        </p>
        <button className="refresh-btn" onClick={handleRefresh} disabled={loading}>
          {loading ? 'Loading...' : 'Generate New Data'}
        </button>
      </div>
      
      <div className="container">
        <div className="chart-wrapper">
          <h2 className="chart-title"></h2>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Fetching next data...</p>
            </div>
          ) : (
            <div className="box">
              <div
                className="box-y-axis"
                style={{ height: `${yAxis && yAxis[0]}%` }}
              >
                {yAxis?.map((val, index) => (
                  <div key={index} className="y-axis-label">
                    <span>{val}</span>
                  </div>
                ))}
              </div>
              {freq &&
                Object.entries(freq)?.map(([key, val]) => (
                  <div className="box-x-axis" key={key}>
                    <div 
                      style={{ height: `${val}%` }} 
                      className="graph"
                      data-value={val}
                    ></div>
                    <div className="index">
                      {key}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="footer">
        <p>Built with React • by <a href="https://github.com/sh1v-max" target='_blank'>Shiv</a></p>
      </div>
    </div>
  )
}