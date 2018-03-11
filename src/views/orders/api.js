import ajaxLib from '../../lib/ajax';
const ajax = ajaxLib.ajax;
const url = 'https://m.yixiutech.com';
// const url = "http://yixiu.natappvip.cc";

//根据筛选条件获取订单列表
export function getOrderList(req) {
  let order = {
    // shop:'', //店铺id
    user: req.user._id, //用户id
    state: req.filter,//订单状态
  };
  return new Promise((resolve, reject) => {
    ajax.post(url + '/order/service/filter', order).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}


// 根据id查询订单详情
export function getOrderDetail(id) {
  return new Promise((resolve, reject) => {
    ajax.get(`${url}/order/${id}`).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}


//取消订单
export function cancelOrder(req) {
  return new Promise((resolve, reject) => {
    ajax.post(`${url}/order/update`, req).then((res) => {
      resolve(res);
    }).then((err) => {
      reject(err);
    });
  });
}
