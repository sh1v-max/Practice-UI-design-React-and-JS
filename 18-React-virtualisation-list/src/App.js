import VirtualizedList from './Components/VirtualizedList'
import './styles.css'

const LIST = Array.from({ length: 10000 }, (_, i) => i + 1)
// console.log(LIST)

export default function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">React Virtualization Demo</h1>
        <p className="app-description">
          A simple virtualized list implementation that efficiently renders 10,000 items 
          by only displaying visible elements in the viewport. Scroll to see the magic!
        </p>
      </div>
      
      <div className="virtualized-container">
        <VirtualizedList 
          list={LIST} 
          height={400} 
          width={300} 
          itemHeight={35} 
        />
      </div>
    </div>
  )
}