import React from 'react'

const JobPosting = ({ url, title, by, time }) => {
  const formattedTime = new Date(time * 1000).toLocaleString()
  console.log(formattedTime)

  // Calculate time ago
  const getTimeAgo = (timestamp) => {
    const now = Date.now()
    const posted = timestamp * 1000
    const diffInMinutes = Math.floor((now - posted) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <article className="post" role="listitem">
      <div className="post-header">
        <h2 className="post-title">
          <a
            className={url ? 'post-link' : 'post-link inactive-link'}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {title || 'Untitled Job Posting'}
          </a>
        </h2>
        {!url && <span className="no-link-badge">No Link</span>}
      </div>
      
      <div className="post-meta">
        <div className="post-author">
          <span className="author-label">Posted by</span>
          <span className="author-name">{by || 'Anonymous'}</span>
        </div>
        <div className="post-time">
          <span className="time-ago">{time ? getTimeAgo(time) : 'Unknown time'}</span>
          <span className="full-date">{time ? formattedTime : 'No date available'}</span>
        </div>
      </div>

      <div className="post-actions">
        {url && (
          <span className="apply-hint">
            Click title to view job details →
          </span>
        )}
      </div>
    </article>
  )
}

export default JobPosting