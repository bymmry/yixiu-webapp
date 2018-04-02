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
        :key="index" :cover="item.cover" 
        :name="item.name" 
        :type="item.type" 
        :number="item.number"
        :fee="item.fee"></class-list>
    </cube-scroll>

    <!-- <videoItem
        v-for="(item, index) in data"
        :key="index"
        :videoSrc='item.src'
        :name='item.name'
      ></videoItem> -->
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
        data: [{
            src: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/test.mp4',
            name: '培训视频1'
          },
          {
            src: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/test.mp4',
            name: '培训视频2'
          }
        ],
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
            cover: '',
            name: '更换手机零部件从入门到精通',
            type: '初级',
            number: '288',
            fee: '0'
          },
          {
            cover: '',
            name: '更换手机零部件从入门到精通',
            type: '初级',
            number: '288',
            fee: '360000'
          }
        ]
      }
    },
    methods: {
      getClass(index) {
        this.currentIndex = index;
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
    height: 76vh;
  }

</style>

