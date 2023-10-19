import { createSlice } from '@reduxjs/toolkit'
import { getBillListApi } from '@/api/bill'

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    billList: []
  },
  reducers: {
    setBillList: (state, action) => {
      state.billList = action.payload
    }
  }
})
export const { setBillList } = billSlice.actions

// 异步 action creator
export function getBillList() {
  // 利用 Promise.resolve() 返回一个 Promise, 以便 useEffect 中的 cleanup 函数生效
  return Promise.resolve(async dispatch => {
    const { data } = await getBillListApi()
    dispatch(setBillList(data))
  })
}

export default billSlice.reducer
