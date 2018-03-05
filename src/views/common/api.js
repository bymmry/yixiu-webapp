import ajaxLib from '../../lib/ajax';
const ajax = ajaxLib.ajax;
const url = "https://m.yixiutech.com";

 export function getShopList() {
    return new Promise((resolve, reject) => {
      ajax.get(url + '/shop').then((res) => {
        resolve(res);
      }).then((err) => {
        reject(err);
      });
    });
  }

  export function getShopData(shopId) {
    return new Promise((resolve, reject) => {
      ajax.get(`${url}/shop/${shopId}`).then((res) => {
        resolve(res);
      }).then((err) => {
        reject(err);
      })
    })
  }
