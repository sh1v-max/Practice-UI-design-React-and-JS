import React from 'react'
import bell from '../images/lists/bell.svg'
import edit from '../images/lists/pen.svg'
import StatusBadge from './StatusBadge.tsx'
import { invoices } from '../Data/mockData'

const InvoiceList: React.FC = () => {
  console.log(invoices)
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoices</h2>
      {/* Invoice List */}
      <div className="space-y-[10px]">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="bg-gray-200 rounded-[26px] p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{invoice.client}</h3>
              <p className="text-sm text-gray-500">
                ₹{invoice.amount.toLocaleString()}, Due: {invoice.due}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={invoice.status} />
              {(invoice.status === 'overdue' ||
                invoice.status === 'awaited') && (
                <img src={bell} alt="" className='w-5 h-5 cursor-pointer'/>
              )}
              {invoice.status === 'draft' && (
                <img src={edit} alt="" className='w-5 h-5 cursor-pointer'/>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InvoiceList
