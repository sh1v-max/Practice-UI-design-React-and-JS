import React from 'react'
import { Hello } from './Components/Hello'
import Sidebar from './Components/Sidebar/Sidebar'
import Dashboard from './Components/Dashboard/Dashboard'

export const App = () => {
  return (
    <div className='grid gap-4 p-4 grid-cols-[220px_1fr]'>
      {/* <Hello/> */}
      <Sidebar />
      <Dashboard />
    </div>
  )
}
