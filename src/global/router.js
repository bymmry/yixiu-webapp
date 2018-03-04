import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home/router'
import common from '../views/common/router'
import my from '../views/my/router'
import find from '../views/find/router'
import login from '../views/login/router'
import search from '../views/search/router'
import position from '../views/position/router'
import register from '../views/register/router'
import businessLogin from '../views/businessLogin/router'
import RetrievePwd from '../views/retrievePwd/router'
import SellerHome from '../views/sellerHome/router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    ...home,
    ...common,
    ...my,
    ...find,
    ...position,
    ...login,
    ...register,
    ...search,
    ...businessLogin,
    ...RetrievePwd,
    ...SellerHome
  ]
})
