import React, { useState } from 'react'
import {Calendar, DollarSign} from 'lucide-react';

const InvoiceTab = () => {
  const [invoices] = useState([
    { id: 'INV-001', client: 'Acme Corp', amount: 1250.00, status: 'Paid', date: '2024-01-15' },
    { id: 'INV-002', client: 'Tech Solutions', amount: 2750.50, status: 'Pending', date: '2024-01-20' },
    { id: 'INV-003', client: 'Design Studio', amount: 890.25, status: 'Overdue', date: '2024-01-10' },
    { id: 'INV-004', client: 'StartupXYZ', amount: 3200.00, status: 'Draft', date: '2024-01-25' }
  ]);

  const [filter, setFilter] = useState('All');
  const [newInvoice, setNewInvoice] = useState(false);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return '#4ade80';
      case 'Pending': return '#fbbf24';
      case 'Overdue': return '#ef4444';
      case 'Draft': return '#94a3b8';
      default: return '#94a3b8';
    }
  };

  const filteredInvoices = filter === 'All' ? invoices : invoices.filter(inv => inv.status === filter);
  
  return (
    <div className="invoice-content">
      <div className="invoice-header">
        <div className="invoice-filters">
          {['All', 'Paid', 'Pending', 'Overdue', 'Draft'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
        <button className="new-invoice-btn" onClick={() => setNewInvoice(true)}>
          + New Invoice
        </button>
      </div>

      <div className="invoice-summary">
        <div className="summary-card">
          <DollarSign size={20} />
          <div>
            <div className="summary-value">$8,090.75</div>
            <div className="summary-label">Total Revenue</div>
          </div>
        </div>
        <div className="summary-card">
          <Calendar size={20} />
          <div>
            <div className="summary-value">3</div>
            <div className="summary-label">Pending Invoices</div>
          </div>
        </div>
      </div>

      <div className="invoice-table">
        <div className="table-header">
          <div>Invoice ID</div>
          <div>Client</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Date</div>
        </div>
        {filteredInvoices.map(invoice => (
          <div key={invoice.id} className="table-row">
            <div className="invoice-id">{invoice.id}</div>
            <div>{invoice.client}</div>
            <div className="amount">${invoice.amount.toFixed(2)}</div>
            <div>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(invoice.status) }}
              >
                {invoice.status}
              </span>
            </div>
            <div>{invoice.date}</div>
          </div>
        ))}
      </div>

      {newInvoice && (
        <div className="modal-overlay" onClick={() => setNewInvoice(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Create New Invoice</h3>
            <p>Invoice creation form would go here...</p>
            <button onClick={() => setNewInvoice(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceTab