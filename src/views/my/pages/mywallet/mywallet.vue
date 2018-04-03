<template>
  <div class="myinfo-container">
    <div class="navBox">
      <div @click="prepage" class="prepageBox"><sicon name="find-leftArr" scale="1.2"></sicon>&nbsp;返回</div>
      <div class="navtitle">我的积分</div>
    </div>
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh"> -->
      <div class="countBox">
        <img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/dribbble2.png" alt="">
        <div class="money">{{userinfo.points}} 分</div>
      </div>

      
    <!-- </van-pull-refresh> -->
    <div class="funcbtn">
      <div class="outmoney" @click="enterIcons">兑换</div>
    </div>
  </div>

</template>

<script>
  import { PullRefresh,Button } from 'vant';
  import { getuserinforByopenId } from '../../../common/api'

  export default {
    data () {
      return {
        isLoading:false,
        userinfo:{}
      }
    },
    components: {
      [PullRefresh.name]: PullRefresh,
      [Button.name]: Button,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      enterIcons(){
        this.functionunavailable()
      },
      //获取用户信息
      async getUserinfo(userData){
        getuserinforByopenId(userData.wx.openid)
        .then(res => {
          // console.log(res)
          this.userinfo = res.data;
        },(err => {
          console.log(err);
        }))
      }
    },
    created() {

      let userData = this.getUserInfo();

      this.getUserinfo(userData);
    }
  }
</script>

<style scoped>
  .myinfo-container{
    overflow: hidden;
    width: 100vw;
 }
  .navBox{
    position: fixed;
    top: 0;
    padding-left: 10px; 
    width: 100vw;
    min-height: 73px;
    height: 15vh;
    margin-left: -3vw;
    display: flex;
    flex-direction:row;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    color: #FCFCFC;
    font-size: 4vw;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
  }
  .navtitle{
    margin-left: 22vw;
  }
  .prepageBox{
    height: 54px;
    line-height: 54px;
    width: 17vw;
    text-align: center;
  }
  .countBox{
    padding-top: 10vh;
    /*height: 70vh;*/
    text-align: center;
  }
  .countBox img{
    width: 186px;
    height: 263.3px;
  }
  .money{
    position: relative;
    color:#3c6b7a;
    font-size: 6vw;
    bottom: 35px;
  }
  .topblank{
    margin-top: 15vh;
  }
  .funcbtn{
    position: fixed;
    bottom: 0vh;
    width: 100%;
    height: 60px;
    text-align: center;
    z-index: 100;
    background: #fff;
    display: flex;
    flex-direction: row;
    border-top: 1px solid #E2DED3;
  }
  .funcbtn div{
    width: 100%;
    line-height: 60px;
    text-align: center;
    color: #2796CB;
    font-size: 6vw;
  }
  .funcbtn .outmoney{
    background: #2796CB;
    color: #fff;
  }
</style>