import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductListing = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.products)
        setProducts(res.products)
      })
  }, [])
  console.log(products)

  return (
    <div>
      <h2>Product Listing</h2>
      <div className="product-grid">
        {products?.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img className="product-image" src={product.thumbnail} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <p>{product.rating}/5 ⭐</p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductListing
