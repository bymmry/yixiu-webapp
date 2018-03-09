<template>
  <div class="sureOrder">
    <van-button @click="sureOrder" bottom-action>
      <sicon name="nextStep" scale="1.8"></sicon><span>确认下单￥{{this.TotalFee}}</span>
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
      }
    },
    watch: {
      TotalFee: function (val) {
        this.TotalFee = val;
      },
      serverId: function (val) {
        console.log("---------------------------------------->");
        console.log(this.serverId);
        return val;
      }
    },
    methods: {
      sureOrder: function () {
        let that = this;
        let shopId = this.$route.params.id;
        let userInfo = this.getUserInfo();
        let orderData = {
          type: 0,//订单类型 0.纯服务类型 1.服务和商品类型 2.纯商品类型
          user: userInfo._id,
          shop: shopId,
          // serviceWay: "1",//服务方式 1.上门服务 2.自行到店
          phone: "18696835639",//联系电话
          // address: "",//联系人地址
          // goods: this.shopId,//商品列表
          service: this.serverId,//服务列表
          phoneModel: this.data.model.data._id,//
          // card:[""],//优惠券列表
          remark: "修手机",//备注
          // paymentType: 0, //付款方式 0:在线支付(目前只支持) 1:线下支付 2:修好后支付
          // price: 1,//总金额(优惠前金额)
          payment: this.TotalFee*100//实付金额
        };

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
