import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {
  const {id} = useParams()
  // useParams helps us access params from url
  const [product, setProduct] = useState(null)
  console.log(id)

    useEffect(() => {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setProduct(res)
        })
    }, [])
    console.log(product)
  
  
  return (
    <div>
      <h2>Product-details</h2>
      {product ? (
        <div className="product-details">
          {/* <h2>{product.title}</h2> */}
          <img className="product-image" src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <h3>Price: ${product.price}</h3>
          <p>Rating: {product.rating}/5 ⭐</p>
          <p>{product.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductDetails