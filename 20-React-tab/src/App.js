import InvoiceTab from './Components/InvoiceTab'
import ProfileTab from './Components/ProfileTab'
import SettingsTab from './Components/SettingsTab'
import DashboardTab from './Components/DashboardTab'
import Tabs from './Components/Tabs'
import './styles.css'
import { useState } from 'react'
import { User, BarChart3, Settings, FileText, Bell, Save, Search, Calendar, DollarSign, TrendingUp, Eye, EyeOff } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState(0)

  const tabsData = [
    {
      label: 'Profile',
      icon: User,
      content: <ProfileTab />,
    },
    {
      label: 'Dashboard',
      icon: BarChart3,
      content: <DashboardTab />,
    },
    {
      label: 'Settings',
      icon: Settings,
      content: <SettingsTab />,
    },
    {
      label: 'Invoice',
      icon: FileText,
      content: <InvoiceTab />,
    },
  ]

  const onTabChangeHandler = (index) => {
    setCurrentTab(index);
    console.log(`Switched to ${tabsData[index].label} tab`);
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">My Dashboard</h1>
        <p className="app-subtitle">Manage your account and business operations</p>
      </div>
      <Tabs tabsData={tabsData} onChange={onTabChangeHandler} />
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #111;
          color: #fff;
          min-height: 100vh;
          padding: 20px;
        }

        .app {
          max-width: 1000px;
          margin: 0 auto;
        }

        .app-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .app-title {
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }

        .app-subtitle {
          font-size: 16px;
          color: #999;
          font-weight: 400;
        }

        .tabs {
          background: #222;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        .tabs__container {
          display: flex;
          background: #333;
          border-bottom: 1px solid #444;
        }

        .tab-button {
          flex: 1;
          padding: 15px 20px;
          background: transparent;
          border: none;
          color: #ccc;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          border-right: 1px solid #444;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-button:last-child {
          border-right: none;
        }

        .tab-button:hover {
          color: #fff;
          background: #444;
        }

        .tab-button.active {
          color: #fff;
          background: #555;
          border-bottom: 3px solid #66b3ff;
        }

        .tabs__content {
          background: #222;
          min-height: 400px;
          padding: 0;
        }

        /* Profile Styles */
        .profile-content {
          padding: 30px;
        }

        .profile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #66b3ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
        }

        .edit-btn {
          background: #66b3ff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: #ccc;
          font-size: 14px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          background: #333;
          border: 1px solid #444;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
        }

        .form-group input:disabled,
        .form-group textarea:disabled {
          background: #2a2a2a;
          opacity: 0.7;
        }

        .form-group textarea {
          height: 80px;
          resize: vertical;
        }

        .save-btn {
          background: #4ade80;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Dashboard Styles */
        .dashboard-content {
          padding: 30px;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: #333;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 30px;
          gap: 10px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: #fff;
          flex: 1;
          outline: none;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: #333;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #66b3ff;
        }

        .stat-value {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }

        .stat-label {
          color: #999;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
        }

        .stat-change.positive {
          color: #4ade80;
        }

        .stat-change.negative {
          color: #ef4444;
        }

        .recent-activity h3 {
          margin-bottom: 15px;
          color: #fff;
        }

        .task-list {
          background: #333;
          border-radius: 8px;
          padding: 20px;
        }

        .task-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid #444;
        }

        .task-item:last-child {
          border-bottom: none;
        }

        .task-item.completed {
          opacity: 0.6;
          text-decoration: line-through;
        }

        /* Settings Styles */
        .settings-content {
          padding: 30px;
        }

        .settings-section {
          margin-bottom: 40px;
        }

        .settings-section h3 {
          margin-bottom: 20px;
          color: #fff;
          padding-bottom: 10px;
          border-bottom: 1px solid #444;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 0;
          border-bottom: 1px solid #333;
        }

        .setting-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .setting-name {
          font-weight: 500;
          margin-bottom: 3px;
        }

        .setting-desc {
          font-size: 14px;
          color: #999;
        }

        .toggle {
          position: relative;
          width: 50px;
          height: 24px;
        }

        .toggle input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #444;
          border-radius: 24px;
          transition: 0.2s;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          border-radius: 50%;
          transition: 0.2s;
        }

        input:checked + .slider {
          background-color: #66b3ff;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .password-input {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-toggle {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          color: #ccc;
          cursor: pointer;
        }

        .change-password-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 15px;
        }

        /* Invoice Styles */
        .invoice-content {
          padding: 30px;
        }

        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .invoice-filters {
          display: flex;
          gap: 10px;
        }

        .filter-btn {
          background: #333;
          color: #ccc;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-btn.active,
        .filter-btn:hover {
          background: #66b3ff;
          color: #fff;
        }

        .new-invoice-btn {
          background: #4ade80;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }

        .invoice-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .summary-card {
          background: #333;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .summary-value {
          font-size: 24px;
          font-weight: bold;
        }

        .summary-label {
          color: #999;
          font-size: 14px;
        }

        .invoice-table {
          background: #333;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 120px 1fr 120px 100px 120px;
          gap: 20px;
          padding: 15px 20px;
          background: #444;
          font-weight: 600;
          border-bottom: 1px solid #555;
        }

        .table-row {
          display: grid;
          grid-template-columns: 120px 1fr 120px 100px 120px;
          gap: 20px;
          padding: 15px 20px;
          border-bottom: 1px solid #444;
          align-items: center;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .invoice-id {
          font-family: monospace;
          color: #66b3ff;
        }

        .amount {
          font-weight: 600;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          color: black;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal {
          background: #333;
          padding: 30px;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
        }

        .modal h3 {
          margin-bottom: 15px;
        }

        .modal button {
          background: #66b3ff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .table-header,
          .table-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          
          .invoice-filters {
            flex-wrap: wrap;
          }
          
          .invoice-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
