let filters = {
  init(val) {
    return 'filter init'
  },

  setTarget(tar, index){
    if(index === "0"){
      tar.style.backgroundColor = "#fd9153";
      tar.style.color = "#fcffff";
      tar.setAttribute("data-isSelected", "1");
    }else {
      tar.style.backgroundColor = "#fcfcfc";
      tar.style.color = "#676767";
      tar.setAttribute("data-isSelected", "0");
    }
  },
  isOnlyOneSelected(target, el) {
    let targets = target.getElementsByTagName(el);
    for(let i=0; i<targets.length; i++){
      let isSelected = targets[i].getAttribute("data-isSelected");
      if(isSelected === "1"){
        targets[i].style.backgroundColor = "#fcfcfc";
        targets[i].style.color = "#676767";
        targets[i].setAttribute("data-isSelected", "0");
      }
    }
  },
  isShowNextStep(target) {
    let targets = target.getElementsByTagName("span");
    let selectNum = 0;
    let data = {
      nextStepButtonDisabled:"",
      val: ""
    };
    for(let i=0; i<targets.length; i++){
      let isSelected = targets[i].getAttribute("data-isSelected");
      if(isSelected === "1"){
        selectNum++;
        data.val = targets[i].innerText;
      }
    }

    if (selectNum === 1){
      data.nextStepButtonDisabled = false;
    }else {
      data.nextStepButtonDisabled = true;
    }

    return data;
  },
  hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className)
  },
  addClass(el, className) {
    if (this.hasClass(el, className)) {
      return
    }

    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ')
  },
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  },
  arr2name(val) {
    if (val.length > 0) {
      let res = []
      val.forEach(item => {
        res.push(item.name)
      })
      return res.join('、')
    } else {
      return '无'
    }
  },
  arr2id(val) {
    if (val.length > 0) {
      let res = []
      val.forEach(item => {
        res.push(item._id)
      })
      return res
    } else {
      return val
    }
  },
  unix2time(val) {
    return val
    // return moment.unix(val).format('YYYY-MM-DD HH:mm')
  },
  unix2hhmm(val) {
    return val
    // return moment.unix(val).format('HH:mm')
  }
}
export default {
  install(Vue) {
    for (var key in filters) {
      Vue.filter(key, filters[key])
    }
    Vue.prototype.unix2hhmm = filters.unix2hhmm
    Vue.prototype.arr2name = filters.arr2name
    Vue.prototype.arr2id = filters.arr2id
    Vue.prototype.setTarget = filters.setTarget
    Vue.prototype.isOnlyOneSelected = filters.isOnlyOneSelected
    Vue.prototype.isShowNextStep = filters.isShowNextStep
    Vue.prototype.addClass = filters.addClass
    Vue.prototype.hasClass = filters.hasClass
    Vue.prototype.removeClass = filters.removeClass
  }
}
