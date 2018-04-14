import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home/router'
import common from '../views/common/router'
import my from '../views/my/router'
import find from '../views/find/router'
import expressDetails from '../views/expressDetails/router'
import login from '../views/login/router'
import position from '../views/position/router'
import register from '../views/register/router'
import businessRegister from '../views/businessRegister/router'
import RetrievePwd from '../views/retrievePwd/router'
import SellerHome from '../views/sellerHome/router'
import phoneArrondi from '../views/phoneArrondi/router'
import orders from '../views/orders/router'
import App from '../App'
import teaching from '../views/teaching/router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/yixiuwebapp/',
  routes: [
    {
      path: '/',
      redirect:'/home',
      // component: App
    },
    {
      path: "/pay",
      redirect: '/orders'
    },
    ...home,
    ...common,
    ...my,
    ...find,
    ...position,
    ...login,
    ...register,
    ...businessRegister,
    ...RetrievePwd,
    ...SellerHome,
    ...phoneArrondi,
    ...orders,
    ...expressDetails,
    ...teaching
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
