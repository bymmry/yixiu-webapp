'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _information = require('./pages/information/information');

var _information2 = _interopRequireDefault(_information);

var _mycoupus = require('./pages/mycoupus/mycoupus');

var _mycoupus2 = _interopRequireDefault(_mycoupus);

var _myaddress = require('./pages/myaddress/myaddress');

var _myaddress2 = _interopRequireDefault(_myaddress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//按需加载方式
// const App = () => ({
//   component: import ('./App')
// })
exports.default = [{
  path: '/my',
  component: _App2.default
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}, {
  path: '/my/information',
  component: _information2.default
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}, {
  path: '/my/mycoupus',
  component: _mycoupus2.default
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}, {
  path: '/my/myaddress',
  component: _myaddress2.default
  // meta: {
  //   keepAlive: true // 需要被缓存
  // }
}];
//# sourceMappingURL=router.js.map