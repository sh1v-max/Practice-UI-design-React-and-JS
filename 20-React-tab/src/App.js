import InvoiceTab from './Components/InvoiceTab'
import ProfileTab from './Components/ProfileTab'
import SettingsTab from './Components/SettingsTab'
import DashboardTab from './Components/DashboardTab'
import Tabs from './Components/Tabs'
import './styles.css'
import { useState } from 'react'
import { User, BarChart3, Settings, FileText} from 'lucide-react';

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
    </div>
  );
}
