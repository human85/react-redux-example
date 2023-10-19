import { Navigate, createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import { Suspense, lazy } from 'react'
import Month from '@/pages/Month'
import { Toast } from 'antd-mobile'

const New = lazy(() => import('@/pages/New'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/month" replace />
      },
      {
        path: 'month',
        element: <Month />
      },
      {
        path: 'year',
        lazy: () => import('@/pages/Year'),
        loader: () => {
          Toast.show('持续开发中...')
          return setTimeout(() => {
            return router.navigate('/')
          }, 1000)
        }
      }
    ]
  },
  {
    path: '/new',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <New />
      </Suspense>
    )
  }
])

export default router
