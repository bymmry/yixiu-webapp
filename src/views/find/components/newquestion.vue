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
      <div slot="title" class="newTitle">提问</div>
      <div slot="right" class="newBtn" @click="pushnewquestion">提交</div>
      </van-search>
    </van-nav-bar>
    
    <topNav></topNav>
    
    <div class="questionarea">
      <inputBox :placeholder="inputpla" @titleText="getTitle"></inputBox>

      <!-- <textarea class="questionMessage" placeholder="添加问题的补充说明" v-model="answerdetail.content"></textarea> -->
      <p class="questiontitle">请在下面输入内容:</p>
      <div contenteditable="true" class="questionMessage">
        111
        <img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png" alt="">
      </div>
    </div>
    
    <optionFooter></optionFooter>

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "./topNav"
  import inputBox from "./inputBox"
  import optionFooter from "./optionFooter"

  export default {
    data(){
      return {
        inputpla:"请输入标题",
        answerdetail:{
          title:"",
          content:"",
          photo:[]
        }
      }
    },
    components: {
      topNav,
      inputBox,
      optionFooter,
      [NavBar.name]: NavBar,
    },
    methods: {
      close(){
        this.$emit("close");
      },
      getTitle(titletext){
        this.answerdetail.title = titletext;
      },
      async pushnewquestion(){
        console.log(this.answerdetail)
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
    padding-top: 24px;
  }
  .questiontitle{
    margin-top: 12px;
    margin-bottom: 5px;
  }
  .questionMessage{
    padding: 5px 4px;
    min-height: 60vh;
    font-size: 14px;
    line-height: 16px;
    border: 0.5px solid rgb(239, 190, 96);
    border-radius: 2.5px;
    resize: none;
  }
  .questionMessage:focus{
    border: 0;
  }
  .questionMessage img{
    /*display: block;
    margin: 0 auto;*/
    max-width: 100%;
    max-height: 120px; 
  }

</style>