<template>
    <div class="ordersItem">
      <div class="itemTitle">
        <span class="shopName">翼修旗舰店</span>
        <span class="orderState">待付款</span>
      </div>
      <div class="orderContent">

      </div>
    </div>
</template>

<script>
  export default {
    name: 'orders-item'
  };
</script>

<style scoped>
  .ordersItem{
    width: auto;
    margin-bottom: 10px;
    height: 121px;
    background-color: #fff;
  }
  .ordersItem .itemTitle{
    width: auto;
    height: 30px;
    border-bottom: 1px solid #eee;
  }
  .ordersItem .itemTitle span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
  .ordersItem .itemTitle span.shopName{
    float: left;
    padding-left: 15px;
  }
  .ordersItem .itemTitle span.orderState{
    float: right;
    padding-right: 15px;
  }
</style>
