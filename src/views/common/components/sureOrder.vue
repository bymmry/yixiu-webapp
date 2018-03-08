<template>
  <div class="sureOrder">
    <van-button @click="sureOrder" bottom-action>
      <sicon name="nextStep" scale="1.8"></sicon><span>确认下单</span>
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
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      sureOrder: function () {
        let that = this;
        let shopId = this.$route.params.id;
        let userInfo = this.getUserInfo();
        console.log(this.data);
        //  确认下单
        Dialog.confirm({
          title: '是否立即支付',
        }).then(() => {
          // on confirm
          let orderData = {
            // type: 1,//订单类型 0.纯服务类型 1.服务和商品类型 2.纯商品类型
            user: userInfo._id,
            shop: shopId,
            // serviceWay: "1",//服务方式 1.上门服务 2.自行到店
            // phone: "18696835639",//联系电话
            // address: "",//联系人地址
            // goods:["xxxid"],//商品列表
            // service:["service"],//服务列表
            // card:[""],//优惠券列表
            remark: "修手机",//备注
            // paymentType: 0, //付款方式 0:在线支付(目前只支持) 1:线下支付 2:修好后支付
            // price: 1,//总金额(优惠前金额)
            payment: 1//实付金额
          };

          console.log(orderData);
          sureOrder(orderData).then((res) => {
            console.log(res);
            if(this.data){
              this._pay(this.data);
            }
          });
        }).catch(() => {
          // on cancel
          console.log("取消");
        });

      },
      _pay: function (data) {
        let isWxMini;
        console.log(data);
        let payInfo = {
          data: "test"
        };
        isWxMini = window.__wxjs_environment === 'miniprogram';

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
