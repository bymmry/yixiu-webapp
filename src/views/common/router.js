//公共导航路由

import orders from '../orders/App'
import my from '../my/App'
import find from '../find/App'

export default [{
  path: '/orders',
  component: orders,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/my',
  component: my,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/find',
  component: find,
  meta: {
    keepAlive: true // 需要被缓存
  }
}
]
