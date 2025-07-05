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

        {pageNo > 1 && (
          <button
            onClick={handlePrev}
            className="nav-btn prev-btn"
          >
            {'<'}
          </button>
        )}

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

        <button
          onClick={handleNext}
          className="nav-btn next-btn"
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}