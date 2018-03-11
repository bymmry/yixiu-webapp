<template>
  <div class="ordersItems">
    <div class="ordersItem" @click="rePay(index)"  v-for="(item, index) in orders">
      <div class="itemTitle">
        <span class="shopName">{{item.shop.name}}</span>
        <span class="orderState">{{state[item.state]}}</span>
      </div>
      <div class="orderContent">
        <p>卖家联系电话：<span>{{item.shop.contactNumber}}</span></p>
        <p>手机型号：<span>{{item.phoneModel.desc + " " + item.phoneModel.name}}</span></p>
        <p>服务：<span>{{servers[index]}}</span></p>
        <p>订单金额：<span>￥{{item.payment/100}}</span></p>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'orders-item',
    data() {
      return {
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
        rePayData: {}
      }
    },
    props: {
      orders: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    watch: {
      orders: function (val) {
        this.setData();
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

      },
      rePay: function (index) {
        console.log(this.orders[index]);
        this.rePayData = this.orders[index];
        this.$router.push({
          path: `/toOrders/${this.rePayData._id}`,
          params: {
            id: this.rePayData
          }
        })
      }
    }
  };
</script>

<style scoped>
  .ordersItems{
    width: auto;
    height: auto;
  }
  .ordersItems .ordersItem{
    width: auto;
    margin-bottom: 10px;
    height: 121px;
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
</style>
