<template>
  <div class="mycoupus-container">
    <van-nav-bar
      title="我的优惠券"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />

    <!-- 顶部留白 -->
    <div class="topblank"></div>
    
    <couponsTag v-for="(coupon,index) in coupons" v-if="coupon.used===true" :key="coupon.id" :couponsData="coupons[index]"></couponsTag>
    <h3>不可用优惠券</h3>
    <couponsTag v-for="(coupon,index) in coupons" v-if="coupon.used===false" :key="coupon.id" :couponsData="coupons[index]"></couponsTag>
  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import couponsTag from '../../components/couponsTag.vue'

  export default {
    data() {
      return {
        coupons:[
          // used     是否可使用
          // id       优惠券id
          // name     优惠券名字
          // disount     优先权折扣   0为使用优惠券金额  88表示8.8折 
          // denominations    优惠券金额   0为使用优惠券折扣  1500表示15元
          // origin_condition   满减条件    0为金额限制   100 表示满1元才可使用
          // start_at     开始时间
          // end_at       结束时间
          // reason       无法使用原因
          // value        优惠券金额
          {
            used: true, 
            id: 1,
            name: "优惠券A",
            disount: 0,
            denominations: 1,
            origin_condition: 0,
            start_at: 1489104000,
            end_at: 1514592000,
            reason: "优惠券过期",
            value:1500
          },
          {
            used: false, 
            id: 1,
            name: "优惠券B",
            disount: 0,
            denominations: 1,
            origin_condition: 100,
            start_at: 1489104000,
            end_at: 1514592000,
            reason: "优惠券过期",
            value:15
          },
          {
            used: false, 
            id: 1,
            name: "优惠券C",
            disount: 88,
            denominations: 0,
            origin_condition: 5,
            start_at: 1489104000,
            end_at: 1514592000,
            reason: "优惠券过期",
            value:0
          }
        ]
      }
    },
    components: {
      [NavBar.name]: NavBar,
      couponsTag
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
    }
  }
</script>

<style scoped>
  html{
    /*height: 100%;*/
    /*background: rgb(248, 248, 248);*/
  }
  .mycoupus-container{
    height: 100%;
    padding: 0.3vh 0vw 5vh 0vw;
    margin-top: 3vh;
    /*margin-bottom: 70px;*/
    /*min-height: 80vh;*/
    background: rgb(248, 248, 248);
  }
  .topblank{
    margin-top: 45.6px;
  }
  .mycoupus-container h3{
    color: #999;
    margin-bottom: 3vh;
    margin-top: 5vh;
    font-size: 14px;
    font-weight: normal;
    position: relative;
    text-align: center;
  }
  .mycoupus-container h3::before {
    left: 50%;
    margin-left: -95px;
  }
  .mycoupus-container h3::after {
    right: 50%;
    margin-right: -95px;
  }
  .mycoupus-container h3::before,
  .mycoupus-container h3::after
  {
    content: ' ';
    width: 45px;
    height: 1px;
    top: 50%;
    position: absolute;
    background-color: #e5e5e5;
  }
  
</style>