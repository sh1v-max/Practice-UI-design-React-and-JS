import VirtualizedList from './Components/VirtualizedList'
import './styles.css'

const LIST = Array.from({ length: 10000 }, (_, i) => i + 1)
// console.log(LIST)

export default function App() {
  return (
    <VirtualizedList 
      list={LIST} 
      height={400} 
      width={300} 
      itemHeight={35} 
    />
  )
}
