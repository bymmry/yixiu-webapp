<template>
  <div class="chooseInfos" v-if="orderData">
    <div class="header">
      <div class="back" @click="goBack">
        <sicon name="back" scale="1.7"></sicon>
        <span>返回</span>
      </div>
    </div>
    <h3>订单详情
      <span v-if="orderData.state == 100">（订单已取消）</span>
      <span v-if="orderData.state == 11 && !orderData.trackingCom && orderData.serviceWay == '快递维修'">（未完善物流）</span>
      <span v-if="orderData.state == 13">（订单已完成）</span>
      </h3>
    <!-- 维修订单 -->
    <div class="information" v-if="orderData.goods.length == 0">
      <ul v-if="orderData.state != 13">
        <li><span class="name">商家</span><span class="value">{{orderData.shop.name}}</span></li>
        <li><span class="name">商家地址</span><span class="value" style="font-size: 12px">{{orderData.shop.address}}</span></li>
        <li>
          <span class="name">商家电话</span>
          <span class="value"><a :href="telContactNumber">{{orderData.shop.contactNumber}}</a></span>
          </li>
        <li><span class="name">手机型号</span><span class="value">{{orderData.phoneModel.name}} / {{orderData.phoneModel.color[0]}}</span></li>
        <!-- <li><span class="name">手机颜色</span><span class="value">{{orderData.phoneModel.color.join(",")}}</span></li> -->
        <li><span class="name">维修选项</span><span class="value">{{serverList}} / {{orderData.serviceWay}}</span></li>
        <!-- <li><span class="name">服务方式</span><span class="value">{{orderData.serviceWay}}</span></li> -->
        <li><span class="name">买家电话</span><span class="value">{{orderData.phone}}</span></li>
        <li><span class="name">留言</span><span class="value">{{orderData.remark}}</span></li>
        <li v-if="orderData.address != ''"><span class="name">买家联系地址</span><span class="value">{{orderData.address}}</span></li>
        <li><span class="name">订单总额</span><span class="value">￥{{orderData.payment/100}}元</span></li>
        <li v-if="orderData.state == 11 && !orderData.trackingCom && orderData.serviceWay == '快递维修'" @click="showWuliuInfo">
          <span class="name wuliu">点击完善物流信息</span>
          <span class="value"></span>
        </li>
        <li v-if="orderData.state == 11 && orderData.trackingCom && orderData.serviceWay == '快递维修'" @click="showWuliuDes(0)">
          <span class="name wuliu">点击查看物流信息</span>
          <span class="value"></span>
        </li>
      </ul>
      <ul v-if="orderData.state == 13">
        <li>{{orderData.phoneModel.name}}/￥{{orderData.payment/100}}元</li>
        <li v-if="orderData.info.trackingCom || orderData.info.trackingCom != ''" style="color: #f85" @click="showWuliuDes(1)">点击查看物流信息</li>
        <li v-if="orderData.comment == '' || !orderData.comment" style="color: #f85" @click="getAbout">点击进行评价</li>
        <li style="color: #f85" @click="getQuality">质检报告</li>
      </ul>
      <div class="comment" v-if="orderData.state == 13 && orderData.comment != '' && orderData.info.score">
        <ul>
          <li>评价（已评价）</li>
          <p v-if="orderData.info.score">评分：{{orderData.info.score}}</p>
          <p>评价：{{orderData.comment}}</p>
        </ul>
        
      </div>
    </div>
    <!-- 手机订单 -->
    <div class="information" v-if="orderData.goods.length != 0">
      <div class="img" v-for="(i,index) in orderData.goods" :key="index">
        <img :src="i.cover" alt="">
      </div>
      <ul>
        <li><span class="name">商家</span><span class="value">{{orderData.shop.name}}</span></li>
        <li><span class="name">商家电话</span><span class="value">{{orderData.shop.contactNumber}}</span></li>
        <li>
          <span class="name">手机信息</span>
          <span class="value">
            <span v-for="(i,index) in orderData.goods" :key="index">{{i.desc}}&nbsp;</span>
          </span>
        </li>
        <li><span class="name">买家电话</span><span class="value">{{orderData.phone}}</span></li>
        <li><span class="name">留言</span><span class="value">{{orderData.remark}}</span></li>
        <li><span class="name">订单总额</span><span class="value">{{orderData.payment}}</span></li>
        <li v-if="orderData.state != 100"><span class="name">物流信息</span><span class="value"><input class="logistics" type="button" value="点击查询"></span></li>
      </ul>
    </div>
    <div class="stepButton">
      <div class="stepPrev">
        <van-button v-if="orderData.state == 10" @click="cancelOrder" bottom-action>
          <sicon name="cancel" scale="1.8"></sicon><span>取消该订单</span>
        </van-button>
        <van-button v-else @click="goBack" bottom-action>
          <sicon name="back" scale="1.8"></sicon><span>返回</span>
        </van-button>
      </div>
      <div class="stepNext" v-if="orderData.state == 10">
        <sure-order :state="orderData.state" :orderId="id" :nextStepButtonDisabled="false" :sureOrderData="sureOrderData" :TotalFee="orderData.payment/100"></sure-order>
      </div>
    </div>
    <!-- 质检报告 -->
    <cube-popup v-if="orderData" class="quality" type="my-popup" :center="false" ref="getQuality">
      <quality :data="orderData" v-on:closeQuality="closeQuality"></quality>
    </cube-popup>

    <!-- 填写物流信息 -->
    <cube-popup class="logistics" type="my-popup" :mask="true" ref="wuluInfo">
      <get-logistics v-on:returnSelect="logisticsClose"></get-logistics>
    </cube-popup>

    <!-- 查看物流信息 -->
    <cube-popup class="logistics" type="my-popup" :mask="true" ref="wuluDes">

    </cube-popup>

    <!-- 填写评价信息 -->
    <cube-popup class="logistics" type="my-popup" :mask="true" ref="comment">
      <comment v-on:closeCommon="closeCommon"></comment>
    </cube-popup>
  </div>
