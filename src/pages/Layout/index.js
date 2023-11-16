import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { BillOutline, CalculatorOutline, AddCircleOutline } from 'antd-mobile-icons'
import { useEffect, useState } from 'react'
import { BillListProvider } from './BillListContext'

function Layout() {
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
        <BillListProvider>
          <Outlet />
        </BillListProvider>
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

// function billListReducer(billList, action) {
//   switch (action.type) {
//     case 'replace_list': {
//       return action.data
//     }
//     default: {
//       throw Error('未知 action: ' + action.type)
//     }
//   }
// }
