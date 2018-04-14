<!-- 下单 -->
<template>
  <div class="sureBuy">
    <div class="money">
      <span v-if="totalFee != 0">￥{{totalFee/100}}</span>
      <span v-if="totalFee == 0">该视频免费</span>
    </div>
    <div class="button" v-if="totalFee != 0">
      <button @click="buyClass">立即购买</button>
    </div>
    <div class="button" v-if="totalFee == 0">
      <button>免费</button>
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
      let userData = this.getUserInfo();
      Dialog.confirm({
        title: '是否立即支付',
      }).then(() => {
        // on confirm
        console.log(this.totalFee, this.id);
        let payInfo = {
          payment: this.totalFee,
          id: this.id,
          userId: userData._id,
          type: 2
        }
        this.pay(payInfo);
      }).catch(() => {
        // on cancel
        console.log("取消");
      });
    },
    async pay(payInfo){
      let isWxMini;
      // console.log(data);
      isWxMini = window.__wxjs_environment === 'miniprogram';

      if(isWxMini){
        //小程序环境
        alert("小程序环境")
        let jumpUrl = encodeURIComponent(window.location.origin);
        let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(payInfo)}&jumpUrl=${jumpUrl}`;
        wx.miniProgram.navigateTo({
          url: path
        });
      }else {
        //非小程序环境
        alert("非小程序环境")
        // let userData = this.getUserInfo();//获取用户信息
        let openid = sessionStorage.getItem("openid");
        let that = this;
        
        let req = {
          total_fee: this.totalFee,
          openid: userData.wx.openid,
          trade_type: 'JSAPI'
        }
        let sign = await this.$api.sendData('https://m.yixiutech.com/wx/gzh/order/sign', req);
        
        if(openid){
            // alert(openid);
            let req = {
              total_fee: this.TotalFee*100,
              openid: openid,
              trade_type: 'JSAPI'
            }
            let sign = await this.$api.sendData('https://m.yixiutech.com/wx/pay/sign', req);
            if(sign.code == 200){
              function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', sign.data,
                    function(wxres){     
                        if(wxres.err_msg == "get_brand_wcpay_request:ok" ) {
                          that.paySuccess(payInfo);
                        }else{
                          that.$toast("支付失败");
                        }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
                    }
                ); 
              }
              if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              }else{
                onBridgeReady();
              }
            }
          }
      }
    },
    async paySuccess(payInfo){
      let req = {
        collection: "TrainUser",
        state: "hasBuy",
        user: payInfo.userId,
        train: payInfo.id
      }
      let res = await this.$api.sendData('https://m.yixiutech.com/sql/add', req);
      if(res.code == 200){
        this.$toast("支付成功");
        this.$router.push("/hasBuy");
      }else{
        this.$toast("支付失败");
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