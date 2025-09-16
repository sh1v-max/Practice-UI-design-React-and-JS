import { useState } from "react";
import add from '../images/dashboard/add.svg'
import calender from '../images/dashboard/calender.svg'
import premium from '../images/dashboard/premium.svg'
import InvoiceChart from './InvoiceChart.tsx'
import InvoiceList from './InvoiceList.tsx'

const Main: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3Months')
  return(
    
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
      <p className="text-purple-600 text-xs mt-2 cursor-pointer hover:underline">
        Or Upload an existing invoice and set payment reminder
      </p>
    </div>

    {/* Time Period */}
    <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-600 font-medium text-[15px]">Time Period</h3>
        <span className="text-gray-400 text-[15px]">
          dd:mm:yyyy - dd:mm:yyyy
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        {['1Month', '3Months', '1Year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-1.5 rounded-[20px] text-[15px] font-medium border ${
              selectedPeriod === period
                ? 'bg-purple-100 text-purple-600 border-purple-300'
                : 'bg-gray-50 text-gray-600 border-gray-200'
            }`}
          >
            {period === '1Month'
              ? '1Month'
              : period === '3Months'
              ? '3Months'
              : '1Year'}
            {period === '1Year' && (
              <img
                className="w-6 inline ml-1 text-purple-600"
                src={premium}
                alt=""
              />
            )}
          </button>
        ))}
      </div>

      <button className="flex items-center gap-1 text-gray-500 text-s">
        <img src={calender} alt="" />
        <span className="text-[15px]">Custom</span>
      </button>
    </div>

    {/* Total Earnings */}
    <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
      <h3 className="text-gray-600 font-medium text-[15px] mb-1">
        Total Earnings
      </h3>
      <div className="text-2xl font-bold text-purple-700">$1,25,000</div>
    </div>

    {/* Payment Status */}
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
        <h4 className="text-gray-600 font-medium text-[15px] mb-1">
          Payment Awaited
        </h4>
        <div className="text-xl font-bold text-purple-700">$25,000</div>
      </div>
      <div className="bg-gray-200 rounded-[26px] p-4 shadow-sm">
        <h4 className="text-gray-600 font-medium text-[15px] mb-1">
          Payment Overdue
        </h4>
        <div className="text-xl font-bold text-purple-700">$25,000</div>
      </div>
    </div>

    {/* Chart Section (always visible) */}
    <InvoiceChart />
    <InvoiceList />
  </div>
  )

}

export default Main
