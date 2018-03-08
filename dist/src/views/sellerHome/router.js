'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _addBrand = require('./pages/addBrand.vue');

var _addBrand2 = _interopRequireDefault(_addBrand);

var _addModel = require('./pages/addModel.vue');

var _addModel2 = _interopRequireDefault(_addModel);

var _addCatagory = require('./pages/addCatagory.vue');

var _addCatagory2 = _interopRequireDefault(_addCatagory);

var _addService = require('./pages/addService.vue');

var _addService2 = _interopRequireDefault(_addService);

var _orderList = require('./pages/orderList.vue');

var _orderList2 = _interopRequireDefault(_orderList);

var _publishPhone = require('./pages/publishPhone.vue');

var _publishPhone2 = _interopRequireDefault(_publishPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/sellerHome',
  component: _App2.default
}, {
  path: '/addBrand',
  component: _addBrand2.default
}, {
  path: '/addModel',
  component: _addModel2.default
}, {
  path: '/addCatagory',
  component: _addCatagory2.default
}, {
  path: '/addService',
  component: _addService2.default
}, {
  path: '/orderList/:state',
  component: _orderList2.default
}, {
  path: '/publishPhone',
  component: _publishPhone2.default
}];
//# sourceMappingURL=router.js.map