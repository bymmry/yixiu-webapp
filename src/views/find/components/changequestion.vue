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
      <div slot="right" class="newBtn" @click="pushnewquestionNext" v-if="inNext === false">下一步</div>
      <div slot="right" class="newBtn nextBtnArea" v-else>
        <div @click="pushnewquestionPre">上一步</div>
        <div @click="pushnewquestion">提交</div>
      </div>
      
      </van-search>
    </van-nav-bar>
    
    <topNav></topNav>
    
    <div class="questionarea" v-if="inNext === false">
      <inputBox :placeholder="inputpla" @titleText="getTitle" :value="answerdetail.title"></inputBox>

      <p class="questiontitle" v-if='text == ""'>请输入问题描述</p>

      <textareaBox v-model='text'></textareaBox>

    </div>

    <questionTagBox v-else @changeTag="changeTag" :oldTag="answerdetail.tag"></questionTagBox>
    
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
  import questionTagBox from "./questionTagBox"
  import { updateQuestion } from '../../common/api'

  export default {
    data(){
      return {
        inNext: false,  //是否进入下一步
        text:'',  //存储输入的文本
        anonymous: false,
        inputpla:"请输入标题",
        answerdetail:{
          title: "", //标题
          desc: "", //描述
          info: "",//详情
          tag: [],//问题的标签 (字符串数组)
          author: "",   // 用户id
          _id: 0,  //问题id
          state: 0
          // photo: []  //图片
        }
      }
    },
    components: {
      topNav,
      inputBox,
      optionFooter,
      textareaBox,
      questionTagBox,
      [NavBar.name]: NavBar,
    },
    methods: {
      close(){
        this.$router.go(-1);
      },
      //获取标题
      getTitle(titletext){
        this.answerdetail.title = titletext;
      },
      //获取是否匿名
      changeanonymous(anonymous){
        this.anonymous = anonymous;
      },
      //文本检查
      checkQuestion(){
        if (this.answerdetail.title.length <= 2) {
          const toast = this.$createToast({
            txt: '标题内容太少了吧',
            type: 'error',
            time: 1300
          })
          toast.show()
          return false
        }else if(this.text.length === 0){
          const toast = this.$createToast({
            txt: '请输入问题描述',
            type: 'error',
            time: 1300
          })
          toast.show()
          return false
        }else {
          return true
        }
      },
      //除去内容中的Html标签
      removeHTML(str){
        let reg = /<[^>]*>/g  //除去Html标签
        str = str.replace(reg," ");
        str = str.substring(0,80);
        return str;
      },
      //下一步
      pushnewquestionNext(){
        if(!this.checkQuestion()){
          return 0;
        }
        this.answerdetail.info = this.text;
        this.answerdetail.desc = this.removeHTML(this.text);
        let userData = this.getUserInfo();
        this.answerdetail.author = userData._id;
        this.inNext = true;
        console.log(this.answerdetail)
      },
      //添加Tag
      changeTag(tag){
        this.answerdetail.tag = tag;
      },
      //上一步
      pushnewquestionPre(){
        
        this.inNext = false;
      },
      //提交
      pushnewquestion(){
        console.log(this.answerdetail)
        const toast = this.$createToast({
          time: 0,
          txt: '正在提交'
        })
        toast.show();

        updateQuestion(this.answerdetail)
        .then(res => {
          toast.hide();

          const tip = this.$createToast({
            txt: '提交成功!',
            type: 'correct',
            time: 1300
          })
          tip.show();

          setTimeout(() => { this.close(); }, 1800);

          // console.log(res)
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
      let oldquestion = this.$route.params.oldquestion;
      // console.log(oldquestion)
      this.text = oldquestion.info;
      this.answerdetail.title = oldquestion.title;
      this.answerdetail.tag = oldquestion.tag;
      this.answerdetail._id = oldquestion._id;
      this.answerdetail.state = oldquestion.state
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
  .nextBtnArea{
    display: flex;
    flex-direction:row;
  }
  .nextBtnArea div{
    margin-left: 13px;
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
    margin-top: 12px;
    padding-bottom: 2.5px;
    margin-bottom: 2.5px;
    color: #c0c0c0;
    z-index: -1;
  }

</style>