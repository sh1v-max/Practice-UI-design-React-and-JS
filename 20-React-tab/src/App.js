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

  return <Tabs tabsData={tabsData} onChange={onTabChangeHandler} />
}
