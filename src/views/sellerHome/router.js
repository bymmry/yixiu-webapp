import App from './App'
import addBrand from './pages/addBrand.vue'
import addModel from './pages/addModel.vue'
import addCatagory from './pages/addCatagory.vue'
import addService from './pages/addService.vue'
import orderList from './pages/orderList.vue'
import publishPhone from './pages/publishPhone.vue'

export default [{
  path: '/sellerHome',
  component: App
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
}]
