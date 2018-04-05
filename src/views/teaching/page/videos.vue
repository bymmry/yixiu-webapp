<template>
  <div class="videos">
    <ul class="list">
      <li 
        v-for="(li,index) in list" 
        :key="index" 
        :class="{'active': currentIndex == index}"
        @click="getClass(index)"
        >{{li.name}}</li>
    </ul>
    <cube-scroll :data="classListData" class="scroll">
      <class-list 
        v-for="(item, index) in classListData" 
        :key="index" 
        :cover="item.cover" 
        :name="item.name" 
        :type="item.type" 
        :number="item.number"
        :fee="item.fee"
        v-on:click.native="gotoVideoDetail(item)"
        ></class-list>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import videoItem from '../components/videoItem'
  import classList from '../components/classList.vue'
  export default {
    name: 'videos',
    components: {
      videoItem,
      classList
    },
    data() {
      return {
        list: [{
            name: '初级培训'
          },
          {
            name: '中级培训'
          },
          {
            name: '高级培训'
          }
        ],
        currentIndex: 0,
        classListData: [ //课程列表
          {
            _id: '0001',
            cover: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/gcs.jpg',
            name: '更换手机零部件从入门到精通',
            type: '初级',
            number: 288,
            fee: 0
          },
          {
            _id: '0002',
            cover: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/gcs.jpg',
            name: '更换手机零部件从入门到精通',
            type: '初级',
            number: 288,
            fee: 360000
          },
          {
            _id: '0003',
            cover: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/gcs.jpg',
            name: '更换手机零部件从入门到精通',
            type: '初级',
            number: 288,
            fee: 360000
          }
        ]
      }
    },
    methods: {
      getClass(index) {
        this.currentIndex = index;
      },
      gotoVideoDetail(item){ // 跳转至商品详情页
        console.log(item);
        this.$router.push({
          path: `/teaching/${item._id}`,
          params: {
            id: item._id
          }
        })
      }
    }
  }

</script>

<style>
  .videos {
    width: 100%;
    height: 85vh;
    background-color: #f1f5f6;
  }

  .videos .list {
    width: 100;
    height: 8vh;
    display: flex;
    border-top: 1px solid #f1f5f6;
    background-color: #fff;
  }

  .videos .list li {
    flex: 1;
    text-align: center;
    line-height: 8vh;
  }

  .videos .list li.active {
    color: #0090fd;
  }

  .scroll {
    /* height: 76vh; */
    position: relative;
    bottom: 10px;
    left: 0;
  }

</style>

