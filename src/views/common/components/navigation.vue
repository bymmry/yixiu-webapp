<template>
  <div class="navigation" v-if="isShowNav">
    <div class="routerBox">
      <router-link to="/home"><sicon name="home" scale="2.3"></sicon><br/><span>首页</span></router-link>
      <router-link to="/orders"><sicon name="orders" scale="2.3"></sicon><br/><span>订单</span></router-link>
      <router-link to="/find/question"><sicon name="find" scale="2.3"></sicon><br/><span>发现</span></router-link>
      <router-link to="/my"><sicon name="my" scale="2.3"></sicon><br/><span>我的</span></router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'navigation',
    data(){
      return {
        isShowNav:true
      }
    },
    created(){
      // console.log(window.location.href);
      const url = window.location.href;
      const seller = url.split("/")[1].split("?")[0];
      // console.log(seller);
      if (url.indexOf('phoneDetail') !== -1 || url.indexOf('order') !== -1) {
        this.isShowNav = false;
      }
      // if(seller == "sellerHome" || seller == "businessRegister" || seller == "addBrand" || seller == "addModel" || seller == "addCatagory" || seller == "addService" || seller == "publishPhone" || seller == "orderDetail" || seller == "updateMsg" || seller == 'enterRules' || seller == 'addServices' || seller == 'service' || seller == 'updateService' || seller == 'wait' || seller == 'phoneDetail') {
      //   this.isShowNav = false;
      // }
      // if (url.indexOf('orderList') !== -1 || url.indexOf('orderDetail') !== -1) {
      //   this.isShowNav = false;
      // }
    }
  };
</script>

<style scoped>
  .navigation{
    /* position: fixed; */
    bottom: 0;
    left: 0;
    right: 0;
    height: 8vh;
    min-height: 50px;
    max-height: 60px;
    border-top: 1px solid #eee;
    box-shadow: 0 -1px 2px #ddd;
    background-color: #fff;
  }
  .navigation .routerBox{
    width: 100%;
    height: 100%;
    display: flex;
    text-align: center;
  }
  .navigation .routerBox a{
    padding-top: 5px;
    flex: 1;
    font-size: 13px;
  }
  .router-link-active{
    color: #fda674;
  }
</style>
