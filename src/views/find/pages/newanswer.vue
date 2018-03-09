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
      <div slot="right" class="newBtn" @click="checknewAnswer">提交</div>
      </van-search>
    </van-nav-bar>
    
    <topNav></topNav>
    
    <div class="questionarea">
      <p class="questiontitle" v-if='text == ""'>请输入问题描述</p>

      <textareaBox v-model='text' class="answerBox"></textareaBox>

    </div>

    
    <optionFooter @changeanonymous="changeanonymous"></optionFooter>
    

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "../components/topNav"
  import optionFooter from "../components/optionFooter"
  import textareaBox from "../components/textareaBox"
  import { replyQuestion } from '../../common/api'

  export default {
    data(){
      return {
        questionId: "",
        text:'',  //存储输入的文本
        answer:{
          content: "",//内容字符串
          question: "",//此评论属于哪个问题的标识_id
          // parent: "", //父级评论的标识_id(不填则为1级评论 填了则为二级评论)
          author: "" //此评论属于哪个用户的标识_id(或者叫回复人,评论者)
        }
      }
    },
    components: {
      topNav,
      textareaBox,
      optionFooter,
      [NavBar.name]: NavBar,
    },
    methods: {
      //获取是否匿名
      changeanonymous(anonymous){
        this.anonymous = anonymous;
      },
      close(){
        this.$router.go(-1)
      },
      //提交新回答
      checknewAnswer() {
        console.log(this.text)
        if(this.text.length === 0){
          const toast = this.$createToast({
            txt: '请输入回答内容',
            type: 'error',
            time: 1300
          })
          toast.show();
        }else {
          this.answer.content = this.text;
          this.answer.question = this.questionId;
          let userData = this.getUserInfo();
          this.answer.author = userData._id
          this.pushnewAnswer();
        }
      },
      pushnewAnswer(){
        console.log(this.answer)
        const toast = this.$createToast({
          time: 0,
          txt: '正在提交'
        })
        toast.show();

        replyQuestion(this.answer)
        .then(res => {
          toast.hide();

          const tip = this.$createToast({
            txt: '提交成功!',
            type: 'correct',
            time: 1300
          })
          tip.show();

          setTimeout(() => { this.close(); }, 1600);

        },(err => {
          const tip = this.$createToast({
            txt: '提交失败!',
            type: 'fail',
            time: 1000
          })
          console.log(err);
        }))
      }
    },
    created(){
      this.questionId = this.$route.params.questionId;
      console.log(this.questionId)
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
    position: relative;
    padding: 5vh 3.9vw 0 3.9vw;
    padding-top: 24px;
  }
  .questiontitle{
    position: absolute;
    padding-bottom: 2.5px;
    color: #c0c0c0;
    z-index: -1;
  }
  .answerBox{
    margin-top: 5px !important;
  }


</style>