import { Button, DatePicker, Input, NavBar, Toast } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import cn from 'classnames'
import { billListData } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { saveBillApi } from '@/api/bill'
import dayjs from 'dayjs'

function New() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('pay')
  const [money, setMoney] = useState(0) // 金额
  const [useFor, setUseFor] = useState('') // 用途
  const [visible, setVisible] = useState(false) // 控制时间选择器可见性
  const [date, setDate] = useState(() => new Date())
  const displayDate = useMemo(() => {
    return dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD') ? '今天' : dayjs(date).format('YYYY-MM-DD')
  }, [date])

  async function saveBill() {
    if (!useFor || !money) return Toast.show('请选择用途并输入金额')

    await saveBillApi({
      type: category,
      money: category === 'pay' ? -money : +money,
      date: new Date(),
      useFor
    })
    Toast.show('保存成功')
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button onClick={() => setCategory('pay')} shape="rounded" className={cn(category === 'pay' && 'selected')}>
            支出
          </Button>
          <Button
            onClick={() => setCategory('income')}
            className={cn(category === 'income' && 'selected')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={() => setVisible(true)}>
              <Icon type="calendar" className="icon" />
              <span className="text">{displayDate}</span>
              <DatePicker className="kaDate" title="记账日期" max={new Date()} />
            </div>
            <div className="kaInput">
              <Input
                value={money}
                onChange={value => setMoney(+value)}
                className="input"
                placeholder="0.00"
                type="number"
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[category].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={cn('item', item.type === useFor && 'selected')}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>

      {/* 时间选择器 */}
      <DatePicker
        title="时间选择"
        visible={visible}
        onClose={() => setVisible(false)}
        max={new Date()}
        onConfirm={val => setDate(val)}
      />
    </div>
  )
}

export default New
