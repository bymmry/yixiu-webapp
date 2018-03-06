'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _ajax = require('./lib/ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ajax = _ajax2.default.ajax;

var Api = function () {
  function Api() {
    (0, _classCallCheck3.default)(this, Api);
  }

  (0, _createClass3.default)(Api, null, [{
    key: 'hello',

    //hello world
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var promise;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                promise = new _promise2.default(function (resolve, reject) {
                  setTimeout(function () {
                    resolve('hello world!');
                  }, 1000);
                });
                return _context.abrupt('return', promise);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function hello() {
        return _ref.apply(this, arguments);
      }

      return hello;
    }()
  }]);
  return Api;
}();

exports.default = {
  install: function install(Vue) {
    Vue.prototype.$api = Api;
  }
};
//# sourceMappingURL=api.js.map