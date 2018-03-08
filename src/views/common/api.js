import ajaxLib from '../../lib/ajax';
const ajax = ajaxLib.ajax;
const url = 'https://m.yixiutech.com';
// const url = "https://yixiu.natappvip.cc";

//获取商家列表
export function getShopList() {
  return new Promise((resolve, reject) => {
    ajax.get(url + '/shop').then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}

//获取商家详情
export function getShopData(shopId) {
  return new Promise((resolve, reject) => {
    ajax.get(`${url}/shop/${shopId}`).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    })
  })
}

//  获取手机品牌
export function getPhoneBrand() {
  return new Promise((resolve, reject) => {
    ajax.get(`${url}/phone/manufacturer`).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    })
  })
}

// 根据品牌id获取该品牌支持的手机型号
export function getPhoneModel(phoneId) {
  return new Promise((resolve, reject) => {
    ajax.get(`${url}/phone/model/${phoneId}`).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    })
  })
}

// 获取热门手机维修服务分类
export function getPhoneProblem() {
  return new Promise((resolve, reject) => {
    ajax.get(`${url}/category/phoneRepair`).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    })
  })
}

//根据筛选条件获取商家列表
export function getShopListSort(data) {
  let filter = {
    score: 1,//评分
    serviceFinishTime: 1,//完成时间/(速度)
    serviceFinishCount: 1,//修好数量
    price: 1,//均价
    distance: 1,//距离
    pv: 1,//浏览量
    name: '',//商家名称
    serviceName: '',//服务名称
    point: {

    } //用户定位信息的经纬度
  };
  return new Promise((resolve, reject) => {
    ajax.post(`${url}/shop/filter`, filter).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    })
  })
}

//通过openid查询用户信息
export function getuserinforByopenId(openId){
  return new Promise((resolve, reject) => {
    ajax.get(url + '/user/openid/' + openId).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}

//根据微信信息注册用户
export function reguser(data){
  return new Promise((resolve, reject) => {
    ajax.post(url + '/user/reg/', data).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}

//更新用户信息
export function updateuserinfo(data){
  return new Promise((resolve, reject) => {
    ajax.post(url + '/user/update', data).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}

//  确认下单
export function sureOrder(data) {
  return new Promise((resolve, reject) => {
    ajax.post(`${url}/order/service`, data).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    })
  })
}
