import Tabs from './Components/Tabs'
import './styles.css'

const tabsData = [
  {
    label: 'Profile',
    content: <div>Profile Info Content</div>,
  },
  {
    label: 'Dashboard',
    content: <div>Dashboard Content</div>,
  },
  {
    label: 'Settings',
    content: <div>Settings Content</div>,
  },
  {
    label: 'Invoice',
    content: <div>Invoice Content</div>,
  },
]

export default function App() {
  const onTabChangeHandler = (index) => {
    console.log('Tab Changed')
  }

  return (
    <div className="App">
      <div className="app-header">
        <h1 className="app-title">My Dashboard</h1>
        <p className="app-subtitle">Manage your account and settings</p>
      </div>
      <Tabs tabsData={tabsData} onChange={onTabChangeHandler} />
    </div>
  )}
