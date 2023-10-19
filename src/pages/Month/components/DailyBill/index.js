import cn from 'classnames'
import './index.scss'
import useOverview from '@/pages/Month/hooks/useOverview'
import { typeToNameMap } from '@/constants'
import { memo, useState } from 'react'
import Icon from '@/components/Icon'

const DailyBill = memo(({ dailyBillList, date }) => {
  const dailyOverview = useOverview(dailyBillList)
  const [dailyBillListVisible, setDailyBillListVisible] = useState(true)

  return (
    <div className={cn('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span
            onClick={() => setDailyBillListVisible(!dailyBillListVisible)}
            className={cn('arrow', dailyBillListVisible || 'expand')}
          ></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyOverview.expences.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dailyOverview.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dailyOverview.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
      {/* 单日列表 */}
      <div className={cn('billList', dailyBillListVisible || 'hidden')}>
        {dailyBillList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <div className="detail">
                <div className="billType">
                  <Icon type={item.useFor} />
                  {typeToNameMap[item.useFor]}
                </div>
              </div>
              <div className={cn('money', item.type)}>{item.money.toFixed(2)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

export default DailyBill
