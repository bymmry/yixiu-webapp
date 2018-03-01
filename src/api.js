import ajaxLib from './lib/ajax'
const ajax = ajaxLib.ajax
class Api {
  //hello world
  static async hello() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello world!')
      }, 1000)
    })
    return promise
  }
}
export default {
  install(Vue) {
    Vue.prototype.$api = Api
  }
}