</template>

<script>
  import { CouponCell, CouponList, Popup, Toast, Button, Field, Dialog } from 'vant';
  import sureOrder from "../../common/components/sureOrder"
  import quality from '../../common/components/quality'
  import {getOrderDetail, cancelOrder} from '../api';
  import getLogistics from './getLogistics.vue';
  import comment from './comment.vue';
  import { getemail } from '../../common/api'

  export default {
    name: 're-pay',
    data() {
      return {
        sureOrderData: {},
        serverId:[],
        serverList: "",
        orderData: undefined,
        goodsId: [],
        telContactNumber: "",
        id: ""
      }
    },
    created() {
      let that = this;
      let id = this.$route.params.id;
      this.id = id;
      
      getOrderDetail(id).then(res => {
        this.orderData = res.data;
        
        this.telContactNumber = `tel:${this.orderData.shop.contactNumber}`;
        let servers = this.orderData.service;
        let pro = servers.map(function (val) {
          return val.name;
        });
        this.serverId = servers.map(function (val) {
          return val._id;
        });
        this.goodsId = this.orderData.goods.map(function (val) {
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
      sureOrder,
      quality,
      getLogistics,
      comment
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
        let req  = {};
        let that = this;
        console.log(this.goodsId);
        if(this.goodsId.length != 0){ //手机订单
          console.log("if")
          req = {
            goods: that.goodsId || undefined
          }
        }else{ //维修订单
          console.log("else")
          req = {
            service: that.serverId,//服务列表
            phoneModel: that.orderData.phoneModel._id || undefined
          }
        }
        let orderData = this.orderData;
        let userInfo = this.getUserInfo();
        this.sureOrderData = Object.assign({},req,{
          type: 0,//订单类型 0.纯服务类型 1.服务和商品类型 2.纯商品类型
          user: userInfo._id,
          shop: orderData.shop._id,
          serviceWay: orderData.type,//服务方式 1.上门服务 2.自行到店
          phone: orderData.phone,//联系电话
          // address: "",//联系人地址
          // goods: this.goodsId || undefined,//商品列表
          // service: this.serverId,//服务列表
          // phoneModel: orderData.phoneModel._id || undefined,//
          // card:[""],//优惠券列表
          remark: orderData.remark,//备注
          paymentType: 0, //付款方式 0:在线支付(目前只支持) 1:线下支付 2:修好后支付
          price: orderData.price,//总金额(优惠前金额)
          payment: orderData.payment//实付金额
        })
        // this.sureOrderData = {
          
        // };
        console.log(this.sureOrderData);
      },
      getQuality: function(){
        let quality = this.$refs.getQuality;
        quality.show();
      },
      closeQuality(){
        let quality = this.$refs.getQuality;
        quality.hide();
      },
      showWuliuInfo() {
        let wuliu = this.$refs.wuluInfo;
        wuliu.show();
      },
      showWuliuDes(index){
        //487275089743
        let finddata = {
          com: '',
          no: ''
        };
        //买家寄出
        if(index == 0){
          finddata = {
            com: this.orderData.trackingCom,
            no: this.orderData.trackingNumber.replace(/\s/g,"")
          };
        }else if(index == 1){
          finddata = {
            com: this.orderData.info.trackingCom,
            no: this.orderData.info.trackingNumber.replace(/\s/g,"")
          };
        }
        
        console.log(finddata);
        getemail(finddata)
          .then(res => {
            if (res.errMsg) {
              Toast.fail(res.errMsg);
            }else{
              this.$router.push({ name: "expressDetails" ,params: { res: res }})
            }
          },(err => {
            console.log(err);
          }))
      },
      async logisticsClose(data){
        let wuliu = this.$refs.wuluInfo;
        if(data.val == "close"){
          wuliu.hide();
        }else if(data.val == "sure"){
          let req = {
            _id: this.id,
            trackingCom: data.data.company,
            trackingNumber: data.data.val
          }
          let res = await this.$api.sendData(`https://m.yixiutech.com/order/update`, req);
          console.log(res);
          if(res.code == 200){
            this.$toast("物流信息添加成功");
          }else{
            this.$toast(res);
          }
          wuliu.hide();
        }
      },
      getAbout(){
        let comment = this.$refs.comment;
        comment.show();
        // this.$toast("即将到来");
      },
      closeCommon(re){
        let comment = this.$refs.comment;
        if(re == "close"){
          comment.hide();
        }else{
          this.sureCommon(re);
        }

      },
      async sureCommon(re){
        let comment = this.$refs.comment;
        // console.log(re);
        let req = {
          collection: "Order",
          find: {
            _id: this.id
          },
          update: {
            info: Object.assign({}, this.orderData.info, {score: re.score}),
            comment: re.comment
          }
        }
        console.log(req);
        let res = await this.$api.sendData("https://m.yixiutech.com/sql/update", req);
        console.log(res);
        if(res.code == 200){
          this.$toast("评论成功");
          this.$router.push("/orders");
        }
        comment.hide();
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
  .chooseInfos .information .img{
    width: auto;
    height: auto;
  }
  .chooseInfos .information .img img{
    width: 50vw;
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
  .chooseInfos .information ul li span.value input.logistics{
    padding: 0 15px;
    background-color: #f85;
    color: #fff;
    border-radius: 5px;
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
  .quality{
    width: 100%;
  }
  .wuliu{
    color: #f85;
  }
  .logistics .sure{
    background: #f85;
    color: #fff;
  }
  .logistics .logisticsButtons{
    width: 50%;
    float: left;
  }
  .comment ul p{
    padding: 5px 15px;
  }
</style>
