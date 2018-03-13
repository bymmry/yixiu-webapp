<template>
  <div class="orders">
    <!--<router-link to="/shopList">商家测试</router-link>-->
    <div class="header">
      <the-header></the-header>
    </div>
    <div class="ordersRow">
      <div class="ordersTabs">
        <ul>
          <li @click="selectOrder(index)" v-for="(item, index) in ordersList">
            <span :data-index="index" :class="{'active': currentIndex === index}">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="ordersList">
        <van-pull-refresh class="ordersListRefresh" v-model="isLoading" @refresh="onRefresh">
          <no-order v-if="!orderData.length"></no-order>
          <order-item v-else :orders="orderData"></order-item>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
  import theHeader from '../common/base/theHeader';
  import noOrder from './components/noOrders';
  import orderItem from './components/ordersItem';
  import { getOrderList } from './api';
  import { Toast, PullRefresh } from 'vant';

  export default {
    name: 'app',
    components: {
      [Toast.name]: Toast,
      [PullRefresh.name]: PullRefresh,
      theHeader,
      noOrder,
      orderItem
    },
    activated() {
      console.log("activated");
      this.currentIndex = 0;
      let userInfo = this.getUserInfo();
      let req = {
        user: userInfo
      };
      this.getOrderData(req);
    },
    data() {
      return {
        ordersList: [
          {
            name: "全部",
            index: 0
          },
          {
            name: "待付款",
            index: 1
          },
          {
            name: "待接单",
            index: 2
          },
          {
            name: "维修中",
            index: 3
          },
          {
            name: "已完成",
            index: 4
          },
        ],
        currentIndex: 0,
        orderData: [],

        isLoading: false
      }
    },
    methods: {
      selectOrder: function (index) {
        this.currentIndex = index;
        let userInfo = this.getUserInfo();
        let state = 0;
        switch (index){
          case 0:
            state = undefined;
            break;
          case 1:
            state = 10; //待付款
            break;
          case 2:
            state = 11; //已付款
            break;
          case 3:
            state = 12; //维修中
            break;
          case 4:
            state = 13; //已完成
        }

        let req = {
          user: userInfo,
          filter: state
        };
        this.getOrderData(req);
      },
      getOrderData(req) {
        Toast.loading({
          duration: 0,
          message: '加载中...'
        });
        getOrderList(req).then(res => {
          console.log(res);
          if (res.code === 200){
            this.orderData = res.data;
            this.$toast('刷新成功');
            this.isLoading = false;
            Toast.clear();
          }else {
            Toast.loading({
              message: '加载失败'
            });
          }
        }, err => {
          console.log(err);
          Toast.loading({
            message: '加载失败'
          });
        });
      },
      onRefresh() {
        let userInfo = this.getUserInfo();
        let filter = this.currentIndex;
        switch (filter){
          case 0:
            filter = undefined;
            break;
          case 1:
            filter = 10; //待付款
            break;
          case 2:
            filter = 11; //已付款
            break;
          case 3:
            filter = 12; //维修中
            break;
          case 4:
            filter = 13; //已完成
        }
        let req = {
          user: userInfo,
          filter: filter
        };
        this.getOrderData(req);

      }
    }
  };
</script>

<style scoped>
  .orders{
    width: auto;
    height: auto;
  }
  .orders .header{
    width: auto;
    height: 7vh;
  }
  .orders .ordersRow{
    width: auto;
    height: auto;
  }
  .orders .ordersRow .ordersTabs{
    width: auto;
    height: 6vh;
  }
  .orders .ordersRow .ordersTabs ul{
    width: auto;
    height: 100%;
    display: flex;
    padding-bottom: 2px;
    border-bottom: 1px solid #eee;
  }
  .orders .ordersRow .ordersTabs ul li{
    flex: 1;
    text-align: center;
  }
  .orders .ordersRow .ordersTabs ul li span{
    display: inline-block;
    width: auto;
    height: 100%;
    line-height: 6vh;
  }
  .orders .ordersRow .ordersTabs ul li span.active{
    color: #fda674;
    border-bottom: 2px solid #fda674;
  }

  .orders .ordersRow .ordersList{
    width: auto;
    padding-top: 2px;
    margin-top: 3px;
    height: 78vh;
    overflow-y: scroll;
    background-color: #eee;
  }
  .orders .ordersRow .ordersList> div{
    height: 100%;
    overflow-y: scroll;
  }
</style>
