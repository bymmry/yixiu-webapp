"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var filters = {
  init: function init(val) {
    return 'filter init';
  },
  setTarget: function setTarget(tar, index) {
    if (index === "0") {
      tar.style.backgroundColor = "#fd9153";
      tar.style.color = "#fcffff";
      tar.setAttribute("data-isSelected", "1");
    } else {
      tar.style.backgroundColor = "#fcfcfc";
      tar.style.color = "#676767";
      tar.setAttribute("data-isSelected", "0");
    }
  },
  isOnlyOneSelected: function isOnlyOneSelected(target, el) {
    var targets = target.getElementsByTagName(el);
    for (var i = 0; i < targets.length; i++) {
      var isSelected = targets[i].getAttribute("data-isSelected");
      if (isSelected === "1") {
        targets[i].style.backgroundColor = "#fcfcfc";
        targets[i].style.color = "#676767";
        targets[i].setAttribute("data-isSelected", "0");
      }
    }
  },
  isShowNextStep: function isShowNextStep(target) {
    var targets = target.getElementsByTagName("span");
    var selectNum = 0;
    var data = {
      nextStepButtonDisabled: "",
      index: ""
    };
    for (var i = 0; i < targets.length; i++) {
      var index = i;
      var isSelected = targets[i].getAttribute("data-isSelected");
      if (isSelected === "1") {
        selectNum++;
        data.index = index;
      }
    }

    if (selectNum === 1) {
      data.nextStepButtonDisabled = false;
    } else {
      data.nextStepButtonDisabled = true;
    }

    return data;
  },
  hasClass: function hasClass(el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
  },
  addClass: function addClass(el, className) {
    if (this.hasClass(el, className)) {
      return;
    }

    var newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  },
  removeClass: function removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  },
  arr2name: function arr2name(val) {
    if (val.length > 0) {
      var res = [];
      val.forEach(function (item) {
        res.push(item.name);
      });
      return res.join('、');
    } else {
      return '无';
    }
  },
  arr2id: function arr2id(val) {
    if (val.length > 0) {
      var res = [];
      val.forEach(function (item) {
        res.push(item._id);
      });
      return res;
    } else {
      return val;
    }
  },
  unix2time: function unix2time(val) {
    return val;
    // return moment.unix(val).format('YYYY-MM-DD HH:mm')
  },
  unix2hhmm: function unix2hhmm(val) {
    return val;
    // return moment.unix(val).format('HH:mm')
  }
};
exports.default = {
  install: function install(Vue) {
    for (var key in filters) {
      Vue.filter(key, filters[key]);
    }
    Vue.prototype.unix2hhmm = filters.unix2hhmm;
    Vue.prototype.arr2name = filters.arr2name;
    Vue.prototype.arr2id = filters.arr2id;
    Vue.prototype.setTarget = filters.setTarget;
    Vue.prototype.isOnlyOneSelected = filters.isOnlyOneSelected;
    Vue.prototype.isShowNextStep = filters.isShowNextStep;
    Vue.prototype.addClass = filters.addClass;
    Vue.prototype.hasClass = filters.hasClass;
    Vue.prototype.removeClass = filters.removeClass;
  }
};
//# sourceMappingURL=filters.js.map