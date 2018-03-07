<template>
  <div class="answer-container">
    <van-nav-bar
      fixed
      style="z-index:100"
      class="titleshadow"
    >
      <div slot="left" @click="close" class="close">
        <sicon name="close" scale="1.4"></sicon>
      </div>
      <div slot="title" class="newTitle">回复</div>
      <div slot="right" class="newBtn" @click="pushnewquestion">提交</div>
      </van-search>
    </van-nav-bar>
    
    <topNav></topNav>
    
    <div class="questionarea">
      <!-- <inputBox :placeholder="inputpla" @titleText="getTitle"></inputBox> -->

      <textarea class="questionMessage" placeholder="你的回答" v-model="answer.content"></textarea>
    </div>
    

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "../components/topNav"
  // import inputBox from "../components/inputBox"

  export default {
    data(){
      return {
        inputpla:"请输入标题",
        answer:{
          content:"",
          photo:[]
        }
      }
    },
    components: {
      topNav,
      // inputBox,
      [NavBar.name]: NavBar,
    },
    methods: {
      close(){
        this.$router.go(-1)
      },
      getTitle(titletext){
        this.answerdetail.title = titletext;
      },
      async pushnewquestion(){
        console.log(this.answer)
      }
    }
  }
</script>

<style scoped>
  .close{
    color: #7d7d7d;
  }
  .newTitle{
    margin-left: -55vw;
  }
  .newBtn{
    margin-left: 55vw;
    color: #0086ff;
  }
  .titleshadow{
    -moz-box-shadow:0vw -0.5vh 3vw #b6baba; 
    -webkit-box-shadow:0vw -0.5vh 3vw #b6baba; 
    box-shadow:0vw -0.5vh 3vw #b6baba;
  }
  .questionarea{
    padding: 5vh 3.9vw 0 3.9vw;
  }
  .questionMessage{
    margin-top: 3.6vh;
    width: 100%;
    min-height: 65vh;
    border: 0;
    resize: none;
  }

</style>