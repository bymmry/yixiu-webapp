<!-- 培训视频详情页 -->
<template>
  <transition name="slide">
    <div class="videoDetail">
      <div class="video" ref="videoBox">
        <video ref="video" :src="introduceData.info.video"></video>
      </div>
      <div class="title">
        <span class="closeBox" @click="goback">
          <sicon name="back" scale="2.5" color="#fff"></sicon>
        </span>
        <div class="box">
          <div class="des">
            <p>{{introduceData.desc}}</p>
          </div>
          <div class="buttonBox" @click="tryToWatch">
            <div class="buttonClick">
              <img :src="tryWatch" alt="">
            </div>
            <span>试看</span>
          </div>
        </div>
        
      </div>
      <div class="menu">
        <menu-tab :list="listData" v-on:returnListClick="getList"></menu-tab>
      </div>
      <div class="content">
        <class-introduce
          v-if="nowType == 1"
          :introduce="introduceData.desc" 
          :type="introduceData.type" 
          :time="introduceData.info.time"
          :number="introduceData.number"
        ></class-introduce>
        <div v-if="nowType == 2" class="classChapter">
          <cube-scroll :data="classChapterData" class="scroll">
          <class-chapter 
            v-if="classChapterData.length != 0"
            v-for="(cla, index) in classChapterData"
            :key="index"
            :name="cla.name"
            :index="cla.index"
            :claId="cla._id"
            :train="introduceData._id"
            :isfree="free"
          ></class-chapter>
          </cube-scroll>
        </div>
      </div>
      <div class="buyClass">
        <sure-buy 
          :totalFee="introduceData.price"
          :id="introduceData._id"
        ></sure-buy>
      </div>
    </div>
  </transition>
</template>

<script>
  import menuTab from '../components/menuTab'
  import classIntroduce from '../components/classIntroduce'
  import tryWatch from '@/assets/tryWatch.png'
  import classChapter from '../components/classChapter.vue';
  import sureBuy from '../components/sureBuy.vue';
  export default {
    data() {
      return {
        listData: [{
            name: '介绍',
            type: 1
          },
          {
            name: '章节',
            type: 2
          }
        ],
        introduceData: {},
        levelType: "",
        nowType: 1,
        tryWatch: tryWatch,
        classChapterData: [],
        free: false
      };
    },

    components: {
      menuTab,
      classIntroduce,
      classChapter,
      sureBuy
    },
    created(){
      let data = this.$route.params.data;
      console.log(data);
      if(data._id){
        this.introduceData = data;
        if(this.introduceData.price == 0){
          this.free = true;
        }else{
          this.free = false;
        }
        switch (data.level)
        {
          case "0":
            this.introduceData.type = "初级"
            break;
          case "1":
            this.introduceData.type = "中级"
            break;
          case "2":
            this.introduceData.type = "高级"
            break;
          default:
            console.log("err");
            break;
        }
        this.getClassDesData(data._id);
      }
    },
    methods: {
      goback: function () {
        this.$router.back();
      },
      getList(item) {
        this.nowType = item.type;
      },
      tryToWatch() {
        // const toast = this.$createToast({
        //   txt: '试看',
        //   time: 1300
        // })
        // toast.show();
        if(this.introduceData.info.video == ""){
          this.$toast("商家暂没有添加试看视频")
        }else{
          let player = this.$refs.video;
          let videoBox = this.$refs.videoBox;
          console.log(player);
          if (player.paused){
            // videoBox.style.zIndex = 115;
            player.play();
            // oBtn.value = "Pause";
          }
        }
        
        
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

  .videoDetail {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    min-height: 480px;
    z-index: 15;
    background: #f1f5f6;
  }
  .videoDetail .video{
    position: fixed;
    width: 100%;
    height: 30vh;
    overflow: hidden;
    top: 0;
    z-index: 105;
    height: 30vh;
  }
  .videoDetail .video video{
    display: block;
    width: auto;
    height: 100%;
    margin: 0 auto;
  }
  .videoDetail .title {
    height: 30vh;
    /* background-color: #3055be; */
    color: #fff;
    position: relative;
    z-index: 110;
  }

  .videoDetail .title .closeBox {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    background: #aeb3b4;
    opacity: 0.7;
    border-radius: 50%;
    top: 15px;
    left: 15px;
    z-index: 300;
  }
  .videoDetail .title .closeBox svg{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-60%) translateY(-50%);
  }
  .videoDetail .title .box{
    padding-top: 6vh;
  }
  .videoDetail .title .des,
  .videoDetail .title .buttonBox {
    padding-top: 20px;
    text-align: center;
  }

  .videoDetail .title .buttonBox .buttonClick {
    display: inline-block;
    vertical-align: middle;
    width: 45px;
    height: 45px;
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    z-index: 10px;
  }

  .videoDetail .title .buttonBox .buttonClick img {
    width: 20px;
    height: auto;
    /* margin: 0 auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .videoDetail .title .buttonBox span {
    display: inline-block;
    vertical-align: middle;
    width: 90px;
    height: 30px;
    margin-left: -25px;
    border-radius: 16px;
    border: 1px solid #afbee3;
    line-height: 30px;
    font-size: 13px;
    background-color: #313d61;
  }

  .videoDetail .menu {
    width: 100%;
    height: 6vh;
  }

  .videoDetail .content {
    position: relative;
    border-top: 1vh solid #eee;
    top: 0vh;
    padding-top: 1vh;
    height: 54vh;
    background-color: #fff;
  }
  .videoDetail .content .classChapter{
    /* border-top: 1vh solid #eee; */
    width: auto;
    height: 52vh;
    padding: 0 15px;
    padding-bottom: 2vh;
    overflow-y: scroll;
  }
  .videoDetail .content .classChapter .scroll{
    bottom: 0;
    height: 52vh;
  }
  .videoDetail .buyClass{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8vh;
    background: #fff;
    border-top: 1px solid #eee;
  }
 
</style>

