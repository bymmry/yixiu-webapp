import App from './App'
import phoneDetail from './pages/phoneDetail.vue'
import phoneList from './pages/phoneList.vue'
import toMore from './pages/toMore.vue'
import order from './pages/order.vue'
import coupon from './pages/coupon.vue'
import shopCar from './pages/shopCar.vue'

export default [{
  path: '/phoneArrondi',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/phoneDetail',
  component: phoneDetail
}, 
{
  path: '/phoneList/:id',
  component: phoneList
}, 
{
  path: '/toMore',
  component: toMore
},
{
  path: '/order',
  component: order
},
{
  path: '/coupon',
  component: coupon
},
{
  path: '/shopCar',
  component: shopCar
}]
