'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _router = require('../views/home/router');

var _router2 = _interopRequireDefault(_router);

var _router3 = require('../views/common/router');

var _router4 = _interopRequireDefault(_router3);

var _router5 = require('../views/my/router');

var _router6 = _interopRequireDefault(_router5);

var _router7 = require('../views/find/router');

var _router8 = _interopRequireDefault(_router7);

var _router9 = require('../views/position/router');

var _router10 = _interopRequireDefault(_router9);

var _router11 = require('../views/login/router');

var _router12 = _interopRequireDefault(_router11);

var _router13 = require('../views/register/router');

var _router14 = _interopRequireDefault(_router13);

var _router15 = require('../views/search/router');

var _router16 = _interopRequireDefault(_router15);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_vue2.default.use(_vueRouter2.default);
exports.default = new _vueRouter2.default({
  routes: [{
    path: '/',
    redirect: '/home'
  }].concat((0, _toConsumableArray3.default)(_router2.default), (0, _toConsumableArray3.default)(_router4.default), (0, _toConsumableArray3.default)(_router6.default), (0, _toConsumableArray3.default)(_router8.default), (0, _toConsumableArray3.default)(_router10.default), (0, _toConsumableArray3.default)(_router12.default), (0, _toConsumableArray3.default)(_router14.default), (0, _toConsumableArray3.default)(_router16.default))
});
//# sourceMappingURL=router.js.map
//# sourceMappingURL=router.js.map