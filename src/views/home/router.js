//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import App from './App'
import location from './pages/location.vue'

export default [{
  path: '/home',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/location',
  component: location,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]
