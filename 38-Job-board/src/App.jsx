import React, { useEffect, useState } from 'react'
import { Hello } from './Components/Hello'
import JobPosting from './Components/JobPosting'

const ITEM_PER_PAGE = 6
const API_ENDPOINT = 'https://hacker-news.firebaseio.com/v0'
// const EXAMPLE_RESPONSE = {
//   by: 'jamilbk',
//   id: 35908337,
//   score: 1,
//   time: 1683838872,
//   title: 'Firezone (YC W22) is hiring Elixir and Rust engineers',
//   type: 'job',
//   url: 'https://www.ycombinator.com/companies/firezone/jobs',
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
      <header className="header">
        <h1 className="title">Careers.com</h1>
        <div className="intro">
          <p className="intro-text">
            No endless scrolling. No boring listings. Just hand-picked roles
            that make your inner nerd (and your wallet) happy.
          </p>
        </div>

        <div className="search-filter-section">
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search jobs by title, company, or technology..."
                
              />
            </div>
            <button className="search-btn" >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              Search
            </button>
          </div>

          <div className="filter-container">
            <div className="filter-group">
              <select className="filter-select" >
                <option>All Locations</option>
                <option>Remote</option>
                <option>San Francisco</option>
                <option>New York</option>
                <option>London</option>
              </select>
            </div>

            <div className="filter-group">
              <select className="filter-select" >
                <option>All Job Types</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div className="filter-group">
              <select className="filter-select" >
                <option>All Technologies</option>
                <option>JavaScript</option>
                <option>Python</option>
                <option>React</option>
                <option>Node.js</option>
                <option>Go</option>
              </select>
            </div>

            <button className="filter-reset-btn" >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
              Reset
            </button>
          </div>
        </div>
      </header>

      {itemIds === null || items.length < 1 ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading">Loading amazing opportunities...</p>
        </div>
      ) : (
        <main>
          <div className="items" role="list">
            {items.map((item) => {
              return <JobPosting key={item.id} {...item} />
            })}
            <JobPosting />
          </div>
          <div className="load-more-container">
            <button
              className="load-more"
              onClick={() => fetchItems(currentPage + 1)}
              disabled={fetchingDetails}
            >
              {fetchingDetails ? (
                <>
                  <div className="button-spinner"></div>
                  Loading...
                </>
              ) : (
                'Load More Jobs'
              )}
            </button>
          </div>
        </main>
      )}

      <footer className="footer">
        <p>Built with ❤️ by <a href="https://github.com/sh1v-max" target="_blank" rel="noreferrer">Shiv</a></p>
      </footer>
    </div>
  )
}
