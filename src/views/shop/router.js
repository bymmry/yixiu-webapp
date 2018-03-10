import App from './App'
import addBrand from './shopHome/pages/addBrand.vue'
import addModel from './shopHome/pages/addModel.vue'
import addCatagory from './shopHome/pages/addCatagory.vue'
import addService from './shopHome/pages/addService.vue'
import orderList from './shopHome/pages/orderList.vue'
import publishPhone from './shopHome/pages/publishPhone.vue'
import shopRegister from './shopRegister/App.vue'

export default [{
  path: '/shopHome',
  component: App,
  children: [
    {
      path: '/:id',
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
    }
  ]
},
{
  path: '/shopRegister',
  component: addBrand
}]
