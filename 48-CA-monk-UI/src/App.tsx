import { useQuery } from '@tanstack/react-query'
import { Button } from './components/ui/button'
import './App.css'

function App() {
  useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      return res.json()
    },
  })

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button onClick={() => console.log("clicked")} >Click Me</Button>
      </div>
    </>
  )
}

export default App
