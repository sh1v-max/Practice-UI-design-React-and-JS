import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// this creates a client that will be used by react query to store cache and other data like fetch and all
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* queryClientProvider takes queryClient as a prop which acts as client */}
    {/* this works like redux provider or context provider, yes you've used them before dummy */}
    <QueryClientProvider client ={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)

// a simple visual representation of how tanstack react query works
// QueryClient
//    |
// QueryClientProvider
//    |
// App
//    |
// BlogList / BlogDetail
//    |
// useQuery(...)