import { useEffect, useRef, useState } from 'react'
import data from './data.json'
const DATA_LENGTH = data.length
// console.log(data)

export default function ImageCarousel() {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex == DATA_LENGTH - 1) {
        return 0
      }
      return prevIndex + 1
    })
  }

  const handlePrev = () => {
    if (index === 0) {
      setIndex(DATA_LENGTH - 1)
      return
    } else {
      setIndex(index - 1)
    }
  }

  useEffect(() => {
    ref.current = setInterval(handleNext, 1000)
    return () => {
      clearInterval(ref.current)
    }
  }, [])

  return (
    <div className="carousel-wrapper">
      <div className="carousel-header">
        <h2 className="carousel-title">Image Gallery</h2>
        <p className="carousel-subtitle">Discover beautiful moments captured in time</p>
      </div>
      
      <div
        onMouseEnter={() => clearInterval(ref.current)}
        onMouseLeave={() => {ref.current = setInterval(handleNext, 1000)}}
        className="container"
      >
        <div onClick={handlePrev} className="left-btn">
          &#8249;
        </div>
        <img src={data[index].download_url} alt={`Photo by ${data[index].author}`} className="carousel-image" />
        <div onClick={handleNext} className="right-btn">
          &#8250;
        </div>
        
        <div className="carousel-info">
          <span className="image-author">Photo by {data[index].author}</span>
        </div>
      </div>
    </div>
  )
}