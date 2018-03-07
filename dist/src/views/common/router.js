'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('../orders/App');

var _App2 = _interopRequireDefault(_App);

var _App3 = require('../my/App');

var _App4 = _interopRequireDefault(_App3);

var _App5 = require('../find/App');

var _App6 = _interopRequireDefault(_App5);

var _toShop = require('../common/components/toShop');

var _toShop2 = _interopRequireDefault(_toShop);

var _shopDetail = require('../common/components/shopDetail');

var _shopDetail2 = _interopRequireDefault(_shopDetail);

var _shopList = require('../common/components/shopList');

var _shopList2 = _interopRequireDefault(_shopList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//公共导航路由
exports.default = [{
  path: '/orders',
  component: _App2.default,
  meta: {
    keepAlive: true // 需要被缓存
  }
}, {
  path: '/my',
  component: _App4.default,
  meta: {
    keepAlive: true // 需要被缓存
  }
}, {
  path: '/find',
  component: _App6.default,
  meta: {
    keepAlive: true // 需要被缓存
  }
}, {
  path: '/shop', //商店列表
  component: _shopList2.default
}, {
  path: '/shop', //商店列表
  component: _toShop2.default,
  children: [{
    path: ":id", //商家详情
    component: _shopDetail2.default
  }],
  meta: {
    keepAlive: true // 需要被缓存
  }
}];
//# sourceMappingURL=router.js.map