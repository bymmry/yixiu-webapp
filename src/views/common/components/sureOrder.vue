<template>
  <div class="sureOrder">
    <van-button @click="sureOrder" bottom-action>
      <sicon name="nextStep" scale="1.8"></sicon><span>立即付款{{this.TotalFee}}</span>
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

        console.log(orderData);

        //  确认下单
        Dialog.confirm({
          title: '是否立即支付',
        }).then(() => {
          // on confirm
          console.log(orderData);
          sureOrder(orderData).then((res) => {
            console.log(res);
            if(this.data){
              this._pay(this.data, orderData, res.data);
            }
          });
        }).catch(() => {
          // on cancel
          console.log("取消");
        });

      },
      _pay: function (data, payInfo, res) {
        let isWxMini;
        console.log(data);
        isWxMini = window.__wxjs_environment === 'miniprogram';

        if(isWxMini){
          console.log(isWxMini);
          let jumpUrl = encodeURIComponent(window.location.origin);
          let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(payInfo)}&jumpUrl=${jumpUrl}&orderId=${res._id}`;
          wx.miniProgram.navigateTo({
            url: path
          });
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
