import React from 'react'
import AccountsToggle from './AccountsToggle'
import Search from './Search'

const Sidebar = () => {
  return (
    <div>
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        {/* main sidebar content */}
        <AccountsToggle/>
        <Search/>
      </div>
      {/* plain toggle */}
    </div>
  )
}

export default Sidebar
