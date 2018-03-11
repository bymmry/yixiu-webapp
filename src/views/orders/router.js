import toOrders from './components/toOrders';
import repay from './components/rePay';
export default[
  {
    path: '/toOrders', //
    component: toOrders,
    children: [
      {
        path: ":id", //
        component: repay
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
