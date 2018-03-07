<template>
    <div class="sureOrder">
      <van-button @click="sureOrder" bottom-action>
        <sicon name="nextStep" scale="1.8"></sicon><span>确认下单</span>
      </van-button>
    </div>
</template>

<script>
  import wx from "weixin-js-sdk";
  import { Toast, Button } from 'vant';
  export default {
    name: 'sure-order',
    components: {
      [Button.name]: Button,
      [Toast.name]: Toast
    },
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      sureOrder: function () {
        //  确认下单
        Toast("确认下单");
        if(this.data){
          this._pay(this.data);
        }
      },
      _pay: function (data) {
        let isWxMini;
        console.log(data);
        let payInfo = {
          data: "test"
        };
        isWxMini = window.__wxjs_environment === 'miniprogram'

        if(isWxMini){
          console.log(isWxMini);
          let jumpUrl = encodeURIComponent(window.location);
          let path = `/pages/wxpay/wxpay?payInfo=${JSON.stringify(payInfo)}&jumpUrl=${jumpUrl}`;
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
