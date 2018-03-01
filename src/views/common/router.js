//公共导航路由

import orders from '../orders/App'

export default [{
  path: '/orders',
  component: orders,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]
