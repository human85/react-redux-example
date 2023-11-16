import { useEffect, useState } from 'react'
import { NavBar, DatePicker } from 'antd-mobile'
import DailyBill from './components/DailyBill'
import cn from 'classnames'
import './index.scss'
import dayjs from 'dayjs'
import useGroup from './hooks/useGroup'
import useOverview from './hooks/useOverview'
import { useBillList, useBillListDispatch } from '../Layout/BillListContext'
import { getBillListApi } from '@/api/bill'

export default function Month() {
  const billList = useBillList()
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState(() => {
    return dayjs('2023-03').format('YYYY | MM')
  })

  const billListDispatch = useBillListDispatch()

  useEffect(() => {
    async function getBillList() {
      const { data } = await getBillListApi()
      if (!ignore) {
        billListDispatch({
          type: 'replaced',
          data
        })
      }
    }

    let ignore = false
    getBillList()

    return () => {
      ignore = true
    }
  }, [billListDispatch])

  async function getBillList() {
    const { data } = await getBillListApi()
    billListDispatch({
      type: 'replaced',
      data
    })
  }

  // 按月份划分的账单组
  const billGroup = useGroup(billList, 'YYYY | MM')

  // 当前月账单
  const currentMonthList = billGroup[date]
  // 月度收支预览
  const monthOverview = useOverview(currentMonthList)

  // 当前月按日分组的账单列表
  const dailyGroup = useGroup(currentMonthList, 'MM月DD日')

  function handleConfirm(date) {
    setDate(dayjs(date).format('YYYY | MM'))
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{date}月账单</span>
            <span className={cn('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthOverview.expences.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthOverview.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthOverview.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            onClose={() => setDateVisible(false)}
            onConfirm={handleConfirm}
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
          />
        </div>
        {/* 每日账单 */}
        {Object.keys(dailyGroup).map(key => (
          <DailyBill key={key} dailyBillList={dailyGroup[key]} date={key} />
        ))}
      </div>
    </div>
  )
}
