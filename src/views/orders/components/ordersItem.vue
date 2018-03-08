<template>
  <div class="ordersItems">
    <div class="ordersItem"  v-for="item in orders">
      <div class="itemTitle">
        <span class="shopName">111</span>
        <span class="orderState">{{state[item.state]}}</span>
      </div>
      <div class="orderContent">
      </div>
    </div>

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
        }
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
    mounted() {
      console.log(this.orders);
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
  }
</style>
