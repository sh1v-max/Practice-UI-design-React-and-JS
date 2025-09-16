import React from 'react'
import wifi from '../images/dashboard/wifi.svg'
import battery from '../images/dashboard/battery.svg'
import connection from '../images/dashboard/connection.svg'

const StatusBar: React.FC = () => {
  return (
    <div className="bg-purple-400 px-10 py-3 flex justify-between rounded-t-2xl">
      <span className="font-bold text-[18px]">9:41</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-2">
          <img className="w-6 h-6" src={wifi} alt="" />
          <img className="w-6 h-6" src={connection} alt="" />
          <img className="w-8" src={battery} alt="" />
        </div>
      </div>
    </div>
  )
}

export default StatusBar
