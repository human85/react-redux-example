import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { BillOutline, CalculatorOutline, AddCircleOutline } from 'antd-mobile-icons'
import './index.scss'
import { getBillList } from '@/store/modules/billSlice'
import useData from '@/hooks/useData'
import { useEffect, useState } from 'react'

function Layout() {
  // 获取账单列表数据
  useData(getBillList)

  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState('month')
  const location = useLocation()

  // 监听路径变化改变 NavBar 高亮选项
  useEffect(() => {
    setActiveKey(location.pathname.slice(1))
  }, [location])

  const tabs = [
    {
      key: 'month',
      title: '月度账单',
      icon: <BillOutline />
    },
    {
      key: 'new',
      title: '记账',
      icon: <AddCircleOutline />
    },
    {
      key: 'year',
      title: '年度账单',
      icon: <CalculatorOutline />
    }
  ]

  function switchRoute(path) {
    navigate(path)
    setActiveKey(path)
  }

  return (
    <div className="layout">
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <TabBar activeKey={activeKey} onChange={switchRoute}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </footer>
    </div>
  )
}

export default Layout
