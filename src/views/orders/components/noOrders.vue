<template>
  <div class="noOrders">
    <div class="noInfoImg">
      <sicon name="withoutOrders" scale="15"></sicon>
    </div>
    <h2>您还没有维修记录</h2>
    <h4>在首页选择商家后可以进行维修哦</h4>
    <span @click="backHome">返回首页</span>
  </div>
</template>

<script>
  export default {
    name: 'no-orders',
    methods: {
      backHome: function () {
        this.$router.push("/home");
      }
    }
  };
</script>

<style scoped>
  .noOrders{
    width: auto;
    height: 78vh;
    background-color: #fff;
    color: #ccc;
    text-align: center;
  }
  .noOrders .noInfoImg{
    width: auto;
    padding-top: 5vh;
  }
  .noOrders h2{
    height: 5vh;
    line-height: 5vh;
  }
  .noOrders h3{
    height: 4vh;
    line-height: 4vh;
  }
  .noOrders span{
    display: block;
    width: auto;
    font-size: 13px;
    padding-top: 2vh;
    height: 5vh;
    line-height: 5vh;
    color: #fda674;
  }
</style>
