import App from './App'
import phoneDetail from './pages/phoneDetail.vue'
import phoneList from './pages/phoneList.vue'

export default [{
  path: '/phoneArrondi',
  component: App,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/phoneDetail',
  component: phoneDetail,
  meta: {
    keepAlive: true // 需要被缓存
  }
}, 
{
  path: '/phoneList/:id',
  component: phoneList,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]
