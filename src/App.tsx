import './App.css'
import { observer } from 'mobx-react-lite'
import { Counter } from './models'

const counter = new Counter({});
const App = observer(() => {
  return (
    <>
      <h1>Count: ${counter.count}</h1>
      <button onClick={() => counter.increment()}>click me</button>
    </>
  )
})

export default App
