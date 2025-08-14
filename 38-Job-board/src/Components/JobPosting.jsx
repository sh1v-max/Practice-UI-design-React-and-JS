import React from 'react'

const JobPosting = ({ url, title, by, time }) => {
  const formattedTime = new Date(time * 1000).toLocaleString()
  console.log(formattedTime)

  return (
    <div className="post" role="listItem">
      <h2>
        <a
          className={url ? '' : 'inactiveLink'}
          href={url}
          target="_blank"
          rel="noopener"
        >
          {title}
        </a>
      </h2>
      <span>
        {' '}
        By {by} on {formattedTime}
      </span>
    </div>
  )
}

export default JobPosting
