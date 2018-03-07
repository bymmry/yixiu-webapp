'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _question = require('./children/question');

var _question2 = _interopRequireDefault(_question);

var _questiondetail = require('./pages/questiondetail');

var _questiondetail2 = _interopRequireDefault(_questiondetail);

var _answerdetail = require('./pages/answerdetail');

var _answerdetail2 = _interopRequireDefault(_answerdetail);

var _newanswer = require('./pages/newanswer');

var _newanswer2 = _interopRequireDefault(_newanswer);

var _reply = require('./pages/reply');

var _reply2 = _interopRequireDefault(_reply);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
exports.default = [{
  path: '/find',
  component: _App2.default,
  children: [{
    path: "/find/question", //问题列表
    component: _question2.default
  }]
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}, {
  name: "questiondetail",
  path: '/find/questiondetail/:question', //问题详情
  component: _questiondetail2.default,
  meta: {
    keepAlive: true // 需要被缓存
  }
}, {
  name: "answerdetail",
  path: '/find/answerdetail/:answerId', //回答详情
  component: _answerdetail2.default,
  meta: {
    keepAlive: true // 需要被缓存
  }
}, {
  name: "newanswer",
  path: '/find/newanswer', //发起提问
  component: _newanswer2.default
}, {
  name: "reply",
  path: '/find/reply/:id', //回复
  component: _reply2.default
}];
//# sourceMappingURL=router.js.map