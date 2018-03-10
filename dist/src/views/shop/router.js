'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _addBrand = require('./shopHome/pages/addBrand.vue');

var _addBrand2 = _interopRequireDefault(_addBrand);

var _addModel = require('./shopHome/pages/addModel.vue');

var _addModel2 = _interopRequireDefault(_addModel);

var _addCatagory = require('./shopHome/pages/addCatagory.vue');

var _addCatagory2 = _interopRequireDefault(_addCatagory);

var _addService = require('./shopHome/pages/addService.vue');

var _addService2 = _interopRequireDefault(_addService);

var _orderList = require('./shopHome/pages/orderList.vue');

var _orderList2 = _interopRequireDefault(_orderList);

var _publishPhone = require('./shopHome/pages/publishPhone.vue');

var _publishPhone2 = _interopRequireDefault(_publishPhone);

var _App3 = require('./shopRegister/App.vue');

var _App4 = _interopRequireDefault(_App3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  path: '/shopHome',
  component: _App2.default,
  children: [{
    path: '/:id',
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
  }]
}, {
  path: '/shopRegister',
  component: _addBrand2.default
}];
//# sourceMappingURL=router.js.map