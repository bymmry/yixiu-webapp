function isIphoneX(){
  return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}
function setHeight(el, binding) {
  if (binding.value !== undefined) {
    if (isIphoneX()) {
      el.style.height = `calc(${binding.value} - 34px)`
      if (window.__wxjs_environment !== 'miniprogram') {
        el.style.height = `calc(${binding.value} - 34px - 10px)`
      }
    }else{
      el.style.height = `calc(${binding.value})`
      if (window.__wxjs_environment !== 'miniprogram') {
        el.style.height = `calc(${binding.value} - 10px)`
      }
    }
  }
}
export default {
  install(Vue) {
    Vue.directive('ipxHeight', {
      inserted: setHeight,
      updated: setHeight
    })
  }
}
