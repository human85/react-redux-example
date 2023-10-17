import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counterSlice'
import channelReducer from './modules/channelSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer
  }
})
