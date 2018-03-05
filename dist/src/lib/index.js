'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _cube = require('./cube');

var _cube2 = _interopRequireDefault(_cube);

var _svgIcon = require('./svgIcon');

var _svgIcon2 = _interopRequireDefault(_svgIcon);

var _vueImgLoader = require('./vueImgLoader');

var _vueImgLoader2 = _interopRequireDefault(_vueImgLoader);

var _calendar = require('./calendar');

var _calendar2 = _interopRequireDefault(_calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    Vue.use(_ajax2.default);
    Vue.use(_svgIcon2.default);
    Vue.use(_cube2.default);
    Vue.use(_vueImgLoader2.default);
    Vue.use(_calendar2.default);
  }
};
//# sourceMappingURL=index.js.map