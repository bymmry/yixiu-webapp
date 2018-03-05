'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getShopList = getShopList;
exports.getShopData = getShopData;
exports.getPhoneBrand = getPhoneBrand;
exports.getPhoneModel = getPhoneModel;
exports.getPhoneProblem = getPhoneProblem;

var _ajax = require('../../lib/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = _ajax2.default.ajax;
var url = "https://m.yixiutech.com";

//获取商家列表
function getShopList() {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/shop').then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//获取商家详情
function getShopData(shopId) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/shop/' + shopId).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//  获取手机品牌
function getPhoneBrand() {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/phone/manufacturer').then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 根据品牌id获取该品牌支持的手机型号
function getPhoneModel(phoneId) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/phone/model/' + phoneId).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 获取热门手机维修服务分类
function getPhoneProblem() {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/category/phoneRepair').then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}
//# sourceMappingURL=api.js.map