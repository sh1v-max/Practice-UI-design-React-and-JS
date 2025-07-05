import { useEffect, useState } from 'react'
import Pagination from './Pagination'

// Post Component
export default function Post() {
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(5)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=8`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [pageNo])

  const downloadImage = (id, filename) => {
    const downloadUrl = `https://picsum.photos/id/${id}/2000/3000.jpg`
  
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    link.target = '_blank'
  
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  
    console.log('Download initiated for:', filename)
  }
  

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <h1 className="title">WallHeaven</h1>
        <p className="subtitle">
        WallHeaven — A gallery so good, even your screen gets jealous, Handle with care
        </p>
      </div>

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
                  animationDelay: `${index * 0.1}s`,
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
                  <p className="image-dimensions">
                    {item.width} × {item.height}
                  </p>
                </div>
                <button
                  className="download-btn"
                  onClick={() =>
                    downloadImage(
                      item.id,
                      `${item.author}-${item.id}.jpg`
                    )
                  }
                  title="Download Image"
                >
                  <svg
                    className="download-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination pageNo={pageNo} setPageNo={setPageNo} />
    </div>
  )
}
