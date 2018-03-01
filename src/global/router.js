import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home/router'
import orders from '../views/common/router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    ...home,
    ...orders
  ]
})
