<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="分享"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <!-- 用户看到的分享 -->
    <div class="messageTag">
      <!-- 信息标题 -->
      <div class="myinfo-title-container">
        <div class="myinfo-title">邀请二维码</div>
      </div>

      <div class="row-line"></div>

      <div class="qrcodeBox">
        <div id="qrcode" ref="qrcode"></div>
      </div>

      <p class="tips">邀请注册成功后，可获得 <span>5元</span></p>
    </div>
  </div>

</template>

<script>
  import './modules/jquery-1.10.2.min.js';
  import './modules/jquery.qrcode.min.js';

  import { NavBar} from 'vant';


  export default {
    data () {
      return {
      }
    },
    components: {
      [NavBar.name]: NavBar
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      qrcode () {
        let userData = this.getUserInfo();
        // console.log(userData)
        let num = userData.mobile-0;
        $("#qrcode").qrcode({
          text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92877f3243727d9b&redirect_uri=http://m.yixiutech.com/yixiuwebapp/register&response_type=code&scope=snsapi_userinfo&IDvalue=${userData._id}&state=3#wechat_redirect`,
          width:150,
          height:150
        });
      }
    },
    mounted () {    //钩子函数，等于vue1.0中的ready
      this.qrcode();
    }
  }
</script>

<style scoped>
  .myinfo-container{
    min-height: 90vh;
    padding: 2vh 3vw 5vh 3vw;
    background: #fff;
    
  }
  .topblank{
    margin-top: 45.6px;
  }
  .messageTag{
    border: 0.1px solid rgb(240, 241, 245);
    padding: 3vh 4vw 4vh 4vw;
    margin-bottom: 4vh;
  }
  .myinfo-title-container{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 2vh;
  }
  .myinfo-title{
    color: #727272;
    font-size: 4vw;
  }
  .row-line{
    width: 100%;
    height: 0.3vh;
    margin-top: 4vh;
    margin-bottom: 4vh;
    background: #ecebeb;
  }
  .myinfo-message{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .qrcodeBox{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tips{
    font-size: 3.8vw;
    margin-top: 4vh;
    text-align: center;
    color: #323643;
  }
  .tips span{
    color: #4BC2C5;
  }
</style>