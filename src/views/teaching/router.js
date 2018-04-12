import teaching from './App'
import videoDetail from './page/videoDetail'

export default[
  {
    path: '/teaching', //
    component: teaching,
    children: [
      {
        path: "/teaching/videoDetail", //
        name: "videoDetail",
        component: videoDetail
      }
    ],
    meta: {
      keepAlive: true // 需要被缓存
    }
  }
]
