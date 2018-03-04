//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import App from './App'
import question from './children/question'

export default [{
  path: '/find',
  component: App,
  children: [
    {
      path: "/find/question", //商家详情
      component: question
    }
  ],
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}]
