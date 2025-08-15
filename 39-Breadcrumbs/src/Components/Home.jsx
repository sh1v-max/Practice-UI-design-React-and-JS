import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.products)
        const sliceTrending = res.products.slice(0, 6)
        setTrendingProducts(sliceTrending)
      })
  }, [])
  // console.log(trendingProducts)

  return (
    <div>
      <h2>Home Page</h2>
      <span>Trending Products</span>
      <div className="product-grid">
        {trendingProducts.map((product) => {
          return (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img className="product-image" src={product.thumbnail} />
                <h3>{product.title}</h3>
              </Link>
            </div>
          )
        })}
      </div>
      <Link to={'/products'}>
        <button className="btn">All Products</button>
      </Link>
    </div>
  )
}

export default Home
