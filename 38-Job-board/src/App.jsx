import React, { useEffect, useState } from 'react'
import { Hello } from './Components/Hello'
import JobPosting from './Components/JobPosting'

const ITEM_PER_PAGE = 6
const API_ENDPOINT = 'https://hacker-news.firebaseio.com/v0'
const EXAMPLE_RESPONSE = {
  by: 'jamilbk',
  id: 35908337,
  score: 1,
  time: 1683838872,
  title: 'Firezone (YC W22) is hiring Elixir and Rust engineers',
  type: 'job',
  url: 'https://www.ycombinator.com/companies/firezone/jobs',
}

// function JobPosting({ url, title, by, time }) {
//   const formattedTime = new Date(time * 1000).toLocaleString()
//   console.log(formattedTime)

//   return (
//     <div className="post" role="listItem">
//       <h2>
//         <a
//           className={url ? '' : 'inactiveLink'}
//           href={url}
//           target="_blank"
//           rel="noopener"
//         >
//           {title}
//         </a>
//       </h2>
//       <span>
//         {' '}
//         By {by} on {formattedTime}
//       </span>
//     </div>
//   )
// }

export const App = () => {
  const [items, setItems] = useState([])
  const [itemIds, setItemIds] = useState(null)
  const [fetchingDetails, setFetchingDetails] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const fetchItems = async (currPage) => {
    setCurrentPage(currPage)
    setFetchingDetails(true)

    let itemsList = itemIds
    if (itemsList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`)
      if (!response.ok) {
        throw new Error('Failed to fetch job postings')
      }
      itemsList = await response.json()
      setItemIds(itemsList)
    }
    // console.log(itemsList)
    const itemIdForPage = itemsList.slice(
      currPage * ITEM_PER_PAGE,
      currPage * ITEM_PER_PAGE + ITEM_PER_PAGE
    )

    const itemsForPage = await Promise.all(
      itemIdForPage.map((itemId) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) => res.json())
      )
    )
    setItems([...items, ...itemsForPage])
    setFetchingDetails(false)
  }

  useEffect(() => {
    if (currentPage === 0) {
      fetchItems(currentPage)
    }
  }, [])

  return (
    <div className="app">
      <h1 className="title">Hacker News Job Board</h1>
      {itemIds === null || items.length < 1 ? (
        <p className="loading">Loading...</p>
      ) : (
        <div>
          <div className="items" role="list">
            {items.map((item) => {
              return <JobPosting key={item.id} {...item} />
            })}
            <JobPosting />
          </div>
          <button
            className="load-more"
            onClick={() => fetchItems(currentPage + 1)}
            disabled={fetchingDetails}
          >
            {fetchingDetails ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  )
}
