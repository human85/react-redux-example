import { createSlice } from '@reduxjs/toolkit'

const channelSlice = createSlice({
  name: 'channel',
  initialState: {
    channelList: []
  },
  reducers: {
    setChannelList: (state, actions) => {
      state.channelList = actions.payload
    }
  }
})

export const { setChannelList } = channelSlice.actions

export const fetchChannelList = () => {
  return async dispatch => {
    const res = await fetch('https://geek.itheima.net/v1_0/channels')
    const { data } = await res.json()
    dispatch(setChannelList(data.channels))
  }
}

export default channelSlice.reducer
