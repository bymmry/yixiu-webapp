<!-- 店铺详情页 -->
<template>
  <transition name="slide">
    <div class="shopBox">
      <span @click="back" class="back">
        <sicon name="back" scale="2.5" color="#fff"></sicon>
      </span>
      <cube-scroll class="scroll shop">
        <div class="shopContent">
          <div class="shopImg">
            <img :src="shopInfo.cover" alt="">
          </div>
          <div class="shopDes">
            <h3><sicon name="shop" scale="2.0" color="#0084fd"></sicon><span>{{shopInfo.name}}</span></h3>
            <!-- <p>均价</p> -->
            <ul>
              <li>营业时间：
                <span v-if="shopInfo.businessHours">{{shopInfo.businessHours[0]}}</span>
              </li>
              <li>联系方式：
                <span><a :href="telContactNumber">{{shopInfo.contactNumber}}</a></span>
              </li>
              <li>服务方式：
                <span v-for="(ser,i) in serviceWays" :key="i">{{ser}}/</span>
              </li>
            </ul>
            <p class="address">
              <sicon name="address" scale="2.0" color="#0084fd"></sicon>
              <span>位置：</span>
              <span class="addressDes">{{shopInfo.address}}</span>
            </p>
            <div class="otherInfo">
              <span>评分：{{shopInfo.score}}</span>
              <span>成交单: </span>
              <span>{{distance}}</span>
            </div>
          </div>
          <div class="about">
            <h3><span>评价</span></h3>
            <h4>服务评价（0）</h4>
            <div class="aboutDes">
              暂无评价
            </div>

          </div>
        </div>
      </cube-scroll>
      <cube-button @click="gotoDes" class="buttons">点我开始修机</cube-button>
    </div>
  </transition>
</template>

<script>
  import { getShopData } from '../api'
  export default {
    data() {
      return {
        shopInfo: {},
        telContactNumber: "",
        serviceWays: [],
        distance: ""
      };
    },

    components: {},
    created(){
      let shopId = this.$route.params.id;
      let that = this;
      if (!shopId) {
        this.$router.push('/home');
        return
      }
      if(shopId){
        getShopData(shopId).then((res) => {
          console.log(res);
          if (!res.data._id) {
            this.$router.push('/home');
            return
          }
          if(res.code === 200){
            this.shopInfo = res.data;
            console.log(this.shopInfo);
            this.telContactNumber = `tel:${this.shopInfo.contactNumber}`;
            this.serviceWays = this.shopInfo.serviceWay;
            this.distance = that.getDistance(this.shopInfo);
            console.log(...this.serviceWays)
          }
        }, function (err) {
          console.log(err);
        })
      }
    },
    methods: {
      back(){
        this.$router.back();
      },
      gotoDes(){
        this.$router.push({
          name: "shopContent",
          params: {
            data: this.shopInfo
          }
        })
      },
      getDistance(val){
        let that = this;
        let lng = localStorage.getItem('lng');
        let lat = localStorage.getItem('lat');
        if(val.position){
            let dis = parseInt(this.getGreatCircleDistance(val.position.lat, val.position.lng, lat, lng));
            console.log(dis);
            if(dis >= 1000){
              if(dis >= 9999999){
                dis = "太远啦"
              }else{
                dis = parseInt(dis/1000);
                dis = `${dis}km`;
              }
            }else{
              dis = `${dis}m`;
            }
            return dis;
          }else{
            return "未知";
          }
      }
    }
  }

</script>

<style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .shopBox{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 50;
  }
  .scroll {
    width: 100%;
    height: 90vh;
  }

  .shop {
    width: 100%;
  }

  .back {
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
  .back svg{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-60%) translateY(-50%);
  }

  .shop .shopContent {
    width: 100%;
    height: auto;
    margin-top: 10px;
  }

  .shop .shopContent .shopImg {
    width: 100%;
    height: 260px;
  }

  .shop .shopContent .shopImg img {
    display: block;
    height: 100%;
    width: auto;
    margin: 0 auto;
  }

  .shop .shopContent .shopDes {
    border-top: 8px solid #f4f4f4;
    width: auto;
    height: auto;
    padding: 0 10px;
  }

  .shop .shopContent .shopDes h3 {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
  .shop .shopContent .shopDes h3 svg, .shop .shopContent .shopDes h3 span{
    vertical-align: middle;
    margin-right: 10px;
  }

  .shop .shopContent .shopDes>ul {
    width: auto;
    height: auto;
  }

  .shop .shopContent .shopDes>ul>li {
    width: auto;
    height: 30px;
    line-height: 30px;
    color: #686868;
    font-size: 15px;
  }
  .shop .shopContent .shopDes>ul>li span{
    font-size: 13px;
  }
  .shop .shopContent .shopDes>ul>li span:first-child {
    margin-left: 10px;
  }

  .shop .shopContent .shopDes p.address {
    width: auto;
    height: auto;
    line-height: 55px;
    color: #2a2a2a;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
  .shop .shopContent .shopDes p.address svg, .shop .shopContent .shopDes p.address span{
    vertical-align: middle;
    /* margin-right: 10px; */
  }
  .shop .shopContent .shopDes p.address span.addressDes{
    font-size: 12px;
  }

  .shop .shopContent .shopDes .otherInfo {
    width: auto;
    height: 30px;
    display: flex;
  }

  .shop .shopContent .shopDes .otherInfo>span {
    flex: 1;
    line-height: 30px;
    font-size: 13px;
    color: #727272;
  }
  .shop .shopContent .shopDes .otherInfo>span:nth-child(2){
    text-align: center;
  }
  .shop .shopContent .shopDes .otherInfo>span:nth-child(3){
    text-align: right;
  }

  .shop .shopContent .about {
    width: auto;
    height: auto;
  }

  .shop .shopContent .about h3 {
    width: auto;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    background: #eee;
    color: #888888;
  }
  .shop .shopContent .about h3 span{
    position: relative;
  }
  .shop .shopContent .about h3 span::before{
    content: "";
    width: 20px;
    height: 1px;
    border-top: 1px solid #888888;
    position: absolute;
    left: -30px;
    top: 6px;
  }
  .shop .shopContent .about h3 span::after{
    content: "";
    width: 20px;
    height: 1px;
    border-top: 1px solid #888888;
    position: absolute;
    margin-left: 10px;
    top: 6px;
  }

  .shop .shopContent .about h4 {
    width: auto;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
  }
  .shop .shopContent .about .aboutDes{
    width: auto;
    height: auto;
    padding: 20px 15px;
  }
  .buttons{
    position: fixed;
    bottom: 0;
    background: #0084fd;
  }
</style>

