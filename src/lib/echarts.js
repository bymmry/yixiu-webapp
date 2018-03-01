import ECharts from 'vue-echarts/components/ECharts.vue'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/toolTip'
import 'echarts/lib/component/dataZoom'

// 注册组件后即可使用
export default {
  install(Vue) {
    Vue.component('echarts', ECharts)
  }
}
