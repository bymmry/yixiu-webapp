//公共导航路由
import orders from '../orders/App'
import my from '../my/App'
import find from '../find/App'
import toShop from '../common/components/toShop';
import shopDetail from '../common/components/shopDetail';
import shop from '../common/components/shopList';

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
    path: '/shop', //商店列表
    component: shop,
  },
  {
    path: '/shop', //商店列表
    component: toShop,
    children: [
      {
        path: ":id", //商家详情
        component: shopDetail
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
