import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from './Pagination'

export default function Post() {
  const [data, setData] = useState([])
  console.log(data)

  // useEffect(() => {
  //   axios
  //     .get('https://picsum.photos/v2/list?page=7&limit=5')
  //     .then((res) => setData(res.data))
  // }, [])

  // Alternative fetch method using fetch API, you can use either
  useEffect(() => {
    fetch('https://picsum.photos/v2/list?page=7&limit=5')
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      setData(res)
    })
  }, [])

  return (
    <div className="container">
      <div className="post-container">
        {data.map((item, index) => {
          return <img src={item.download_url} alt="" />
        })}
      </div>
      <Pagination />
    </div>
  )
}
