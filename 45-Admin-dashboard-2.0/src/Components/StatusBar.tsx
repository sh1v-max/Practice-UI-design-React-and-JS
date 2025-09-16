import React from 'react'
import wifi from '../images/dashboard/wifi.svg'
import battery from '../images/dashboard/battery.svg'
import connection from '../images/dashboard/connection.svg'

const StatusBar: React.FC = () => {
  return (
    <div className=" bg-purple-400 px-4 py-3 flex justify-between rounded-2xl">
      <span className='pl-2 font-bold'>9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <img src={wifi} alt="" />
          <img src={connection} alt="" />
        </div>
        <div className="ml-2 w-6 h-3 border border-gray-600 rounded-sm">
          <img src={battery} alt="" />
        </div>
      </div>
    </div>
  )
}

export default StatusBar
