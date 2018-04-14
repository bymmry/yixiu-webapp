<!-- 已购买课程详细信息 -->
<template>
  <transition name="slide">
    <div class="buyClassDes">
      <div class="video">
        <!-- <video :src="classData.info.video"></video> -->
        <img :src="classData.info.cover" alt="">
      </div>
      <!-- <div class="videoTitle">
        <span><sicon name="back" scale="2.0"></sicon></span>

      </div> -->
      <div class="box">
        <menu-tab :list="menuList" v-on:returnListClick="getList"></menu-tab>
      </div>
      
      <div class="content">
        <div class="introduce" v-if="nowType == 1">
          <ul>
            <li><span class="type">{{classData.type}}</span></li>
            <li>课程名：<span>{{classData.name}}</span></li>
            <li>建议学习时间：<span>{{classData.info.time}}小时</span></li>
          </ul>
          <!-- <p>{{classData.desc}}</p> -->
          <h3>简介：</h3>
          <p class="desc">{{classData.desc}}</p>
        </div>
        <div class="classChapter" v-if="nowType == 2">
          <cube-scroll :data="classChapterData" class="scroll">
            <class-chapter
              v-if="classChapterData.length != 0"
              v-for="(cla, index) in classChapterData"
              :key="index"
              :name="cla.name"
              :index="cla.index"
              :claId="cla._id"
              :train="classData._id"
              :state="'hasBuy'"
            ></class-chapter>
          </cube-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import menuTab from '../components/menuTab.vue';
import classChapter from '../components/classChapter.vue';
export default {
  data () {
    return {
      classData: {},
      classChapterData: [],
      menuList: [
        {name: "详情", type: 1},
        {name: "章节", type: 2}
      ],
      nowType: 1
    };
  },

  components: {
    menuTab,
    classChapter
  },
  created(){
    let data = this.$route.params.data;
    this.classData = data;
    switch (data.level)
    {
      case "0":
        this.classData.type = "初级"
        break;
      case "1":
        this.classData.type = "中级"
        break;
      case "2":
        this.classData.type = "高级"
        break;
      default:
        console.log("err");
        break;
    }
    console.log(data);
    this.getClassDesData(data._id);
  },
  methods: {
    getList(item){
      this.nowType = item.type;
    },
    async getClassDesData(id){
      let req = {
        collection: "TrainChapter",
        train: id
      };
      let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
      if(res.code == 200){
        this.classChapterData = res.data;
      }
      console.log(res);
    }
  }
}

</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .buyClassDes{
    position: fixed;
    z-index: 120;
    top: 8vh;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
  .buyClassDes .video{
    width: auto;
    height: 30vh;
  }
  .buyClassDes .video video, .buyClassDes .video img{
    width: auto;
    height: 98%;
    margin: 0 auto;
    display: block;
  }
  .buyClassDes .videoTitle{
    position: absolute;
    top: 0;
    width: 100%;
    height: 30vh;
    z-index: 125;
  }
  .buyClassDes .box{
    width: auto;
    height: 6vh;
  }
  .buyClassDes .content{
    width: auto;
    border-top: 1vh solid #4891e4;
    height: 55vh;
  }
  .buyClassDes .content .introduce{
    padding: 10px 40px;
    line-height: 25px;
    font-size: 14px;
    color: #666;
  }
  .buyClassDes .content .introduce > ul > li{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .buyClassDes .content .introduce > ul > li span.type{
    width: auto;
    background-color: #4891e4;
    font-size: 10px;
    text-align: center;
    color: #fff;
    padding: 4px 10px;
  }
  .buyClassDes .content .introduce .desc{
    text-indent: 28px;
  }
  .buyClassDes .content .classChapter{
    /* border-top: 1vh solid #eee; */
    width: auto;
    height: 54vh;
    padding: 0 15px;
    padding-bottom: 2vh;
    overflow-y: scroll;
  }
  .buyClassDes .content .classChapter .scroll{
    bottom: 0;
    height: 54vh;
  }
</style>