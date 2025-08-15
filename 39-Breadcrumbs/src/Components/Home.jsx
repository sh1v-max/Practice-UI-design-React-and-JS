import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.products)
        const sliceTrending = res.products.slice(0, 9)
        setTrendingProducts(sliceTrending)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  // console.log(trendingProducts)

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading trending products...</p>
      </div>
    )
  }

  return (
    <div className="home-container">
      <section className="trending-section">
        <h3 className="section-title">
          Trending Products
          <span className="trending-icon">🔥</span>
        </h3>
        <div className="product-grid">
          {trendingProducts.map((product) => {
            return (
              <div key={product.id} className="product-card">
                <Link to={`/products/${product.id}`} className="product-link">
                  <div className="product-image-container">
                    <img className="product-image" src={product.thumbnail} alt={product.title} />
                    <div className="product-overlay">
                      <span>View Details</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h4 className="product-title">{product.title}</h4>
                    <p className="product-price">${product.price}</p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      <section className="cta-section">
        <Link to={'/products'}>
          <button className="btn btn-primary">
            View All Products
            <span className="btn-arrow">→</span>
          </button>
        </Link>
      </section>
    </div>
  )
}

export default Home