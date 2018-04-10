// import { Toast } from "_vant@0.12.14@vant";

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
      index: ""
    };
    for(let i=0; i<targets.length; i++){
      let index = i;
      let isSelected = targets[i].getAttribute("data-isSelected");
      if(isSelected === "1"){
        selectNum++;
        data.index = index;
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
  prompt (txt, type) {
    return this.$createToast({
      txt: txt,
      type: type,
      time: 1300
    })
  },
  unix2hhmm(val) {
    return val
    // return moment.unix(val).format('HH:mm')
  },
  urlDataTurnObj(url){
    // 目前只支持   ...home?userInfo={avatarUrl="https....}这样的类型
    // url是传进来的完整地址
    // urlData 去除 }
    // origin 从第一个 { 开始 通过 & 分割
    let urlData = decodeURIComponent(url);
    let origin = urlData.substr(urlData.indexOf('?') + 1).split('&');

    let userInfor = {};

    for(let userData in origin){
      let originData = origin[userData].split("=")
      // userInfor[originData[0]] = originData[1].replace(/"/g, '').split("/")[0];
      userInfor[originData[0]] = originData[1];
    }
    //返回一个JSON字符串
    return JSON.stringify(userInfor);
  },
  functionunavailable(){
    //功能不可用的提示
    const toast = this.$createToast({
      txt: '本功能即将到来',
      type: 'error',
      time: 1300
    })
    toast.show()
  },
  reguserinfo(data){
    // 注册用户需要用到的参数
    const information = {
      name: data.nickName || '翼修用户', //用户名称
      email: data.email || '',//邮箱
      mobile: data.mobile || '',//手机号
      password: data.password || '',//密码
      isSys: data.isSys || false,//是否是系统管理员
      role: data.role || [],//如[{name:'普通用户',power:1000},{name:'商家',power,2000}]
      wx: data,//微信信息:如openid,昵称和头像链接等等
      parent: data.parent || 0
    }
    if (information.parent === 0) {
      delete information.parent
    }

    return information;
  },
  copy(obj){
    //浅拷贝
    var newobj = {};
    for ( var attr in obj) {
      newobj[attr] = obj[attr];
    }
    return newobj;
  },
  emailReg(str){
    //邮箱验证
    // const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    const result = reg.test(str);
    return result
  },
  mobileReg(str){
    //手机号验证
    const reg = /^1\d{10}$/
    const result = reg.test(str);
    return result
  },
  //获取用户信息
  getUserInfo: function () {
    let userInfoStr = sessionStorage.getItem("userData");
    // alert(userInfoStr);
    if(userInfoStr == 'undefined' || userInfoStr == undefined){
      alert("你还未注册，请先注册");
      this.$router.push("/register");
      return;
    }else if(typeof userInfoStr === "string"){
      // alert(userInfoStr);
      let user = JSON.parse(userInfoStr);
      if(user.data || user.mobile == ""){
        alert("你还未注册，请先注册");
        this.$router.push("/register");
      }else {
        return user;
      }
    }
      // if(typeof userInfoStr === "string"){
      //   let user = JSON.parse(userInfoStr);
      //   console.log(user);
      //   if(user.data || userInfoStr == 'undefined'){
      //     alert("你还未注册，请先注册");
      //     this.$router.push("/register");
      //   }
      //   return user;
      // }else if(userInfoStr == 'undefined' || userInfoStr == undefined){
      //   alert("你还未注册，请先注册");
      //   this.$router.push("/register");
      //   // alert("你还未登陆，请先登陆");
      //   // this.$router.push("/login");
      // }
    
    
  },
  //
  getGreatCircleDistance: function(lat1,lng1,lat2,lng2){
    var EARTH_RADIUS = 6378137.0;    //单位M
    var PI = Math.PI;
    
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);
    
    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);
    
    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s*EARTH_RADIUS;
    s = Math.round(s*10000)/10000.0;
            
    function getRad(d){
      return d*PI/180.0;
    }
    return s;
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
    Vue.prototype.urlDataTurnObj = filters.urlDataTurnObj
    Vue.prototype.functionunavailable = filters.functionunavailable
    Vue.prototype.reguserinfo = filters.reguserinfo
    Vue.prototype.copy = filters.copy
    Vue.prototype.emailReg = filters.emailReg
    Vue.prototype.mobileReg = filters.mobileReg
    Vue.prototype.prompt = filters.prompt
    Vue.prototype.getUserInfo = filters.getUserInfo
    Vue.prototype.getGreatCircleDistance = filters.getGreatCircleDistance
  }
}
