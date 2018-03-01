import ajaxLib from './lib/ajax'
const ajax = ajaxLib.ajax
class Api {
  //hello world
  static async hello() {
    return ajax.get('/hello')
  }
}
export default {
  install(Vue) {
    Vue.prototype.$api = Api
  }
}
