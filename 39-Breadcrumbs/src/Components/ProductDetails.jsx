import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const ProductDetails = () => {
  const {id} = useParams()
  // useParams helps us access params from url
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(id)

    useEffect(() => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setProduct(res)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }, [id])
    console.log(product)
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>
    )
  }
  
  return (
    <div className="product-details-container">
      <div className="product-details-header">
        <h2 className="page-title">Product Details</h2>
      </div>
      
      <div className="product-details">
        <div className="product-details-image">
          <img 
            className="product-image-large" 
            src={product.thumbnail} 
            alt={product.title} 
          />
          {product.images && product.images.length > 1 && (
            <div className="product-gallery">
              {product.images.slice(0, 4).map((image, index) => (
                <img 
                  key={index} 
                  className="gallery-thumbnail" 
                  src={image} 
                  alt={`${product.title} ${index + 1}`} 
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>
          
          <div className="product-meta">
            <div className="product-price-section">
              <span className="product-price-large">${product.price}</span>
              {product.discountPercentage && (
                <span className="product-discount">
                  -{product.discountPercentage}% OFF
                </span>
              )}
            </div>
            
            <div className="product-rating-section">
              <div className="rating-stars-large">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="rating-text-large">{product.rating}/5</span>
            </div>
          </div>

          <div className="product-description-section">
            <h3>Description</h3>
            <p className="product-description">{product.description}</p>
          </div>

          <div className="product-additional-info">
            {product.brand && (
              <div className="info-item">
                <span className="info-label">Brand:</span>
                <span className="info-value">{product.brand}</span>
              </div>
            )}
            {product.category && (
              <div className="info-item">
                <span className="info-label">Category:</span>
                <span className="info-value">{product.category}</span>
              </div>
            )}
            {product.stock && (
              <div className="info-item">
                <span className="info-label">Stock:</span>
                <span className="info-value">{product.stock} units available</span>
              </div>
            )}
          </div>

          <div className="product-actions">
            <button className="btn btn-primary btn-large">
              Add to Cart
            </button>
            <Link to="/products" className="btn btn-secondary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails