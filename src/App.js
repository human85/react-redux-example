import logo from './logo.svg'
import './App.css'
// 导入 actions
import { increment, decrement, incrementByAmount } from './store/modules/counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchChannelList } from './store/modules/channelSlice'

function App() {
  const { count } = useSelector(state => state.counter)
  const { channelList } = useSelector(state => state.channel)
  const dispatch = useDispatch()

  useEffect(() => {
    let ignore = false

    if (ignore) return
    dispatch(fetchChannelList())

    return () => (ignore = true)
  }, [dispatch])

  return (
    <div className="App">
      <ul>
        {channelList.map(channel => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>

      <button onClick={() => dispatch(increment())}>+1</button>
      {count}
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  )
}

export default App
