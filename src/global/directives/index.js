import shadow from './shadow'
import radius from './radius'
import color from './color'
import ipxHeight from './ipxHeight'


export default {
  install(Vue) {
    Vue.use(shadow)
    Vue.use(radius)
    Vue.use(ipxHeight)
    Vue.use(color, {
      test: {
        base: '#cccccc'
      }
    })
  }
}
