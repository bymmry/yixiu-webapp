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

    <couponsTag></couponsTag>
  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import couponsTag from '../../components/couponsTag.vue'

  export default {
    components: {
      [NavBar.name]: NavBar,
      couponsTag
    },
    methods: {
      
    }
  }
</script>

<style scoped>
  .mycoupus-container{
    padding: 0.3vh 0vw 5vh 0vw;
    margin-top: 3vh;
    margin-bottom: 70px;
    min-height: 95vh;
    background: rgb(248, 248, 248);
  }
  .topblank{
    margin-top: 45.6px;
  }
</style>