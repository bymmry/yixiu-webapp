'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _style = require('cube-ui/lib/style');

var _style2 = _interopRequireDefault(_style);

var _button = require('cube-ui/lib/button');

var _button2 = _interopRequireDefault(_button);

var _toast = require('cube-ui/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _picker = require('cube-ui/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _dialog = require('cube-ui/lib/dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _actionSheet = require('cube-ui/lib/action-sheet');

var _actionSheet2 = _interopRequireDefault(_actionSheet);

var _scroll = require('cube-ui/lib/scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _slide = require('cube-ui/lib/slide');

var _slide2 = _interopRequireDefault(_slide);

var _select = require('cube-ui/lib/select');

var _select2 = _interopRequireDefault(_select);

require('cube-ui/lib/style/style.css');

require('cube-ui/lib/button/style.css');

require('cube-ui/lib/toast/style.css');

require('cube-ui/lib/picker/style.css');

require('cube-ui/lib/dialog/style.css');

require('cube-ui/lib/action-sheet/style.css');

require('cube-ui/lib/scroll/style.css');

require('cube-ui/lib/slide/style.css');

require('cube-ui/lib/select/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  install: function install(Vue) {
    Vue.use(_button2.default);
    Vue.use(_scroll2.default);
    Vue.use(_picker2.default);
    Vue.use(_slide2.default);
    Vue.use(_slide2.default);
    Vue.use(_toast2.default);
    Vue.use(_dialog2.default);
    Vue.use(_actionSheet2.default);
    Vue.use(_select2.default);
  }
};
//# sourceMappingURL=cube.js.map