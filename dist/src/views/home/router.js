'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/home',
  component: _App2.default,
  meta: {
    keepAlive: true // 需要被缓存
  }
}]; //按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
//# sourceMappingURL=router.js.map