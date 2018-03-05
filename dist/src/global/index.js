'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _directives = require('./directives');

var _directives2 = _interopRequireDefault(_directives);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    Vue.use(_filters2.default);
    Vue.use(_directives2.default);
  },

  router: _router2.default,
  store: _store2.default
};
//# sourceMappingURL=index.js.map