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
exports.getChildrenProblem = getChildrenProblem;
exports.getShopListSort = getShopListSort;
exports.getuserinforByopenId = getuserinforByopenId;
exports.reguser = reguser;
exports.updateuserinfo = updateuserinfo;
exports.sureOrder = sureOrder;
exports.getaddressById = getaddressById;
exports.addAddress = addAddress;
exports.editAddress = editAddress;
exports.delAddress = delAddress;
exports.addNewQuestion = addNewQuestion;
exports.getQuestionList = getQuestionList;
exports.replyQuestion = replyQuestion;
exports.getQuestionListById = getQuestionListById;
exports.getQuestionByQid = getQuestionByQid;
exports.getQAListByQid = getQAListByQid;
exports.updateQuestion = updateQuestion;
exports.likethis = likethis;
exports.adoptThis = adoptThis;

var _ajax = require('../../lib/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = _ajax2.default.ajax;
var url = 'https://m.yixiutech.com';
// const url = "https://yixiu.natappvip.cc";

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
function getPhoneBrand(shopid) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/phone/manufacturer/shop/' + shopid).then(function (res) {
      // ajax.get(`${url}/phone/manufacturer`).then((res) => {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 根据店铺id和品牌id获取店铺支持的手机型号
function getPhoneModel(req) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/phone/model/shop', req).then(function (res) {
      // ajax.get(`${url}/phone/model/${req.manufacturer}`).then((res) => {
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
      // ajax.get(`${url}/category/phoneRepair`).then((res) => {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 根据商铺id和分类id以及手机型号 获取 某个商铺的某个分类下支持的某些手机型号 的具体维修服务
function getChildrenProblem(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/service/shop', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//根据筛选条件获取商家列表
function getShopListSort(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/shop/filter', data).then(function (res) {
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
// 获取地址列表
function getaddressById(id) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/address/user/' + id).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 添加地址
function addAddress(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/address', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 更新地址
function editAddress(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/address/update', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 删除地址
function delAddress(id) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/address/delete/' + id).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 发起问题
function addNewQuestion(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/question', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 根据筛选条件获取问题详情
function getQuestionList(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/question/filter', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 回复问题
function replyQuestion(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/question/reply', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 通过ID查询
function getQuestionListById(id) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/question/user/' + id).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 通过ID查询问题详情
function getQuestionByQid(id) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/question/' + id).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 通过id查询问题的回复列表
function getQAListByQid(id) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/question/reply/' + id).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 修改问题信息
function updateQuestion(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/address/update/', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 给评论点赞
function likethis(id) {
  return new _promise2.default(function (resolve, reject) {
    ajax.get(url + '/question/reply/like/' + id).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

// 采纳答案
function adoptThis(data) {
  return new _promise2.default(function (resolve, reject) {
    ajax.post(url + '/question/adopt/', data).then(function (res) {
      resolve(res);
    }).then(function (err) {
      reject(err);
    });
  });
}

//# sourceMappingURL=api.js.map