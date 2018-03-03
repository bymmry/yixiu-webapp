import App from './App'

export default [{
  path: '/position',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]
