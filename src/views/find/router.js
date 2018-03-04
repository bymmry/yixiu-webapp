//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import App from './App'

export default [{
  path: '/find',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]
