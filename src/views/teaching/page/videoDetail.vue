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
    </div>
  </transition>
</template>

<script>
import menuTab from '../components/menuTab'
import tryWatch from '@/assets/tryWatch.png'
  export default {
    data() {
      return {
        listData: [
          {name: '介绍'},
          {name: '章节'}
        ],
        tryWatch: tryWatch
      };
    },

    components: {
      menuTab
    },

    methods: {
      goback: function () {
        this.$router.back();
      },
      getList(item){
        console.log(item);
      },
      tryToWatch () {
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
    background: #fff;
  }
  .videoDetail .title{
    height: 30vh;
    background-color: #3055be;
    color: #fff;
  }
  .videoDetail .title .closeBox {
    height: 3vh;
    padding: 2vh;
  }
  .videoDetail .title .des, .videoDetail .title .buttonBox{
    padding-top: 20px;
    text-align: center;
  }
  .videoDetail .title .buttonBox .buttonClick{
    display: inline-block;
    vertical-align: middle;
    width: 45px;
    height: 45px;
    background-color: #fff;
    border-radius: 50%;
    position: relative;
    z-index: 10px;
  }
  .videoDetail .title .buttonBox .buttonClick img{
    width: 20px;
    height: auto;
    /* margin: 0 auto; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .videoDetail .title .buttonBox span{
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

</style>

