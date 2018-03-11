<template>
  <div class="chooseInfos">
    <div class="header">
      <div class="back" @click="goBack">
        <sicon name="back" scale="1.7"></sicon>
        <span>返回</span>
      </div>
    </div>
    <h3>订单详情</h3>
    <div class="information" v-if="orderData.shop">
      <ul>
        <li><span class="name">商家</span><span class="value">{{orderData.shop.name}}</span></li>
        <li><span class="name">商家电话</span><span class="value">{{orderData.shop.contactNumber}}</span></li>
        <li><span class="name">手机品牌</span><span class="value">{{orderData.phoneModel.desc}}</span></li>
        <li><span class="name">手机型号</span><span class="value">{{orderData.phoneModel.name}}</span></li>
        <li><span class="name">手机颜色</span><span class="value">{{...orderData.phoneModel.color}}</span></li>
        <li><span class="name">维修选项</span><span class="value">{{serverList}}</span></li>
        <li><span class="name">买家电话</span><span class="value">{{orderData.phone}}</span></li>
        <li><span class="name">留言</span><span class="value">{{orderData.remark}}</span></li>
        <li><span class="name">订单总额</span><span class="value">{{orderData.payment/100}}</span></li>
      </ul>
    </div>
    <div class="stepButton">
      <div class="stepPrev">
        <van-button @click="cancelOrder" bottom-action>
          <sicon name="cancel" scale="1.8"></sicon><span>取消该订单</span>
        </van-button>
      </div>
      <div class="stepNext">
        <sure-order :sureOrderData="sureOrderData" :TotalFee="orderData.payment/100"></sure-order>
        <!--<van-button @click="nextStep" bottom-action>-->
        <!--<sicon name="nextStep" scale="1.8"></sicon><span>确认下单</span>-->
        <!--</van-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { CouponCell, CouponList, Popup, Toast, Button, Field, Dialog } from 'vant';
  import sureOrder from "../../common/components/sureOrder"
  import {getOrderDetail, cancelOrder} from '../api';

  export default {
    name: 're-pay',
    data() {
      return {
        sureOrderData: {},
        serverId:[],
        serverList: "",
        orderData: {}
      }
    },
    created() {
      let that = this;
      let id = this.$route.params.id;
      console.log(id);
      getOrderDetail(id).then(res => {
        console.log(res);
        this.orderData = res.data;
        let servers = this.orderData.service;
        let pro = servers.map(function (val) {
          return val.name;
        });
        this.serverId = servers.map(function (val) {
          return val._id;
        });
        this.serverList = pro.join("/");
        that.setData();
      });
    },
    components: {
      [Dialog.name]: Dialog,
      [Button.name]: Button,
      [Field.name]: Field,
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList,
      [Popup.name]: Popup,
      [Toast.name]: Toast,
      sureOrder
    },
    methods: {
      goBack: function () {
        console.log("goBack");
        this.$router.back();
      },
      cancelOrder: function () {
        Dialog.confirm({
          title: '取消订单',
          message: '真的要取消吗？'
        }).then(() => {
          // on confirm
          this.cancelOrderAjax();
        }).catch(() => {
          // on cancel
        });
      },
      cancelOrderAjax: function () {
        this.setData();
        let order = {
          state: 100,
          _id: this.$route.params.id
        };
        let data = Object.assign(this.sureOrderData, order);
        console.log(data);
        cancelOrder(data).then(res => {
          console.log(res);
          if (res.code === 200){
            this.$router.push('/orders');
          }
        });
      },
      setData: function () {
        console.log("set");
        let orderData = this.orderData;
        let userInfo = this.getUserInfo();
        this.sureOrderData = {
          type: 0,//订单类型 0.纯服务类型 1.服务和商品类型 2.纯商品类型
          user: userInfo._id,
          shop: orderData.shop._id,
          serviceWay: "2",//服务方式 1.上门服务 2.自行到店
          phone: orderData.phone,//联系电话
          // address: "",//联系人地址
          // goods: this.shopId,//商品列表
          service: this.serverId,//服务列表
          phoneModel: orderData.phoneModel._id,//
          // card:[""],//优惠券列表
          remark: orderData.remark,//备注
          paymentType: 0, //付款方式 0:在线支付(目前只支持) 1:线下支付 2:修好后支付
          price: orderData.price,//总金额(优惠前金额)
          payment: orderData.payment//实付金额
        };
        console.log(this.sureOrderData);
      }
    }
  };
</script>

<style scoped>
  .chooseInfos{
    width: 100%;
    height: 100%;
  }
  .chooseInfos .header{
    width: auto;
    height: 7vh;
    padding: 0 10px;
  }
  .chooseInfos .header > div.back{
    line-height: 7vh;
    flex: 3;
    font-size: 13px;
    color: #535456;
  }
  .chooseInfos .header > div svg, .header > div.back span{
    vertical-align: middle;
  }
  .chooseInfos h3{
    width: auto;
    height: 5vh;
    line-height: 5vh;
    padding-left: 10px;
  }
  .chooseInfos .information{
    width: auto;
    height: auto;
    max-height: 70vh;
    overflow-y: scroll;
  }
  .chooseInfos .information ul{
    width: 100%;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .chooseInfos .information ul li{
    width: auto;
    margin: 0 15px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #393939;
    border-bottom: 1px solid #e5e5e5;
  }
  .chooseInfos .information ul li:last-child{
    border: none;
  }
  .chooseInfos .information ul li span{
    display: inline-block;
  }

  .chooseInfos .information ul li span.value{
    float: right;
  }


  .chooseInfos .stepButton{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 5px;
  }
  .chooseInfos .stepButton > div{
    width: 100%;
    flex: 1;
    padding: 0 5px;
  }
  .chooseInfos .stepButton > div button{
    border-radius: 4px;
  }
  .chooseInfos .stepButton > div.stepPrev button{
    background-color: #4a4c5b;
  }
  .chooseInfos .stepButton > div button svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .chooseInfos .stepButton > div button span{
    vertical-align: middle;
  }
  #input div div input{
    text-align: right !important;
  }
</style>
