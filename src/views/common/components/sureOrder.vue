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
      sureOrder: function () {
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
      async _pay(payInfo, res) {
        let isWxMini;
        // console.log(data);
        isWxMini = window.__wxjs_environment === 'miniprogram';

        payInfo = Object.assign({}, payInfo, {type: 1});

        if(isWxMini){
          //小程序环境
          console.log(isWxMini);
          let jumpUrl = encodeURIComponent(window.location.origin);
          let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(payInfo)}&jumpUrl=${jumpUrl}&orderId=${res._id}`;
          wx.miniProgram.navigateTo({
            url: path
          });
        }else {
          //非小程序环境
          let userData = this.getUserInfo();//获取用户信息
          
          let req = {
            total_fee: this.TotalFee*100,
            openid: userData.wx.openid,
            trade_type: 'JSAPI'
          }
          let res = await this.$api.sendData('https://m.yixiutech.com/wx/pay/sign', req);

          alert(JSON.stringify(res));
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
