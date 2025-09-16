import React from 'react'
import { chartData } from '../Data/mockData'

const IncomeChart: React.FC = () => {
  const maxIncome = Math.max(...chartData.map((d) => d.income))

  return (
    <div className="bg-gray-200 rounded-[26px] p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Income Trend</h3>
      <p className="text-sm text-gray-500 mb-12">
        Your monthly income and growth for the last 6 months.
      </p>

      <div className="relative h-64 flex items-end justify-between">
        {/* Y-axis labels */}
        <div className="absolute left-0 -top-8 h-full flex flex-col justify-between text-[15px] text-gray-500">
          <span>$8k</span>
          <span>$6k</span>
          <span>$4k</span>
          <span>$2k</span>
          <span>$0k</span>
        </div>

        {/* Right Y-axis labels */}
        <div className="absolute right-0 -top-8 h-full flex flex-col justify-between text-[15px] text-gray-500">
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
          <span>-50%</span>
          <span>-100%</span>
        </div>

        {/* Chart area */}
        <div className="flex-1 mx-8 h-full flex items-end justify-between relative">
          {/* Income bars */}
          {chartData.map((data, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative"
              style={{ zIndex: 2 }}
            >
              <div
                className="w-10 bg-purple-600 rounded-lg"
                style={{ height: `${(data.income / maxIncome) * 180}px` }}
              />
              <span className="text-[15px] text-gray-500 mt-5">{data.month}</span>
            </div>
          ))}

          {/* Growth line */}
          <svg
            className="absolute inset-0 w-full h-full "
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <polyline
              fill="none"
              stroke="#991B1B"
              strokeWidth="1"
              points={chartData
                .map((d, i) => {
                  const x = (i / (chartData.length - 1)) * 100
                  const y = 100 - ((d.growth + 100) / 200) * 100
                  return `${x},${y}`
                })
                .join(' ')}
            />
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-4 bg-purple-600"></div>
          <span className="text-[18px] text-purple-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-red-800 rounded-full"></div>
          <span className="text-[18px] text-red-800">MomGrowth</span>
        </div>
      </div>
    </div>
  )
}

export default IncomeChart
