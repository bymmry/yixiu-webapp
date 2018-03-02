//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import my from './App'
import information from './pages/information/information'
import mycoupus from './pages/mycoupus/mycoupus'
import myaddress from './pages/myaddress/myaddress'

export default [
{
  path: '/my',
  component: my,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/my/information',
  component: information,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/mycoupus',
  component: mycoupus,
  meta: {
    keepAlive: true // 需要被缓存
  }
},
{
  path: '/my/myaddress',
  component: myaddress,
  meta: {
    keepAlive: true // 需要被缓存
  }
}

]
