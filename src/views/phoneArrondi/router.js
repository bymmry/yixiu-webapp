import App from './App'
import phoneDetail from './pages/phoneDetail.vue'
import phoneList from './pages/phoneList.vue'

export default [{
  path: '/phoneArrondi',
  component: App
},
{
  path: '/phoneDetail/:id',
  component: phoneDetail
}, 
{
  path: '/phoneList/:id',
  component: phoneList
}]
