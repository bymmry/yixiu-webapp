import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home/router'
import common from '../views/common/router'
import my from '../views/my/router'
import find from '../views/find/router'
import login from '../views/login/router'
import position from '../views/position/router'
import register from '../views/register/router'
import businessRegister from '../views/businessRegister/router'
import RetrievePwd from '../views/retrievePwd/router'
import SellerHome from '../views/sellerHome/router'
import AddType from '../views/addType/router'
import phoneArrondi from '../views/phoneArrondi/router'

Vue.use(Router)
export default new Router({
  base: '/webapp/',
  routes: [
    {
      path: '/',
      redirect:'/home?nickName=等到烟花清凉&gender=1&avatarUrl=https://wx.qlogo.cn/mmopen/vi_32/tLZAsMgyw4pvRYuuN2RKHDpDY12HMen3AibRegfoQNguQJjrdKqAJfdaIMgf76NJ6L7lpuViaAxdh2Z5NA69Eoiag/0&openid=oFosP5RQ-4BYlzddw8o5ON1ibctU'
      // redirect:'/home'
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
    ...AddType,
    ...phoneArrondi
  ]
})
