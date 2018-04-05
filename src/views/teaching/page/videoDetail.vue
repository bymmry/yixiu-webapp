<!-- 培训视频详情页 -->
<template>
  <transition name="slide">
    <div class="videoDetail">
      <div class="title">
        <div class="closeBox" @click="goback">
          <sicon name="close" scale="1.7"></sicon>
        </div>
        <div class="des">
          <p>全网最热IPhone X 维修教程</p>
        </div>
        <div class="buttonBox" @click="tryToWatch">
          <div class="buttonClick">
            <img :src="tryWatch" alt="">
          </div>
          <span>试看</span>
        </div>
      </div>
      <div class="menu">
        <menu-tab :list="listData" v-on:returnListClick="getList"></menu-tab>
      </div>
      <div class="content">
        <class-introduce
          v-if="nowType == 1"
          :introduce="introduceData.introduce" 
          :type="introduceData.type" 
          :time="introduceData.time"
          :number="introduceData.number"
        ></class-introduce>
        <div
          v-if="nowType == 2"
        >请购买后查看</div>
      </div>
      <div class="buyClass">
        <div class="money"><span>￥368.00</span></div>
        <div class="button">
          <button>立即购买</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import menuTab from '../components/menuTab'
  import classIntroduce from '../components/classIntroduce';
  import tryWatch from '@/assets/tryWatch.png'
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
        introduceData: {
          introduce: "面试必备，入门就是最新版本，让你快速掌握修手机",
          type: "初级",
          time: "20",
          number: 2526
        },
        nowType: 1,
        tryWatch: tryWatch
      };
    },

    components: {
      menuTab,
      classIntroduce
    },

    methods: {
      goback: function () {
        this.$router.back();
      },
      getList(item) {
        console.log(item);
        this.nowType = item.type;
      },
      tryToWatch() {
        const toast = this.$createToast({
          txt: '试看',
          time: 1300
        })
        toast.show();
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

  .videoDetail .title {
    height: 30vh;
    background-color: #3055be;
    color: #fff;
  }

  .videoDetail .title .closeBox {
    height: 3vh;
    padding: 2vh;
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
    height: 40px;
  }

  .videoDetail .content {
    position: relative;
    top: 0;
  }
  .videoDetail .buyClass{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8vh;
    background: #fff;
  }
  .videoDetail .buyClass > div.money{
    flex: 5;
    color: #ff2b44;
  }
  .videoDetail .buyClass > div.money span{
    display: inline-block;
    margin-left: 20px;
    font-size: 18px;
    width: auto;
    height: 8vh;
    line-height: 8vh;
  }
  .videoDetail .buyClass > div.button{
    flex: 2;
  }
  .videoDetail .buyClass > div.button button{
    width: 100%;
    height: 100%;
    border: none;
    background-color: #f01414;
    color: #fff;
  }
</style>

