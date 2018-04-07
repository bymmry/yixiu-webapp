import toOrders from './components/toOrders';
import orderDetail from './components/orderDetail';
export default[
  {
    path: '/toOrders', //
    component: toOrders,
    children: [
      {
        path: ":id", //
        component: orderDetail
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
