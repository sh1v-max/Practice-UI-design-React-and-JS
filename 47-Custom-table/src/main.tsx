import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { PrimeReactProvider } from 'primereact/api'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* primereactprovider enables global settings like ripple and unstyles mode */}
    <PrimeReactProvider value={{ ripple: true, unstyled: true }}>
      {/* unstyled must set to true if you're using styles other than primereact theme */}
      <App />
    </PrimeReactProvider>
  </StrictMode>
)
