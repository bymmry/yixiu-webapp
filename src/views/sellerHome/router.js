import App from './App'
import addBrand from './pages/addBrand.vue'
import addModel from './pages/addModel.vue'
import addCatagory from './pages/addCatagory.vue'
import addService from './pages/addService.vue'
import orderList from './pages/orderList.vue'
import publishPhone from './pages/publishPhone.vue'
import orderDetail from './pages/orderDetail.vue'
import updateMsg from './pages/updateMsg.vue'
import payBail from './pages/payBail.vue'
import service from './pages/service.vue'
import addServices from './pages/addServices.vue'
import shopWallet from './pages/shopWallet.vue'
import viewServices from './pages/viewServices.vue'


export default [{
  path: '/sellerHome',
  // redirect: '/sellerHome?nickName=等到烟花清凉&gender=1&avatarUrl=https://wx.qlogo.cn/mmopen/vi_32/tLZAsMgyw4pvRYuuN2RKHDpDY12HMen3AibRegfoQNguQJjrdKqAJfdaIMgf76NJ6L7lpuViaAxdh2Z5NA69Eoiag/0&openid=oFosP5RQ-4BYlzddw8o5ON1ibctU',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/addBrand',
  component: addBrand
},
{
  path: '/addModel',
  component: addModel
},
{
  path: '/addCatagory',
  component: addCatagory
},
{
  path: '/addService',
  component: addService
},
{
  path: '/orderList/:state',
  component: orderList
},
{
  path: '/publishPhone',
  component: publishPhone
},
{
  path: '/orderDetail',
  component: orderDetail
},
{
  path: '/updateMsg',
  component: updateMsg
},
{
  path: '/payBail',
  component: payBail
},
{
  path: '/service',
  component: service
},
{
  path: '/addServices',
  component: addServices,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/shopWallet',
  component: shopWallet,
  meta: {
    keepAlive: true
  }
}, 
{
  path: '/viewServices',
  component: viewServices
}]
