//公共导航路由

import orders from '../orders/App'
import my from '../my/App'
import find from '../find/App'
import shopList from '../common/components/shopList';
import shopDetail from '../common/components/shopDetail';

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
},
  {
    path: '/shopList', //商店列表
    component: shopList,
    children: [
      {
        path: "/shopList/1", //商家详情
        component: shopDetail
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
