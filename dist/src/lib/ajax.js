'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 创建一个axios实例
var ajax = _axios2.default.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:3001' : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 25000 // 请求超时时间
});
// 注册请求拦截器
ajax.interceptors.request.use(function (config) {
  if (window.sessionStorage && window.localStorage) {
    if (sessionStorage.token || localStorage.token) {
      config.headers['token'] = sessionStorage.token || localStorage.token;
    }
  }
  return config;
}, function (err) {
  return _promise2.default.reject(err);
});
// 注册响应拦截器
ajax.interceptors.response.use(function (response) {
  var res = response.data;
  if (response.status === 200) {
    return _promise2.default.resolve(res);
  } else {
    alert(res.errMsg);
    return _promise2.default.resolve();
  }
}, function (err) {
  return _promise2.default.reject(err);
});

exports.default = {
  install: function install(Vue) {
    Vue.prototype.$ajax = ajax;
  },

  ajax: ajax
};
//# sourceMappingURL=ajax.js.map