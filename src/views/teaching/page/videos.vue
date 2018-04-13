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
        :cover="item.info.cover"
        :name="item.name" 
        :level="item.level" 
        :number="item.number"
        :fee="item.price/100"
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
        classListData: []//课程列表
      }
    },
    created(){
      this.getClassListData(0);
    },
    methods: {
      getClass(index) {
        this.currentIndex = index;
        this.getClassListData(index)

      },
      gotoVideoDetail(item){ // 跳转至商品详情页
        this.$router.push({
          // path: `/teaching/videoDetail`,
          name: "videoDetail",
          params: {
            data: item
          }
        })
      },
      async getClassListData(level){
        
        let req = {
          collection: "Train",
          level: level
        }
        const toast = this.$createToast({
				  txt: '加载中...',
          type: 'loading',
          time: 25000
        });
        toast.show();
        let res = await this.$api.sendData(`https://m.yixiutech.com/sql/find`, req);
        toast.hide();
        if(res.code == 200){
          if(res.data.length == 0){
            this.$toast("暂无此类型的视频");
          }
          this.classListData = res.data;
        }
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

