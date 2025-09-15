import React, { useState } from 'react'
import bell from '../images/lists/bell.svg'
import edit from '../images/lists/pen.svg'
import StatusBadge from './StatusBadge.tsx'
import arrowUp from '../images/lists/arrow-angle-pointing-up-svgrepo-com.svg'
import arrowDown from '../images/lists/arrow-down-angle-svgrepo-com.svg'
import { invoices } from '../Data/mockData'

const InvoiceList: React.FC = () => {
  const [open, setOpen] = useState(true) // state to toggle invoices

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm px-3 py-1  hover:bg-gray-400 transition"
        >
          <img
            src={open ? arrowUp : arrowDown}
            alt={open ? 'Collapse' : 'Expand'}
            className="w-4 h-4"
          />
        </button>
      </div>

      {/* Invoice List */}
      {open && (
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
                  <img src={bell} alt="" className="w-5 h-5 cursor-pointer" />
                )}
                {invoice.status === 'draft' && (
                  <img src={edit} alt="" className="w-5 h-5 cursor-pointer" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InvoiceList
