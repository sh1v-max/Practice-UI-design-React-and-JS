import { useEffect, useRef, useState } from 'react'
import data from './data.json'
const DATA_LENGTH = data.length
console.log(data)

export default function ImageCarousel() {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)
  // console.log(ref)
  let intervalId
  // console.log(intervalId + ' on rerender') // it's value will be undefined when rerender
  // so, we will use useRef

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex == DATA_LENGTH - 1) {
        return 0
      }
      return prevIndex + 1
    })

    // if (index === DATA_LENGTH - 1) {
    //   setIndex(0)
    //   return
    // } else {
    //   setIndex(index + 1)
    // }
  }
  // it is forming closure with index having initial value of 0 forever
  // so its all because of closure, we need to use functional update to fix this

  const handlePrev = () => {
    if (index === 0) {
      setIndex(DATA_LENGTH - 1)
      return
    } else {
      setIndex(index - 1)
    }
  }

  // it will only work once when the component mounts
  useEffect(() => {
    ref.current = setInterval(handleNext, 1000)
    console.log(intervalId + ' inside fn')
    return () => {
      clearInterval(ref.current)
    }
  }, [])
  // we are passing callback, and that callback is using state "index"
  // and that state is only referencing to 0 every time, so it will only work once
  // it is forming closure when mount with index having initial value of 0 forever
  // so its all because of closure, we need to use functional update to fix this

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
