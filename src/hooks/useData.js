import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

/**
 * @description 根据 action 发送请求获取数据
 * @param {*} actionCreator
 *  */
function useData(actionCreator) {
  const dispatch = useDispatch()
  useEffect(() => {
    async function startDispatch() {
      const action = await actionCreator()
      if (!ignore) {
        dispatch(action)
      }
    }

    let ignore = false
    startDispatch()

    return () => (ignore = true)
  }, [actionCreator, dispatch])
}

export default useData
