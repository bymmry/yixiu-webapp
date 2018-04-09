<!-- 忘记密码 -->
import { fadegettracking } from '../../../../../yixiu-seller/src/views/common/api';
<template>
  <div class="forget">
    <div class="back" @click="back">
      <sicon name="back" scale="1.7"></sicon>
      <span>返回</span>
    </div>
    <div class="title">
      <h3>修改密码</h3>
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
        <input type="password" placeholder="新密码" v-model="password">
      </div>
      <div class="registerDes">
        <!-- <sicon name="phone" scale="2"></sicon> -->
        <input type="password" placeholder="确认密码" v-model="passwordSure">
      </div>
      <div class="buttons" v-if="isShowSure">
        <div class="registerButton">
          <input @click="register" :readonly="isReadonly" :class="{'sure': isShowRegister == 1}" value="确认修改">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        phoneNumber: "", //电话号码
        validateNumber: "", //验证码
        Validate: "发送验证码",
        password: "",
        passwordSure: "",
        isShowSure: false // 是否显示确认修改密码
      };
    },

    components: {},

    methods: {
      back() {
        this.$router.back();
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
            this.isShowSure = true;
          } else {
            this.$toast(res.errMsg);
          }
        }
      },
    }
  }

</script>

<style scoped>
  .forget {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 101;
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

  .forget>div.back {
    width: 100%;
    height: 8vh;
    line-height: 8vh;
    font-size: 13px;
    color: #535456;
  }

  .forget>div svg,
  .forget>div.back span {
    vertical-align: middle;
  }

  .forget .title{
    width: auto;
    padding: 15px;
    color: #fff;
  }
  .forget .registerBox {
    width: auto;
    height: auto;
    margin-top: 5%;
  }

  .forget .registerBox .registerDes {
    margin: 20px auto;
    width: 80vw;
    height: 30px;
    border-bottom: 1px solid #fff;
  }

  .forget .registerBox .registerDes input {
    width: 80vw;
    padding-left: 10px;
    height: 30px;
    color: #fff;
    border: none;
    background: none;
  }

  .forget .registerBox .registerDes input::-webkit-input-placeholder {
    color: #fff;
  }

  .forget .registerBox .registerDes input.phonePassword {
    width: 40vw;

  }

  .forget .registerBox .registerDes input.sendPassword {
    width: 30vw;
    font-size: 12px;
    float: right;

  }

  .forget .buttons .registerButton {
    width: auto;
    text-align: center;
  }

  .forget .buttons .registerButton input {
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

  .forget .buttons .registerButton input.sure {
    color: #3878cd;
  }

</style>

