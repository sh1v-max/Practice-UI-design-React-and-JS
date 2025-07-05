export default function Pagination({ pageNo, setPageNo }) {
  const prevThreeNoArr = Array.from(
    { length: 3 },
    (_, index) => pageNo - 1 - index
  ).filter((value) => value > 0).reverse()

  const nextFourNoArr = Array.from(
    { length: 4 }, 
    (_, index) => pageNo + index
  )
  
  const paginationArray = [...prevThreeNoArr, ...nextFourNoArr]

  const handleNext = () => {
    setPageNo(pageNo + 1)
  }

  const handlePrev = () => {
    if (pageNo > 1) setPageNo(pageNo - 1)
  }

  return (
    <div className="pagination-wrapper">
      <div className="pagination-container">
        {/* Previous Button */}
        {pageNo > 1 && (
          <button
            onClick={handlePrev}
            className="nav-btn prev-btn"
          >
            <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Page Numbers */}
        <div className="page-numbers">
          {paginationArray.map((page) => (
            <button
              key={page}
              onClick={() => setPageNo(page)}
              className={`page-btn ${page === pageNo ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="nav-btn next-btn"
        >
          <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}