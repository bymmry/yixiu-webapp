<template>
  <div class="register">
    <div class="logo" @click="backHome">
      <img class="logoImg" :src="logo" alt="" />
    </div>
    <div class="registerBox">
      <div class="registerDes">
        <!-- <sicon name="phone" scale="2"></sicon> -->
        <input type="text" placeholder="手机号码" v-model="phoneNumber">
      </div>
      <div class="registerDes">
        <input class="phonePassword" type="text" placeholder="验证码" v-model="validateNumber">
        <input @click="getValidate" ref="validate" class="sendPassword" type="button" :value=Validate>
      </div>
      <div class="registerDes">
        <!-- <sicon name="phone" scale="2"></sicon> -->
        <input type="password" placeholder="密码" v-model="password">
      </div>
      <div class="buttons">
        <div class="registerButton">
          <input type="button" @click="register" :class="{'sure': isShowRegister == 1}" value="立即注册">
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
  import md5 from 'js-md5'; //MD5加密
  export default {
    components: {},
    mounted: function () {

    },
    data() {
      return {
        logo: logo,
        phoneNumber: "",
        Validate: "发送验证码",
        validateNumber: "", //验证码
        validate: "", //验证码
        password: "",
        isShowRegister: 0
      }
    },
    methods: {
      backHome() {
        this.$router.push("/home");
      },
      toLogin() {
        this.$router.push("/login");
      },
      async getValidate() { //获取验证码
        if (this.phoneNumber.length != 11) {
          alert("请输入正确的电话号码")
        } else {
          let res = await this.$api.sendData(`https://m.yixiutech.com/sms/send`, {
            "mobile": this.phoneNumber
          });
          if (res.code == 200) {
            this.Validate = "验证码已发送"
            this.$refs.validate.readonly = 'readonly';
            this.$refs.validate.style.color = "#aaa";
            // this.validateNumber = res.data;
            this.validateSure = res.data;
            this.isShowRegister = 1;
          } else {
            this.$toast(res.errMsg);
          }
        }
      },
      async register() {
        let userData = this.getUserInfo();
        
        if (this.password == "" || this.phoneNumber == "") {
          this.$toast("请填写手机和密码");
        } else if (this.validateSure == this.validateNumber) {
          let that = this;
          let data = {
            "mobile": that.phoneNumber,
            "password": md5(that.password)
          }
          console.log(userData.wx.openid)
          if(userData.wx.openid){
            console.log("if")
            let da = {
               //不要明文传输,用md5加密
              wx: userData.wx
            }
            console.log(da);
            data = Object.assign({}, da, data);
          }
          
          console.log(data);
          let res = await this.$api.sendData(`https://m.yixiutech.com/reg`, data);
          if (res.code == 200) {
            this.$toast("注册成功，即将返回登录");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          } else {
            this.$toast(res.errMsg);
          }
        } else if(this.validateSure != this.validateNumber){
          this.$toast("验证码错误");
        }else if(this.validateNumber == ""){
          this.$toast("请输入验证码");
        }

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

  .register .logo {
    width: 50%;
    height: 100px;
    margin: 10% auto;
  }

  .register .logo img {
    width: 100%;
    height: auto;
  }

  .register .registerBox {
    width: auto;
    height: auto;
    margin-top: 15%;
  }

  .register .registerBox .registerDes {
    margin: 20px auto;
    width: 80vw;
    height: 30px;
    border-bottom: 1px solid #fff;
  }

  .register .registerBox .registerDes input {
    width: 80vw;
    padding-left: 10px;
    height: 30px;
    color: #fff;
    border: none;
    background: none;
  }

  .register .registerBox .registerDes input::-webkit-input-placeholder {
    color: #fff;
  }

  .register .registerBox .registerDes input.phonePassword {
    width: 40vw;

  }

  .register .registerBox .registerDes input.sendPassword {
    width: 30vw;
    font-size: 12px;
    float: right;

  }

  .register .buttons .registerButton {
    width: auto;
    text-align: center;
  }

  .register .buttons .registerButton input {
    text-align: center;
    width: 80vw;
    margin: 10px auto;
    padding: 15px 0;
    border: none;
    background: #fff;
    color: #eee;
    border-radius: 5px;
    font-size: 23px;
  }

  .register .buttons .registerButton input.sure {
    color: #3878cd;
  }

  .register .buttons .login {
    text-align: center;
    color: #fff;
    font-size: 13px;
  }

  .register .buttons .login span {
    display: inline-block;
    padding: 5px;
  }

</style>

