import { configureStore } from '@reduxjs/toolkit'
import billReducer from './modules/billSlice'

export default configureStore({
  reducer: {
    bill: billReducer
  }
})
