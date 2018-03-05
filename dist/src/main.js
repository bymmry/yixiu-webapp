'use strict';

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _global = require('./global');

var _global2 = _interopRequireDefault(_global);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

var _vueLazyload = require('vue-lazyload');

var _vueLazyload2 = _interopRequireDefault(_vueLazyload);

var _fastclick = require('fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

require('./assets/css/app.css');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_global2.default);

//通用组件


//vue的全局资源filters、mixins、directives

_vue2.default.use(_components2.default);

//第三方插件库

_vue2.default.use(_lib2.default);

//图片懒加载

_vue2.default.use(_vueLazyload2.default, {
  error: '',
  loading: './assets/img/loading.gif'
});

//移动端300毫秒延迟处理

_fastclick2.default.attach(document.body);

//自定义css


//全局接口

_vue2.default.use(_api2.default);

_vue2.default.config.productionTip = false;

/* eslint-disable no-new */
new _vue2.default({
  el: '#app',
  router: _global2.default.router,
  components: { App: _App2.default },
  template: '<App/>'
});
//# sourceMappingURL=main.js.map