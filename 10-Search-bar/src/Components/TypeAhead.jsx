import { useEffect, useState } from 'react'

export default function TypeAhead() {
  const [query, setQuery] = useState('')
  useEffect(() => {
    const fetchDate = async () => {
      const res = await fetch(
        'https://dummyjson.com/products/search?q=a&limit=0'
      )
      console.log(res)
    }
    fetchDate()
  }, [query])

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
