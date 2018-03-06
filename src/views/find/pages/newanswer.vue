<template>
  <div class="answer-container">
  <!--   <van-nav-bar
      fixed
      style="z-index:100"
      class="titleshadow"
    >
      <div slot="left" @click="prepage" class="prepage">
        <sicon name="find-leftArr" scale="1.7"></sicon>
        返回
      </div>
      <div slot="title" class="detailTitle">{{ answerdetail.title }}</div>
      </van-search>
    </van-nav-bar>
     -->
    <!-- 顶部留白 -->
    <!-- <div class="topblank"></div> -->

    <!-- <div class="answercontent" v-html="answerdetail.content"> -->
      <!-- {{  }} -->
    <!-- </div> -->
    回复

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';

  export default {
    data(){
      return {
        answerdetail:{}
      }
    },
    components: {
      [NavBar.name]: NavBar,
    },
    methods: {
      prepage(){
        this.$router.go(-1)
      }
    },
    created:function(){
      // this.answerdetail = this.$route.params.answer;
      // console.log(this.answerdetail)
    }
  }
</script>

<style scoped>
  .prepage{
    display: flex;
    flex-direction: row;
    align-items:center;
    width: 16vw;
    color: rgb(98, 164, 255);
    margin-left: -2vw;
  }
  .answer-container{
    min-height: 100vh;
    margin-bottom: 10vh;
  }
  .titleshadow{
    -moz-box-shadow:0vw -0.5vh 3vw #b6baba; 
    -webkit-box-shadow:0vw -0.5vh 3vw #b6baba; 
    box-shadow:0vw -0.5vh 3vw #b6baba;
  }
  .detailTitle{
    display: inline-block;
    width: 60vw;
    color: #646464;
    white-space:nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .topblank{
    margin-top: 46px;
  }

</style>