import { useState } from 'react'

export default function StarRating({ starCount = 5 }) {
  const [starValue, setStarValue] = useState()
  // console.log(starValue)
  const [hoverValue, setHoveValue] = useState(0)
  console.log(hoverValue)

  return (
    <div className="container">
      {new Array(starCount).fill(0).map((value, index) => {
        return (
          <span
            key={index}
            className={
              (hoverValue == 0 && index < starValue) || index < hoverValue
                ? 'gold'
                : 'grey'
            }
            onClick={() => setStarValue(index + 1)}
            onMouseEnter={() => setHoveValue(index + 1)}
            onMouseLeave={() => setHoveValue(0)}
          >
            &#9733;
          </span>
        )
      })}
    </div>
  )
}
