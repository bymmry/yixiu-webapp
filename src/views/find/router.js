//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import App from './App'
import question from './children/question'
import questiondetail from './pages/questiondetail'
import answerdetail from './pages/answerdetail'
import newanswer from './pages/newanswer'
import reply from './pages/reply'

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
  },
  {
    name: "answerdetail",
    path: '/find/answerdetail/:answerId',   //回答详情
    component: answerdetail
  },
  {
    name: "newanswer",
    path: '/find/newanswer',   //发起提问
    component: newanswer
  },
  {
    name: "reply",
    path: '/find/reply/:id',   //发起提问
    component: reply
  }
]
