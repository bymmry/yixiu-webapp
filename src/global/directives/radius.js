function setRadius(el, binding) {
  if (binding.value !== undefined) {
    el.style.radius = binding.value
  }
}
export default {
  install(Vue) {
    Vue.directive('radius', {
      inserted: setRadius,
      updated: setRadius
    })
  }
}
