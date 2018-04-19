<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="客户热线"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <!-- 用户看到的个人信息 -->
    <div class="messageTag">
      <!-- 信息标题 -->
      <div class="myinfo-title-container">
        <div class="myinfo-title">客户热线</div>
      </div>
      <div class="row-line"></div>
      <!-- 个人信息详细部分 -->
      <div class="myinfo-message">
        <div v-for="(info,index) in userInfoItem " :key="index" class="myinfo-message-item">
          <div class="myinfo-message-tag textright">{{ info.name }}</div>
          <div class="myinfo-message-data canchose"><a :href="`tel:${info.tag}`">{{ info.tag }}</a></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { NavBar } from 'vant';

  export default {
    data () {
      return {
        //默认信息属性
        userInfoItem:[  
          {
            tag: "13110222556",
            name: "热线1："
          }
        ]
      }
    },
    components: {
      [NavBar.name]: NavBar
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      }
    },
    created() {
    }
  }
</script>

<style scoped>
  .myinfo-container{
    min-height: 90vh;
    padding: 2vh 3vw 5vh 3vw;
    background: #fff;
    
  }
  .topblank{
    margin-top: 45.6px;
  }
  .messageTag{
    border: 0.1px solid rgb(240, 241, 245);
    padding: 3vh 4vw 4vh 4vw;
    margin-bottom: 4vh;
  }
  .myinfo-title-container{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 2vh;
  }
  .myinfo-title{
    color: #727272;
    font-size: 4vw;
  }
  .row-line{
    width: 100%;
    height: 0.3vh;
    margin-top: 4vh;
    margin-bottom: 4vh;
    background: #ecebeb;
  }
  
  .myinfo-message{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .myinfo-message-item{
    position: relative;
    display: flex;
    flex-direction: row;
    margin-bottom: 3vh;
  }
  .myinfo-message-tag{
    min-width: 64px;
    margin-right: 3vw;
    color: #727272;
  }
  .textright{
    text-align: right;
  }
  .myinfo-pass-margin{
    margin-bottom: 3vh;
  }
  .myinfo-message-data{
    min-width: 70%;
    display: flex;
    color: #333;
  }
  .canchose{
    -moz-user-select: text;
    -khtml-user-select: text;
    user-select: text;
  }
</style>