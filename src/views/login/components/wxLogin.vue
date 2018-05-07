<!-- 微信快捷登录 -->
<template>
  <div class="wxLogin" @click="wechatLogin">
    <cube-button class="button"><sicon name="wechat" scale="2.3"></sicon><span>微信一键登录</span></cube-button>
  </div>
</template>

<script>
const appid = 'wx92877f3243727d9b';
export default {
  data () {
    return {
    };
  },

  components: {},
  methods: {
    async wechatLogin(){
      let appid = 'wx09e56891c8a3ff17';
      let redirect_uri = 'https://m.yixiutech.com/yixiuwebapp/home';
      let response_type = 'code';
      let scope = 'snsapi_login';
      let state = '2';
      let url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`
      console.log(url);
      let code = await this.$api.getData(url);
      console.log(code);
      alert(code);
    }
  }
}

</script>

<style scoped>
  .wxLogin{
    width: 100%;
    height: auto;
  }
  .wxLogin .button{
    margin: 0 auto;
    color: #fff;
    background-color: #13c300;
    width: 80vw;
    border-radius: 8px;
    box-shadow: 0 2px 4px #26d113;
  }
  .wxLogin .button svg, .wxLogin .button span{
    vertical-align: middle;
    margin-left: 5px;
  }
</style>