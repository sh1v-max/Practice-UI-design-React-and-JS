import { use, useEffect, useRef, useState } from 'react'

const STATE = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function TypeAhead() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  // handling all types of states using only one status state
  const [status, setStatus] = useState(STATE.LOADING)
  // console.log(result)
  // we will store data in this cache
  const cache = useRef({})
  // console.log(cache)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController
    const fetchDate = async () => {
      try {
        setStatus(STATE.LOADING)
        if (cache.current[query]) {
          console.log('from cache')
          setResult(cache.current[query])
          setStatus(STATE.SUCCESS)
          return
        }
        console.log('from api')
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal }
        )
        const data = await res.json()
        // console.log(data)
        setStatus(STATE.SUCCESS)
        cache.current[query] = data.products
        setResult(data.products)
      } catch (error) {
        // because abortController gives its own error
        if (error.name !== 'AbortError') {
          setStatus(STATE.ERROR)
        }
      }
    }
    const timerId = setTimeout(fetchDate, 1000)
    return () => {
      clearTimeout(timerId)
      abortController.abort()
    }
  }, [query])

  return (
    <div className="typeahead-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="typeahead-input"
        placeholder="Search for products..."
      />
      {status === STATE.LOADING && <p className="typeahead-status status-loading">Loading...</p>}
      {status === STATE.ERROR && <p className="typeahead-status status-error">Something went wrong...</p>}
      {status === STATE.SUCCESS && (
        <ul className="typeahead-results">
          {result.map((item) => (
            <li key={item.id} className="typeahead-item">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-title">{item.title}</h3>
                <div className="product-meta">
                  <span className="product-price">${item.price}</span>
                  <span className="product-category">{item.category}</span>
                  <span className="product-rating">{item.rating.toFixed(1)}</span>
                  <span className="product-stock">{item.stock} in stock</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}