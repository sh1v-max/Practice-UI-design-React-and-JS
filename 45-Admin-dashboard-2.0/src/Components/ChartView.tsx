import React from 'react'
import { ChevronLeft } from 'lucide-react'
import avatar from '../images/dashboard/avatar.svg'
// import IncomeChart from './IncomeChart';

interface ChartViewProps {
  onBack: () => void
  onViewInvoices: () => void
}

const ChartView: React.FC<ChartViewProps> = ({ onBack, onViewInvoices }) => {
  return (
    <div className="min-h-screen bg-gray-50">

      <div className="p-4">
        {/* <IncomeChart /> */}

        <button
          onClick={onViewInvoices}
          className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg font-medium"
        >
          View Invoice List
        </button>
      </div>
    </div>  
  )
}

export default ChartView
