import React from 'react'
import Footer from './footer.tsx'
import Header from './Header.tsx'
import StatusBar from './StatusBar.tsx'
import Main from './Main.tsx'

const Dashboard: React.FC = () => {
  return (
    <div className='bg-white min-h-screen '>
      <div className="min-h-screen w-full md:w-[500px] border-2 border-gray-300 rounded-t-2xl rounded-b-[46px] mx-auto">
        {/* Header */}
        <StatusBar />
        <Header />
        {/* Main Content */}
        <Main />
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
