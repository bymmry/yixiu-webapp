import ajaxLib from '../../lib/ajax';
const ajax = ajaxLib.ajax;
// const url = 'https://m.yixiutech.com';
const url = "http://yixiu.natappvip.cc";

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
