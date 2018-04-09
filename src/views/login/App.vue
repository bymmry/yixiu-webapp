<template>
  <div class="login">
    <div class="logo" @click="backHome">
      <img class="logoImg" :src="logo" alt="" />
    </div>
    <h3>Welcome</h3>
    <div class="loginBox">
      <div class="loginDes">
        <span>用户名</span>
        <input type="text" placeholder="" v-model="username">
      </div>
      <div class="loginDes">
        <span>密码</span>
        <input type="password" v-model="password">
      </div>
    </div>
    <div class="buttons">
      <div @click="loginNow" class="loginButton">
        <button>立即登录</button>
      </div>
      <div class="register">
        <span @click="forgetPassword">忘记密码?</span>|<span @click="toRegister">立即注册</span>
      </div>
    </div>
    <wx-login v-if="false" class="wxLogin"></wx-login>
  </div>
</template>

<script>
  import logo from '@/assets/logo.png'
  import wxLogin from './components/wxLogin.vue'
  import md5 from 'js-md5'; //MD5加密
  export default {
    components: {
      wxLogin
    },
    data() {
      return {
        logo: logo,
        username: "",
        password: ""
      }
    },
    methods: {
      backHome(){
        this.$router.push("/home");
      },
      toRegister(){
        this.$router.push("/register");
      },
      async loginNow(){
        let that = this;
        let data = {
          "username":that.username,//这里填手机号,用这个字段名称是为了以后可以拓展
          "password":md5(that.password)//注册的时候用什么加密,这里就用什么加密方式,不要明文
        }

        let res = await this.$api.sendData(`https://m.yixiutech.com/login`, data);
        console.log(res);
        if(res.code == 200){
          this.$toast('登录成功');
          let userData = JSON.stringify(res.data);
          sessionStorage.setItem("userData", userData);
          this.$router.push("/my");
        }else{
          this.$toast(res.errMsg);
        }
      },
      forgetPassword(){
        this.$router.push("/forget");
      }
    }
  }

</script>

<style scoped>
  .login {
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
  .login .logo{
    width: 50%;
    height: auto;
    margin: 10% auto;
  }
  .login .logo img{
    width: 100%;
    height: auto;
  }
  .login h3 {
    font-size: 45px;
    color: #fff;
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 5%;
  }
  .login .loginBox{
    width: auto;
    height: auto;
    margin-top: 10%;
  }
  .login .loginBox .loginDes{
    margin: 0 auto;
    padding: 20px 0;
    width: 210px;
    height: 30px;
  }
  .login .loginBox .loginDes span{
    display: inline-block;
    width: 60px;
    height: 20px;
    line-height: 20px;
    color: #fff;
  }
  .login .loginBox .loginDes input{
    width: 150px;
    height: 20px;
    border: none;
    float: right;
    background: none;
    border-bottom: 1px solid #fff;
  }
  .login .buttons .loginButton{
    width: auto;
    text-align: center;
  }
  .login .buttons .loginButton button{
    text-align: center;
    width: 80vw;
    margin: 10px auto;
    padding: 15px 0;
    border: none;
    background: #fff;
    color: #3878cd;
    border-radius: 5px;
    font-size: 23px;
  }
  .login .buttons .register{
    text-align: center;
    color: #fff;
    font-size: 13px;
  }
  .login .buttons .register span{
    display: inline-block;
    padding: 5px;
  }
  .wxLogin{
    position: absolute;
    bottom: 5vh;
  }
</style>
