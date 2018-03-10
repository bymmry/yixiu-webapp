'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _phoneDetail = require('./pages/phoneDetail.vue');

var _phoneDetail2 = _interopRequireDefault(_phoneDetail);

var _phoneList = require('./pages/phoneList.vue');

var _phoneList2 = _interopRequireDefault(_phoneList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/phoneArrondi',
  component: _App2.default
}, {
  path: '/phoneDetail/:id',
  component: _phoneDetail2.default
}, {
  path: '/phoneList/:id',
  component: _phoneList2.default
}];
//# sourceMappingURL=router.js.map