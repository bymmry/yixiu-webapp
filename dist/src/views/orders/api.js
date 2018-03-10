'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getOrderList = getOrderList;

var _ajax = require('../../lib/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = _ajax2.default.ajax;
var url = 'https://m.yixiutech.com';
// const url = "http://yixiu.natappvip.cc";

//根据筛选条件获取订单列表
function getOrderList(req) {
  var order = {
    // shop:'', //店铺id
    user: req.user._id, //用户id
    state: req.filter //订单状态
  };
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/order/service/filter', order).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}
//# sourceMappingURL=api.js.map