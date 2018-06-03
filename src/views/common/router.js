//公共导航路由
import orders from '../orders/App'
import my from '../my/App'
import find from '../find/App'
import toShop from '../common/components/toShop';
import shopDetail from '../common/components/shopDetail';
import shop from '../common/components/shopList';
import theShopDes from '../common/components/shop';
import advert from './advert';
import surePay from '../common/components/surePay';

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
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/shop', //商店列表
    component: toShop,
    children: [
      {
        path: ":id", //商家详情
        component: shopDetail,
        meta: {
          keepAlive: true // 需要被缓存
        }
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/theShopDes',
    component: toShop,
    children: [
      {
        path: ":id", //商家详情
        component: theShopDes
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/shopContent",
    name: "shopContent",
    component: shopDetail
  },
  {
    path: "/advert",
    name: "advert",
    component: advert
  },
  {
    path: "/surePay",
    name: "surePay",
    component: surePay
  }
]
