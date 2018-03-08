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
      <!-- <textareaBox @input="changeText" v-model='text'></textareaBox> -->
      <!-- <div>{{text}}</div> -->
      <textareaBox v-model='text'></textareaBox>

    </div>
    
    <optionFooter @changeanonymous="changeanonymous"></optionFooter>

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "./topNav"
  import inputBox from "./inputBox"
  import optionFooter from "./optionFooter"
  import textareaBox from "./textareaBox"

  export default {
    data(){
      return {
        comment:"这是一条评论",
        text:'<img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png">',
        anonymous: false,
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
      textareaBox,
      [NavBar.name]: NavBar,
    },
    methods: {
      close(){
        this.$emit("close");
      },
      //获取标题
      getTitle(titletext){
        this.answerdetail.title = titletext;
      },
      //获取是否匿名
      changeanonymous(anonymous){
        this.anonymous = anonymous;
      },
      changeText(res){

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
    padding-bottom: 2.5px;
    margin-bottom: 2.5px;
    /*border-bottom: 1px solid #b6baba*/
  }
  

</style>