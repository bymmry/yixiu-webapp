<template>
  <div class="ordersItems">
    <cube-scroll 
            class="ordersScroll" 
            :options="options" 
            :data="orders" 
            ref="ordersList" 
            @pulling-down="onPullingDown"
            @pulling-up="loadMore">
      <div class="">
        <div class="ordersItem" @click="rePay(index)"  v-for="(item, index) in orders" :key="index">
          <div class="itemTitle">
            <span class="shopName">{{item.shop.name}}</span>
            <span class="orderState">{{state[item.state]}}</span>
          </div>
          <div class="orderContent">
            <div class="goods" v-if="item.goods.length != 0">
              <div class="cover">
                <img :src="item.goods[0].cover">
              </div>
              <div class="info">
                <p>商家联系电话：<span>{{item.shop.contactNumber}}</span></p>
                <p>商品信息：<span>{{item.goods[0].desc}}</span></p>
                <p>下单时间：<span>{{dates[index]}}</span></p>
                <p>订单金额：<span>￥{{item.payment}}</span></p>
              </div>
            </div>
            <div v-if="item.phoneModel">
              <p>商家联系电话：<span>{{item.shop.contactNumber}}</span></p>
              <p>手机型号：<span>{{item.phoneModel.desc}}</span></p>
              <p>服务：<span>{{servers[index]}}</span></p>
              <p>下单时间：<span>{{dates[index]}}</span></p>
              <p>订单金额：<span>￥{{item.payment/100}}</span></p>
            </div>
          </div>
        </div>
        <!-- <div class="loadMore">
          <van-button v-show="showMore" @click="loadMore">点击加载更多</van-button>
          <p>{{moreText}}</p>
        </div> -->
      </div>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  Date.prototype.toLocaleString = function() {
    let Minutes = this.getMinutes();
    if(Minutes < 10){
      Minutes = "0" + Minutes;
    }
    return this.getFullYear() + "/" + (this.getMonth() + 1) + "/" + this.getDate() + " " + this.getHours() + ":" + Minutes    
  };
  import { Button } from 'vant';
  import {getMoreOrderList} from '../api.js';
  import scroll from '../../common/base/scroll'
  
  export default {
    name: 'orders-item',
    data() {
      return {
        showMore: false,
        moreText: "",
        nowData: 0,
        state: {
          10:'待付款',
          11:'已付款',
          12:'维修中',
          13:'已完成',
          14:'待评价',
          15:'评价完成',
          100:'已取消',
          101:'已关闭',
          102:'退款中'
        },
        servers: [],
        rePayData: {},
        dates:[],
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          },
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: 'Load more',
              noMore: '没有更多了'
            }
          }
        }
      }
    },
    components: {
      [Button.name]: Button,
      scroll
    },
    props: {
      orders: {
        type: Array,
        default: function () {
          return []
        }
      },
      states: {
        type: Number,
        default: undefined
      }
    },

    watch: {
      orders: function (val) {
        this.setData();
        this.moreText = "";
        if (val.length >= 10){
          this.showMore = true;
        }
        return val;
      }
    },
    mounted() {
      this.setData();
    },
    methods: {
      setData: function () {
        let ser = this.orders.map(function (val) {
          return val.service;
        });
        this.servers = ser.map(function (val) {
          let res = "";
          for(let i=0; i<val.length;i++){
            res = res + val[i].name + "/";
          }
          return res;
        });
        this.dates = this.orders.map(function (val) {
          let unixTimestamp = new Date( val.createdAt*1000 );
          let commonTime = unixTimestamp.toLocaleString();
          console.log(commonTime);
          return commonTime;
        });

      },
      rePay: function (index) {
        this.rePayData = this.orders[index];
        this.$router.push({
          path: `/toOrders/${this.rePayData._id}`,
          params: {
            id: this.rePayData
          }
        })
      },
      loadMore: function() {
        let that = this;
        let userInfo = this.getUserInfo();
        this.showMore = false;
        this.nowData += this.orders.length;
        //ajax请求
        let more = {
          skip: this.nowData
        };
        let reqData = {
          user: userInfo,
          filter: this.states
        }
        let req = Object.assign(reqData,more);
        console.log(req);
        getMoreOrderList(req).then(res => {
          console.log(res.data);
          if(res.data.length === 0){
            this.$refs.ordersList.forceUpdate()
          }else {
            this.orders.push(...res.data);
            this.showMore = true;
          }
        }, err => {
          console.log(err);
        })
      },
      onPullingDown: function() {
        setTimeout(() => {
          this.$refs.ordersList.forceUpdate()
        }, 1000)
      }
    }
  };
</script>

<style scoped>
  .ordersItems{
    width: auto;
    height: 78vh;
  }
  .ordersItems .ordersScroll{
    height: 100%
  }
  .ordersItems .ordersItem{
    width: auto;
    margin-bottom: 10px;
    /* height: 141px; */
    height: auto;
    background-color: #fff;
  }
  .ordersItems .itemTitle{
    width: auto;
    height: 30px;
    border-bottom: 1px solid #eee;
  }
  .ordersItems .itemTitle span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .ordersItems .itemTitle span.shopName{
    float: left;
    padding-left: 15px;
  }
  .ordersItems .itemTitle span.orderState{
    float: right;
    padding-right: 15px;
    color: #f85;
    font-weight: 700;
  }
  .orderContent div.goods{
   display: flex;
  }
  .orderContent div.goods > div.cover{
    flex: 1;
  }
  .orderContent div.goods > div.cover img{
    width: 100%;

    /* height: 100%; */
  }
  .orderContent div.goods > div.info{
   flex: 4;
  }
  .orderContent div.goods > div.info > p{
    padding-left: 0;
  }
  .orderContent p{
    width: auto;
    padding-left: 25px;
    font-size: 14px;
  }
  .orderContent p span{
    color: #fda674;
    float: right;
    margin-right: 15px;
  }
  .repay{
    position: fixed;
    bottom: 8vh;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;

    background-color: #fff;
  }
  .loadMore{
    width: auto;
    height: 8vh;
    text-align: center;
  }
  .loadMore button{
    width: 60vw;
    border: 1px solid #fff;  
  }
</style>
