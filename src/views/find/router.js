//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import App from './App'
import question from './children/question'
import questiondetail from './pages/questiondetail'

export default [{
  path: '/find',
  component: App,
  children: [
    {
      path: "/find/question", //问题列表
      component: question
    }
  ],
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
  },
  {
    name: "questiondetail",
    path: '/find/questiondetail/:question',   //问题详情
    component: questiondetail
  }
]
