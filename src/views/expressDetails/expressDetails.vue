<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="物流详情"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>


  </div>

</template>

<script>
  import { NavBar } from 'vant';

  export default {
    data () {
      return {

      }
    },
    components: {
      [NavBar.name]: NavBar,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.go(-1)
      },
      
    },
    created() {
      
    }
  }
</script>

<style scoped>
  .myinfo-container{
    overflow: hidden;
    width: 100vw;
  }
  .orderinput{
    border-bottom: 1px solid rgb(244, 244, 244);
  }
  .topblank{
    margin-top: 15vh;
  }
  .findBtn{
    width: 90vw;
    margin-left: 5vw;
    margin-top: 5vh;
  }

</style>