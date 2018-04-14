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
        <button @click="getCode(formData)" class="sendPassword" :disabled="!show" ref="validate">
          <span v-show="show">获取验证码</span>
          <span v-show="!show" class="count">{{count}} s</span>
        </button>
        <!-- <input @click="getValidate" ref="validate" class="sendPassword" type="button" :value=Validate> -->
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
  const TIME_COUNT = 60;
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
        isShowRegister: 0,
        formData: {
          phone:'',
          code:'',
        },
        show: true,
        count: '',
        timer: null,
      }
    },
    methods: {
      backHome() {
        this.$router.push("/home");
      },
      toLogin() {
        this.$router.push("/login");
      },
      getCode(formData){
        if (!this.timer) {
          this.getValidate();
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.$refs.validate.style.color = "#3878cd";
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      async getValidate() { //获取验证码
        if (this.phoneNumber.length != 11) {
          alert("请输入正确的电话号码")
        } else {
          this.$refs.validate.style.color = "#aaa";
          let res = await this.$api.sendData(`https://m.yixiutech.com/sms/send`, {
            "mobile": this.phoneNumber
          });
          if (res.code == 200) {
            // this.validateNumber = res.data;
            this.validateSure = res.data;
            this.isShowRegister = 1;
          } else {
            this.$toast(res.errMsg);
          }
        }
      },
      async register() {
        // let userData = this.getUserInfo();
        if(sessionStorage.getItem("openid")){
          let openid = sessionStorage.getItem("openid");
          alert(openid);
          let userInfoStr = sessionStorage.getItem("userData");
        

          if (this.password == "" || this.phoneNumber == "") {
            this.$toast("请填写手机和密码");
          } else if (this.validateSure == this.validateNumber) {
            let that = this;
            let nowopenid = [];
            nowopenid.push(openid);
            let data = {
              "mobile": that.phoneNumber,
              "password": md5(that.password),
              wxopenid: nowopenid
            }

            if(typeof userInfoStr === "string"){
              let user = JSON.parse(userInfoStr);
              if(user){
                let da = {
                  //不要明文传输,用md5加密
                  wx: user.wx
                }
                data = Object.assign({}, da, data);
              }
            }
            
            alert(JSON.stringify(data));
            // let res = await this.$api.sendData(`https://m.yixiutech.com/reg`, data);
            console.log(res);
            // alert(JSON.stringify(res))
            if (res.code == 200) {
              this.$toast("注册成功");
              sessionStorage.setItem("userData", JSON.stringify(res.data));
              setTimeout(() => {
                this.$router.push("/my");
              }, 1000);
            } else {
              // if(code == 4001){
              //   let req = {
              //     collection:'User',
              //     '$addToSet': {
              //       wxopenid: openid.openid
              //     }
              //   }
              //   let res = await this.$api.sendData(`https://m.yixiutech.com/reg`, req);
              // }else{
                this.$toast(res.errMsg);
              // }
            }
          } else if(this.validateSure != this.validateNumber){
            this.$toast("验证码错误");
          }else if(this.validateNumber == ""){
            this.$toast("请输入验证码");
          }
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

  .register .registerBox .registerDes button.sendPassword {
    width: 30vw;
    height: 25px;
    border: 1px solid #eee;
    background: #fff;
    color: #3878cd;
    border-radius: 5px;
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

