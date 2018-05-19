//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import my from './App'
import information from './pages/information/information'
import mycoupus from './pages/mycoupus/mycoupus'
import myaddress from './pages/myaddress/myaddress'
import mywallet from './pages/mywallet/mywallet'
import myexpress from './pages/myexpress/myexpress'
import feedback from './pages/feedback/feedback'
import callphone from './pages/callphone/callphone'
import rule from './pages/rule/rule'
import share from './pages/share/share'
import loginWx from './pages/loginWx/loginWx'

export default [
{
  path: '/my',
  component: my,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
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
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/myaddress',
  component: myaddress,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/mywallet',
  component: mywallet,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/myexpress',
  component: myexpress,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/feedback',
  component: feedback,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/callphone',
  component: callphone,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/rule',
  component: rule,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/share',
  component: share,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
},
{
  path: '/my/loginWx',
  component: loginWx,
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}

]
