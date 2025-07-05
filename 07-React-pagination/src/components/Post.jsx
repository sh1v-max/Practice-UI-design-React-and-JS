
import { useEffect, useState } from 'react'
import Pagination from './Pagination'

// Post Component
export default function Post() {
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(5)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=20`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [pageNo])

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1 className="title">Gallery Explorer</h1>
        <p className="subtitle">Discover beautiful images from around the world</p>
      </div>

      {/* Image Gallery */}
      <div className="gallery-wrapper">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="gallery-grid">
            {data.map((item, index) => (
              <div 
                key={item.id} 
                className="image-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="image-overlay"></div>
                <img 
                  src={item.download_url} 
                  alt={`Photo by ${item.author}`}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="image-info">
                  <p className="author-name">{item.author}</p>
                  <p className="image-dimensions">{item.width} × {item.height}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  )
}