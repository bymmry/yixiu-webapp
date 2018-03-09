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

var _router9 = require('../views/login/router');

var _router10 = _interopRequireDefault(_router9);

var _router11 = require('../views/position/router');

var _router12 = _interopRequireDefault(_router11);

var _router13 = require('../views/register/router');

var _router14 = _interopRequireDefault(_router13);

var _router15 = require('../views/businessRegister/router');

var _router16 = _interopRequireDefault(_router15);

var _router17 = require('../views/retrievePwd/router');

var _router18 = _interopRequireDefault(_router17);

var _router19 = require('../views/sellerHome/router');

var _router20 = _interopRequireDefault(_router19);

var _router21 = require('../views/phoneArrondi/router');

var _router22 = _interopRequireDefault(_router21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
exports.default = new _vueRouter2.default({
  base: '/webapp/',
  routes: [{
    path: '/',
    redirect: '/home?nickName=等到烟花清凉&gender=1&avatarUrl=https://wx.qlogo.cn/mmopen/vi_32/tLZAsMgyw4pvRYuuN2RKHDpDY12HMen3AibRegfoQNguQJjrdKqAJfdaIMgf76NJ6L7lpuViaAxdh2Z5NA69Eoiag/0&openid=oFosP5RQ-4BYlzddw8o5ON1ibctU'
    // redirect:'/home'
  }, {
    path: "/pay", //小程序返回路由
    redirect: '/orders'
  }].concat((0, _toConsumableArray3.default)(_router2.default), (0, _toConsumableArray3.default)(_router4.default), (0, _toConsumableArray3.default)(_router6.default), (0, _toConsumableArray3.default)(_router8.default), (0, _toConsumableArray3.default)(_router12.default), (0, _toConsumableArray3.default)(_router10.default), (0, _toConsumableArray3.default)(_router14.default), (0, _toConsumableArray3.default)(_router16.default), (0, _toConsumableArray3.default)(_router18.default), (0, _toConsumableArray3.default)(_router20.default), (0, _toConsumableArray3.default)(_router22.default))
});
//# sourceMappingURL=router.js.map