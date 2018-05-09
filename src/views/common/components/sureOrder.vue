<!-- 手机类商品下单 -->
<template>
  <div class="sureOrder">
    <van-button @click="sureOrder" :disabled="nextStepButtonDisabled" bottom-action>
      <sicon name="nextStep" scale="1.8"></sicon><span>提交订单￥{{this.TotalFee}}</span>
    </van-button>
  </div>
</template>

<script>
  import wx from "weixin-js-sdk";
  import { Toast, Button, Dialog } from 'vant';
  import { sureOrder } from '../api';
  export default {
    name: 'sure-order',
    components: {
      [Button.name]: Button,
      [Toast.name]: Toast,
      [Dialog.name]: Dialog
    },
    data() {
      return {
        shopServer: []
      }
    },
    props: {
      data: {
        type: Object
      },
      TotalFee: {
        type: Number,
        default: 0
      },
      serverId: {
        type: Array,
        default: function () {
          return []
        }
      },
      shopId: {
        type: Array,
        default: function () {
          return []
        }
      },
      sureOrderData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      nextStepButtonDisabled: {
        type: Boolean,
        default: true
      },
      orderId: {
        type: String,
        default: ""
      },
      state: {
        type: Number,
        default: 0
      }
    },
    watch: {
      TotalFee: function (val) {
        this.TotalFee = val;
      },
      serverId: function (val) {
        return val;
      },
      sureOrderData: function (val) {
        return val;
      }
    },
    methods: {
      sureOrder() {
        let orderData = this.sureOrderData;
        //  确认下单
        Dialog.confirm({
          title: '是否立即支付',
        }).then(() => {
          // on confirm
          console.log(orderData);
          if(this.state == 10){ // 已付款订单
            let data = {
              _id: this.orderId
            }
            this._pay(orderData, data);
          
          }else{
            sureOrder(orderData).then((res) => {
              console.log(res);
              if(res.code == 200){
                let mess = {
                  type: "未付款",
                  remark: "下单成功，请尽快付款！"
                }
                this.sendMessage(mess);
                // console.log(this.data);
                this._pay(orderData, res.data);
              }
            });
          }
          
        }).catch(() => {
          // on cancel
          console.log("取消");
        });

      },
      async sendMessage(mess){
        let userData = this.getUserInfo();
        let phoneNumber = userData.mobile;
        let message = {
          "mobile": phoneNumber,
          "status": mess.type,
          "remark": mess.remark
        };
        let sys = await this.$api.sendData('https://m.yixiutech.com/sms/orderSend', message);
      },
      async _pay(payInfo, res) {
        let isWxMini;
        let openid = sessionStorage.getItem("openid");
        let that = this;
        // console.log(data);
        isWxMini = window.__wxjs_environment === 'miniprogram';

        payInfo = Object.assign({}, payInfo, {type: 1});

        if(isWxMini){
          //小程序环境
          // alert("小程序环境")
          let jumpUrl = encodeURIComponent(window.location.origin);
          let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(payInfo)}&jumpUrl=${jumpUrl}&orderId=${res._id}`;
          wx.miniProgram.navigateTo({
            url: path
          });
        }else {
          //非小程序环境
          // alert("非小程序环境")
          if(openid){
            // alert(openid);
            // 
            history.pushState(null,null,"/yixiuwebapp/payInfo");

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
                      // alert(JSON.stringify(res));
                      // alert(JSON.stringify(payInfo));
                        if(wxres.err_msg == "get_brand_wcpay_request:ok" ) {
                          that.paySuccess(res._id);
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
      async paySuccess(id){
        let res = await this.$api.getData(`https://m.yixiutech.com/order/paySuccess/${id}`);
        // alert(JSON.stringify(res));
        if(res.code == 200){
          this.$toast("支付成功");
          
          let mess = {
            type: "已付款",
            remark: "付款成功，商家会尽快接单，请您耐心等待！"
          }
          this.sendMessage(mess);
          this.$router.push("/orders");
        }else{
          this.$toast("支付失败");
        }
      }
    }
  };
</script>

<style scoped>
  .sureOrder button{
    border-radius: 4px;
  }
  .sureOrder button svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .sureOrder button span{
    vertical-align: middle;
  }
</style>
