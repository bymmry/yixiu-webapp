import teaching from './App'
import videoDetail from './page/videoDetail'
import hasBuyClass from './page/hasBuyClass';

export default[
  {
    path: '/teaching', //
    component: teaching,
    children: [
      {
        path: "/teaching/videoDetail", //
        name: "videoDetail",
        component: videoDetail
      },
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/hasBuy", //
    name: "hasBuyClass",
    component: hasBuyClass,
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
