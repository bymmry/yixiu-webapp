import teaching from './App'

export default[
  {
    path: '/teaching', //
    component: teaching,
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
