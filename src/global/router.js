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
  base: '/webapp/',
  routes: [
    {
      path: '/',
      redirect:'/home?userInfo=%7BavatarUrl%3D%22https%3A%2F%2Fwx.qlogo.cn%2Fmmopen%2Fvi_32%2FtLZAsMgyw4pvRYuuN2RKHDpDY12HMen3AibRegfoQNguQJjrdKqAJfdaIMgf76NJ6L7lpuViaAxdh2Z5NA69Eoiag%2F0%22&city=%22Liangping%22&country=%22China%22&gender=1&language=%22zh_CN%22&nickName=%22%E7%AD%89%E5%88%B0%E7%83%9F%E8%8A%B1%E6%B8%85%E5%87%89%22&province=%22Chongqing%22%7D&openid=%22oFosP5RQ-4BYlzddw8o5ON1ibctU%22'
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
