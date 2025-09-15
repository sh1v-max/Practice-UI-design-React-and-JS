import { useState } from 'react'
import './App.css'
import Dashboard from './Components/Dashboard'

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  console.log(currentScreen)
  // 0: dashboard, 1: chart view, 2: invoice list

  return (
    <>
      <Dashboard
        onViewChart={() => setCurrentScreen(1)}
        onViewInvoices={() => setCurrentScreen(2)}
      />
    </>
  )
}

export default App
