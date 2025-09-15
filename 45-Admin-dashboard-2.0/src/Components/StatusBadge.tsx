import React from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200 cursor-pointer';
      case 'unpaid':
        return 'bg-gray-100 text-gray-600 border-gray-200 cursor-pointer';
      case 'disputed':
        return 'bg-red-100 text-red-800 border-red-200 cursor-pointer';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200 cursor-pointer';
      case 'partially-paid':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 cursor-pointer';
      case 'awaited':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 cursor-pointer';
      case 'draft':
        return 'bg-gray-100 text-gray-600 border-gray-200 cursor-pointer';
      case 'update':
        return 'bg-purple-500 text-white border-purple-500 cursor-pointer';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200 cursor-pointer';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'update':
        return 'Update Status';
      case 'unpaid':
        return 'Unpaid';
      case 'disputed':
        return 'Disputed';
      case 'paid':
        return 'Paid';
      case 'partially-paid':
        return 'Partially Paid';
      case 'overdue':
        return 'Overdue';
      case 'awaited':
        return 'Awaited';
      case 'draft':
        return 'Draft';
      default:
        return status;
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
      {getStatusText(status)}
    </span>
  );
};

export default StatusBadge;