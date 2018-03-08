import App from './App'
import phoneDetail from './pages/phoneDetail.vue'

export default [{
  path: '/phoneArrondi',
  component: App
},
{
  path: '/phoneDetail/:id',
  component: phoneDetail
}]
