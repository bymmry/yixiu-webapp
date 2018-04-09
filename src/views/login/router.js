import App from './App'
import forget from './page/forget'

export default [{
  path: '/login',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/forget',
  component: forget,
  meta: {
    keepAlive: true // 需要被缓存
  }
}
]
