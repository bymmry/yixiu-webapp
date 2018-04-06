<template>
  <div class="register">
    <div class="logo" @click="backHome">
      <img class="logoImg" :src="logo" alt="" />
    </div>
    <div class="registerBox">
      <div class="registerDes">
        <!-- <sicon name="phone" scale="2"></sicon> -->
        <input type="text" placeholder="手机号码">
      </div>
      <div class="registerDes">
        <input class="phonePassword" type="text" placeholder="验证码">
        <input class="sendPassword" type="button" value="发送验证码">
      </div>
      <div class="registerDes">
        <!-- <sicon name="phone" scale="2"></sicon> -->
        <input type="text" placeholder="密码">
      </div>
      <div class="buttons">
      <div class="registerButton">
        <button>立即注册</button>
      </div>
      <div class="login">
        <span @click="toLogin">已有账号，返回登录</span>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  export default {
    components: {},
    mounted: function () {

    },
    data() {
      return {
        logo: logo
      }
    },
    methods: {
      backHome(){
        this.$router.push("/home");
      },
      toLogin(){
        this.$router.push("/login");
      }
    }
  }

</script>

<style scoped>
  .register {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    min-height: 480px;
    /* background: url('./log-bg.jpg') center center no-repeat; */
    /* background-size: 100% 100%; */
    background: -webkit-linear-gradient(left top, #6bc8b7, #3878cd);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(bottom right, #6bc8b7, #3878cd);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(bottom right, #6bc8b7, #3878cd);
    /* Firefox 3.6 - 15 */
    background: linear-gradient(to bottom right, #6bc8b7, #3878cd);
    /* 标准的语法 */
  }
  .register .logo{
    width: 50%;
    height: auto;
    margin: 10% auto;
  }
  .register .logo img{
    width: 100%;
    height: auto;
  }
  .register .registerBox{
    width: auto;
    height: auto;
    margin-top: 15%;
  }
  .register .registerBox .registerDes{
    margin: 20px auto;
    width: 80vw;
    height: 30px;
    border-bottom: 1px solid #fff;
  }
  .register .registerBox .registerDes input{
    width: 80vw;
    padding-left: 10px;
    height: 30px;
    color: #fff;
    border: none;
    background: none;
  }
  .register .registerBox .registerDes input::-webkit-input-placeholder{
    color: #fff;
  }
  .register .registerBox .registerDes input.phonePassword{
    width: 40vw;

  }
  .register .registerBox .registerDes input.sendPassword{
    width: 30vw;
    font-size: 12px;
    float: right;
    
  }
  .register .buttons .registerButton{
    width: auto;
    text-align: center;
  }
  .register .buttons .registerButton button{
    width: 140px;
    margin: 20px auto;
    border: none;
    background: none;
    color: #fff;
    font-size: 23px;
  }
  .register .buttons .login{
    text-align: center;
    color: #fff;
    font-size: 13px;
  }
  .register .buttons .login span{
    display: inline-block;
    padding: 5px;
  }

</style>
