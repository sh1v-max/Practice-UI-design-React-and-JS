import { useEffect } from "react"

export default function Post({data, setPageNo, loading}) {
  useEffect(() => {
    const observer = new IntersectionObserver((param) => {
      console.log(param)
      if (param[0].isIntersecting && !loading) {
        observer.unobserve(lastImage)
        console.log('inside ', lastImage)
        setPageNo((pageNo) => pageNo + 1)
      }
    })

    // the last child of img-post
    const lastImage = document.querySelector('.img-post:last-child')
    // console.dir(lastImage)
    if (!lastImage) {
      return
    }
    observer.observe(lastImage)

    return () => {
      if (lastImage) {
        observer.unobserve(lastImage)
      }
      observer.disconnect()
    }
    
  }, [data, loading])
  
  return (
    <div className="container">
      <div className="gallery-grid">
        {data.map((item, index) => {
          return (
            <div key={item.id} className="img-post image-card">
              <img src={item.download_url} alt={`Photo by ${item.author}`} />
              <div className="image-overlay">
                <div className="image-info">
                  <div className="author">By {item.author}</div>
                  <div className="dimensions">{item.width} × {item.height}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <div className="loading-text">In a second...</div>
        </div>
      )}
    </div>
  )
}
