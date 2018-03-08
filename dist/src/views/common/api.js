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
exports.getShopListSort = getShopListSort;
exports.getuserinforByopenId = getuserinforByopenId;
exports.reguser = reguser;
exports.updateuserinfo = updateuserinfo;
exports.sureOrder = sureOrder;

var _ajax = require('../../lib/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = _ajax2.default.ajax;
// const url = 'https://m.yixiutech.com';
var url = "https://yixiu.natappvip.cc";

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
function getPhoneProblem(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/category/shop/' + data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// huoqu

//根据筛选条件获取商家列表
function getShopListSort(data) {
  var filter = {
    score: 1, //评分
    serviceFinishTime: 1, //完成时间/(速度)
    serviceFinishCount: 1, //修好数量
    price: 1, //均价
    distance: 1, //距离
    pv: 1, //浏览量
    name: '', //商家名称
    serviceName: '', //服务名称
    point: {} //用户定位信息的经纬度
  };
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/shop/filter', filter).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//通过openid查询用户信息
function getuserinforByopenId(openId) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/user/openid/' + openId).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//根据微信信息注册用户
function reguser(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/user/reg/', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//更新用户信息
function updateuserinfo(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/user/update', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//  确认下单
function sureOrder(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/order/service', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}
//# sourceMappingURL=api.js.map