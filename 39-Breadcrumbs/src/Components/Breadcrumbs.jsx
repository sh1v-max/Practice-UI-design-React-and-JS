import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const { pathname } = useLocation()
  // console.log(pathname)
  const pathnames = pathname.split('/').filter((x) => x)
  // console.log(pathnames)
  let breadcrumbPath = ''

  const formatBreadcrumbName = (name) => {
    // check for product oid
    if (!isNaN(name)) {
      return `Product #${name}`
    }
    // format the name
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[-_]/g, ' ')
  }

  return (
    <nav className="breadcrumb-nav">
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-item breadcrumb-home">
          Home
        </Link>
        
        {pathnames.map((name, index) => {
          breadcrumbPath += `/${name}`
          const isLast = index === pathnames.length - 1
          const displayName = formatBreadcrumbName(name)
          
          return (
            <React.Fragment key={breadcrumbPath}>
              <span className="breadcrumb-separator">›</span>
              {isLast ? (
                <span className="breadcrumb-item breadcrumb-current">
                  {displayName}
                </span>
              ) : (
                <Link to={breadcrumbPath} className="breadcrumb-item breadcrumb-link">
                  {displayName}
                </Link>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </nav>
  )
}

export default Breadcrumbs