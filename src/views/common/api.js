import ajaxLib from '../../lib/ajax';
const ajax = ajaxLib.ajax;
const url = "https://m.yixiutech.com";

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
