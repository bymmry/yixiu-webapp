//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
import App from './App'
import question from './children/question'
import myquestion from './children/myquestion'
import questiondetail from './pages/questiondetail'
import answerdetail from './pages/answerdetail'
import newanswer from './pages/newanswer'
import reply from './pages/reply'
import search from './pages/search'
import changequestion from './components/changequestion'

export default [{
  path: '/find',
  component: App,
  children: [
    {
      path: "/find/question", //问题列表
      component: question
    },
    {
      path: "/find/myquestion", //问题列表
      component: myquestion
    }
  ],
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
  },
  {
    name: "questiondetail",
    path: '/find/questiondetail',   //问题详情
    component: questiondetail,
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  },
  {
    name: "answerdetail",
    path: '/find/answerdetail',   //回答详情
    component: answerdetail,
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  },
  {
    name: "newanswer",
    path: '/find/newanswer/:questionId',   //发起提问
    component: newanswer
  },
  {
    name: "changequestion",
    path: '/find/changequestion/:oldquestion',   //发起提问
    component: changequestion
  },
  {
    name: "reply",
    path: '/find/reply/:id',   //回复
    component: reply
  },
  {
    name: "search",
    path: '/find/search/:searchData',   //发起提问
    component: search
  }
]
