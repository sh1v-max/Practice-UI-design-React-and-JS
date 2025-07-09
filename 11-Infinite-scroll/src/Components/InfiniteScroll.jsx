import { useEffect, useState } from 'react'
import Post from './Post'

export default function InfiniteScroll() {
  const [data, setData] = useState([])
  console.log(data)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // to show loading until you get the data
    setLoading(true)
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
      .then((res) => res.json())
      .then((arr) => {
        setData((oldData) => [...oldData, ...arr])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [pageNo])

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">Keep Scrolling</h1>
      </div>
      <Post data={data} setPageNo={setPageNo} loading={loading} />
    </div>
  )
}
