const App = () => ({
  component: import ('./App')
})

export default [{
  path: '/home',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]
