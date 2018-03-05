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

var _router11 = require('../views/search/router');

var _router12 = _interopRequireDefault(_router11);

var _router13 = require('../views/position/router');

var _router14 = _interopRequireDefault(_router13);

var _router15 = require('../views/register/router');

var _router16 = _interopRequireDefault(_router15);

var _router17 = require('../views/businessLogin/router');

var _router18 = _interopRequireDefault(_router17);

var _router19 = require('../views/retrievePwd/router');

var _router20 = _interopRequireDefault(_router19);

var _router21 = require('../views/sellerHome/router');

var _router22 = _interopRequireDefault(_router21);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
exports.default = new _vueRouter2.default({
  base: '/webapp/',
  routes: [{
    path: '/',
    redirect: '/home?userInfo=%7BavatarUrl%3D%22https%3A%2F%2Fwx.qlogo.cn%2Fmmopen%2Fvi_32%2FtLZAsMgyw4pvRYuuN2RKHDpDY12HMen3AibRegfoQNguQJjrdKqAJfdaIMgf76NJ6L7lpuViaAxdh2Z5NA69Eoiag%2F0%22&city=%22Liangping%22&country=%22China%22&gender=1&language=%22zh_CN%22&nickName=%22%E7%AD%89%E5%88%B0%E7%83%9F%E8%8A%B1%E6%B8%85%E5%87%89%22&province=%22Chongqing%22%7D&openid=%22oFosP5RQ-4BYlzddw8o5ON1ibctU%22'
  }].concat((0, _toConsumableArray3.default)(_router2.default), (0, _toConsumableArray3.default)(_router4.default), (0, _toConsumableArray3.default)(_router6.default), (0, _toConsumableArray3.default)(_router8.default), (0, _toConsumableArray3.default)(_router14.default), (0, _toConsumableArray3.default)(_router10.default), (0, _toConsumableArray3.default)(_router16.default), (0, _toConsumableArray3.default)(_router12.default), (0, _toConsumableArray3.default)(_router18.default), (0, _toConsumableArray3.default)(_router20.default), (0, _toConsumableArray3.default)(_router22.default))
});
//# sourceMappingURL=router.js.map