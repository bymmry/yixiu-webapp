//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import expressDetails from './expressDetails'


export default [
  {
  	name:"expressDetails",
    path: '/expressDetails',
    component: expressDetails,
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  }
]
