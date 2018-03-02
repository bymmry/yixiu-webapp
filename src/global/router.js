import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home/router'
import orders from '../views/common/router'
import my from '../views/my/router'
import find from '../views/find/router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    ...home,
    ...orders,
    ...my,
    ...find
  ]
})
