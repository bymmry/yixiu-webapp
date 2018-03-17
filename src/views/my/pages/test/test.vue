<template>
  <div class="myinfo-container">
    <div class="navBox">
      <div @click="prepage" class="prepageBox"><sicon name="find-leftArr" scale="1.2"></sicon>&nbsp;返回</div>
      <div class="navtitle">测试</div>
    </div>
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <div class="topblank"></div>
  
    <p class="divboxxx" contenteditable="true" v-html="aa"></p>

    <!-- <div class="topblank"></div> -->

    <button @click="aac">++++</button>
    <div>这里是要添加的部分：
      <div v-html="aa"></div>
    </div>


  </div>

</template>

<script>


  export default {
    data () {
      return {
        aa:""
      }
    },
    components: {

    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      aac(){
        this.aa = this.aa.concat("<img src='https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/lattice.jpg'>")
      }

     
    },
    created() {
      
    }
  }
</script>

<style scoped>
  .divboxxx{
    width: 80%;
    height: 100px;
    border: 1px solid #000;
    -webkit-user-select:text;
  }
  .myinfo-container{
    overflow: hidden;
    width: 100vw;
 }
  .navBox{
    position: fixed;
    top: 0;
    padding-left: 10px; 
    width: 100vw;
    min-height: 73px;
    height: 15vh;
    margin-left: -3vw;
    display: flex;
    flex-direction:row;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    color: #FCFCFC;
    font-size: 4vw;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
  }
  .navtitle{
    margin-left: 22vw;
  }
  .prepageBox{
    height: 54px;
    line-height: 54px;
    width: 17vw;
    text-align: center;
  }
  .countBox{
    padding-top: 10vh;
    height: 70vh;
    text-align: center;
  }
  .countBox img{
    width: 166px;
    height: 233.3px;
  }
  .money{
    color:#3c6b7a;
    font-size: 6vw;
    margin-top: -30px;
  }
  .topblank{
    margin-top: 15vh;
  }
  >>> img{
    width: 100px;
    height: 100px;
  }


</style>