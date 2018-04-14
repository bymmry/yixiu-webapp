<template>
  <div class="header">
    <div class="back" @click="back">
      <sicon name="back" scale="1.7"></sicon>
      <span>返回</span>
    </div>
    <div class="title">
      <h3>工程师培训</h3>
    </div>
    <div class="my" @click="toMy">
      <sicon name="my" scale="2"></sicon>
    </div>
    <cube-popup :mask="true" :center="true" type="my-popup" ref="myInfo">
      <div class="myInfo">
        <div class="myInfotitle">
          <h3>我的课程</h3>
          <span @click="closeMy">
            <sicon name="close" scale="2.0" color="#ff0000"></sicon>
          </span>
        </div>
        <ul>
          <li @click="toMyClass">已购课程</li>
          <li @click="toMyLove">收藏课程</li>
        </ul>
      </div>
    </cube-popup>
  </div>
</template>

<script>
  export default {
    name: 'theHeader',
    data(){
      return {
        isShowMyInfo:true
      }
    },
    methods: {
      back: function () {
        this.$router.push("/home");
      },
      toMy () {
        let myInfo = this.$refs.myInfo;
        myInfo.show();
        // if(this.isShowMyInfo){
        //   this.isShowMyInfo = !this.isShowMyInfo;
        //   myInfo.show();
        // }else{
        //   this.isShowMyInfo = !this.isShowMyInfo;
        //   myInfo.hide();
        // }
        console.log("my")
      },
      closeMy(){
        console.log("close")
        let myInfo = this.$refs.myInfo;
        myInfo.hide();
      },
      toMyClass(){
        console.log("toMyClass");
        let myInfo = this.$refs.myInfo;
        myInfo.hide();
        this.$router.push("/hasBuy");
      },
      toMyLove(){
        this.$toast("该功能即将开放");
        let myInfo = this.$refs.myInfo;
        myInfo.hide();
      }
    }
  };
</script>

<style scoped>
  .header{
    display: flex;
    width: auto;
    height: 7vh;
    padding: 0 10px;
    background: #fff;
  }
  .header > div{
    line-height: 7vh;
  }
  .header > div.back{
    flex: 3;
    font-size: 13px;
    color: #535456;
  }
  .header > div svg, .header > div.back span{
    vertical-align: middle;
  }
  .header > div.title{
    flex: 15;
  }
  .header > div.title > h3{
    text-align: center;
    color: #f85;
  }
  .header > div.my{
    flex: 3;
    text-align: center;
    /* position: relative; */
  }
  .header .myInfo{
    width: 70vw;
    height: 160px;
    /* height: auto; */
    border: 1px solid #eee;
    border-top: none;
    background: #fff;
  }
  .header .myInfotitle{
    border-bottom: 1px solid #eee;
  }
  .header .myInfotitle span{
    float: right;
    margin-right: 10px;
  }
  .header .myInfo h3{
    display: inline-block;
    width: auto;
    height: 59px;
    line-height: 60px;
    padding: 0 10px;
    color: #0090fd;
  }
  .header .myInfo ul{
    width: auto;
    height: 60px;
    padding: 0 25px;
  }
  .header .myInfo ul li{
    height: 49px;
    line-height: 50px;
    font-size: 13px;
    border-bottom: 1px solid #eee;
  }
</style>
