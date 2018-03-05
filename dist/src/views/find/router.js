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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  component: _questiondetail2.default
}]; //按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
//# sourceMappingURL=router.js.map