import React, { useState } from 'react'
import avatar from '../images/dashboard/avatar.svg'
import add from '../images/dashboard/add.svg'
import calender from '../images/dashboard/calender.svg'
import premium from '../images/dashboard/premium.svg'
// import ChartView from './ChartView.js'

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3Months')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-400 px-4 py-3 pb-15">
        <div className="flex items-center justify-between">
          {/* Left: Back */}
          <div className="flex items-center gap-1 text-black font-medium">
            <span className="text-2xl">&lt;</span>
            <span className="text-base">Back</span>
          </div>

          {/* Center: Dashboard */}
          <h1 className="text-lg font-semibold text-gray-900 text-center flex-1">
            Dashboard
          </h1>

          {/* Right: Profile */}
          <img
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            src={avatar}
            alt="Profile"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 bg-white space-y-6 rounded-t-[46px] -mt-10">
        {/* Create New Invoice */}
        <div className="items-center text-center">
          <div className="bg-gray-200 rounded-[46px] p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <img src={add} alt="" />
            </div>
            <h2 className="text-[28px] font-semibold text-purple-700 mb-1">
              Create New Invoice
            </h2>
            <p className="text-gray-500 text-sm">
              Start by creating and sending new invoice
            </p>
          </div>
          <p className="text-purple-600 text-xs mt-2">
            Or Upload an existing invoice and set payment reminder
          </p>
        </div>

        {/* Time Period */}
        <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-600 font-medium text-sm">Time Period</h3>
            <span className="text-gray-400 text-xs">
              dd:mm:yyyy - dd:mm:yyyy
            </span>
          </div>

          <div className="flex gap-2 mb-3">
            {['1Month', '3Months', '1Year'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1.5 rounded-[20px] text-xs font-medium border ${
                  selectedPeriod === period
                    ? 'bg-purple-100 text-purple-600 border-purple-300'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                {period === '1Month'
                  ? '1 Month'
                  : period === '3Months'
                  ? '3 Months'
                  : '1 Year'}
                {period === '1Year' && (
                  <img
                    className="w-3 h-3 inline ml-1 text-purple-600"
                    src={premium}
                    alt=""
                  />
                )}
              </button>
            ))}
          </div>

          <button className="flex items-center gap-1 text-gray-500 text-s">
            <img src={calender} alt="" />
            Custom
          </button>
        </div>

        {/* Total Earnings */}
        <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
          <h3 className="text-gray-600 font-medium text-sm mb-1">
            Total Earnings
          </h3>
          <div className="text-2xl font-bold text-purple-700">$1,25,000</div>
        </div>

        {/* Payment Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
            <h4 className="text-gray-600 font-medium text-sm mb-1">
              Payment Awaited
            </h4>
            <div className="text-xl font-bold text-purple-700">$25,000</div>
          </div>
          <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
            <h4 className="text-gray-600 font-medium text-sm mb-1">
              Payment Overdue
            </h4>
            <div className="text-xl font-bold text-purple-700">$25,000</div>
          </div>
        </div>

        {/* Chart Section (always visible) */}
        {/* <ChartView /> */}
      </div>
    </div>
  )
}

export default Dashboard
