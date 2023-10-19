import { useMemo } from 'react'
import dayjs from 'dayjs'

function useGroup(list = [], format) {
  return useMemo(() => {
    let group = {}

    // 数据是异步获取的，初次渲染 billList 为空数组
    if (list.length === 0) return group

    list.forEach(bill => {
      const key = dayjs(bill.date).format(format)
      if (group[key]) {
        group[key].push(bill)
      } else {
        group[key] = [bill]
      }
    })

    return group
  }, [list, format])
}

export default useGroup
