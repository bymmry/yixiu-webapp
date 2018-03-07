<template>
  <div>
    <!-- <van-nav-bar
      fixed
      style="z-index:100"
      class="titleshadow"
    >
      <div slot="left" @click="close" class="close">
        <sicon name="close" scale="1.4"></sicon>
      </div>
      <div slot="title" class="newTitle">提问</div>
      <div slot="right" class="newBtn">提交</div>
      </van-search>
    </van-nav-bar> -->
    
    <!-- 顶部留白 -->
    <div class="topblank"></div>
  </div>
</template>

<script>
  //vant
  // import { NavBar } from 'vant';

  export default {
    components: {
      // [NavBar.name]: NavBar,
    },
    methods: {
    }
  }
</script>

<style scoped>
  .topblank{
    margin-top: 46px;
  }
</style>