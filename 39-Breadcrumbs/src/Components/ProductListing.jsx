import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductListing = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.products)
        setProducts(res.products)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  console.log(products)

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading all products...</p>
      </div>
    )
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h2 className="page-title">All Products</h2>
        <p className="products-count">Showing {products.length} products</p>
      </div>
      
      <div className="product-grid product-grid-full">
        {products?.map((product) => {
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
                  <div className="product-details">
                    <p className="product-price">${product.price}</p>
                    <div className="product-rating">
                      <span className="rating-text">{product.rating}/5</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductListing