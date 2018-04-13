<!-- 下单 -->
<template>
  <div class="sureBuy">
    <div class="money"><span>￥{{totalFee/100}}</span></div>
    <div class="button">
      <button @click="buyClass">立即购买</button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import wx from "weixin-js-sdk";
export default {
  data () {
    return {
    };
  },
  props: {
    totalFee: Number,
    id: String
  },

  components: {},

  methods: {
    buyClass(){
      //  确认下单
      Dialog.confirm({
        title: '是否立即支付',
      }).then(() => {
      // on confirm
      console.log(this.totalFee, this.id);
      let payInfo = {
        payment: this.totalFee,
        id: this.id
      }
      }).catch(() => {
        // on cancel
        console.log("取消");
      });
    },
    async pay(){
      let isWxMini;
      // console.log(data);
      isWxMini = window.__wxjs_environment === 'miniprogram';

      if(isWxMini){
        //小程序环境
        let jumpUrl = encodeURIComponent(window.location.origin);
        let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(payInfo)}&jumpUrl=${jumpUrl}`;
        wx.miniProgram.navigateTo({
          url: path
        });
      }else {
        //非小程序环境
        let userData = this.getUserInfo();//获取用户信息
        
        let req = {
          total_fee: this.totalFee,
          openid: userData.wx.openid,
          trade_type: 'JSAPI'
        }
        let res = await this.$api.sendData('https://m.yixiutech.com/wx/pay/sign', req);

        alert(JSON.stringify(res));
      }
    }
  }
}

</script>

<style scoped>
  .sureBuy{
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8vh;
    background: #fff;
    border-top: 1px solid #eee;
  }
  .sureBuy > div.money{
    flex: 5;
    color: #ff2b44;
  }
  .sureBuy > div.money span{
    display: inline-block;
    margin-left: 20px;
    font-size: 18px;
    width: auto;
    height: 8vh;
    line-height: 8vh;
  }
  .sureBuy > div.button{
    flex: 2;
  }
  .sureBuy > div.button button{
    width: 100%;
    height: 100%;
    border: none;
    background-color: #f01414;
    color: #fff;
  }
</style>