import teaching from './App'
import videoDetail from './page/videoDetail'
import hasBuyClass from './page/hasBuyClass';
import hasBuyClassDes from './page/hasBuyClassDes.vue';

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
    children: [
      {
        path: "/hasBuy/hasBuyClassDes", //
        name: "hasBuyClassDes",
        component: hasBuyClassDes
      },
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
