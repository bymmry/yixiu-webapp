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

      <!-- <p class="questiontitle" v-if='text == ""'>请输入问题描述</p> -->

      <textarea v-model='text' class="coverArea" placeholder="请输入问题描述"></textarea>
      <textareaBox v-model="text" :imgs="answerdetail.image"></textareaBox>

    </div>

    <div class="extraOption" v-else>
      <questionTagBox @changeTag="changeTag"></questionTagBox>

      <questionmoney  @changeMoney="changeMoney"></questionmoney>
    </div>
    
    
    <optionFooter @changeanonymous="changeanonymous" @addnewphoto="addnewphoto" v-if="inNext === false"></optionFooter>
    <div v-else class="footerStyle"></div>

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
  import questionmoney from "./questionmoney"
  import { addNewQuestion } from '../../common/api'

  export default {
    data(){
      return {
        inNext: false,  //是否进入下一步
        text:'',  //存储输入的文本
        anonymous: false,
        inputpla:"请输入标题",
        descphoto:"", 
        answerdetail:{
          title: "", //标题
          desc: "", //描述
          info: "",//详情
          tag: [],//问题的标签 (字符串数组)
          author: "",   // 用户id
          reward: 0,   //赏金
          image:[]  //存储图片
        }
      }
    },
    components: {
      topNav,
      inputBox,
      optionFooter,
      textareaBox,
      questionTagBox,
      questionmoney,
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
      //添加图片
      addnewphoto(url){
        this.answerdetail.image = this.answerdetail.image.concat(url)
        if (this.descphoto==="") {
          this.descphoto = `<img src='${url}'>`
        }
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

        let info = this.text.replace(/\n/g,"<br/>");
        info = info.replace(/\s/g,"&nbsp;");
        /*
        //替换<img src 字符
        let reg = /<img src/g
        this.answerdetail.info = this.text.replace(reg,"i-m-g");
        //去空格
        let reg2 = /\s/g
        this.answerdetail.info = this.answerdetail.info.replace(reg2,"&nbsp;");
        // //替换回<img src 字符
        let reg3 = /i-m-g/g
        this.answerdetail.info = this.answerdetail.info.replace(reg3,"<img src");

        */
       
        this.answerdetail.info = info;
        this.answerdetail.desc = this.text.substring(0,80);
        let userData = this.getUserInfo();
        this.answerdetail.author = userData._id;
        this.inNext = true;
        console.log(this.answerdetail)
        // console.log(this.text);
      },
      //添加Tag
      changeTag(tag){
        this.answerdetail.tag = tag;
      },
      //添加悬赏
      changeMoney(money){
        this.answerdetail.reward = money*100
      },
      //上一步
      pushnewquestionPre(){
        this.answerdetail.tag = [];
        this.inNext = false;
        console.log(this.answerdetail)
        console.log(this.text);
      },
      //提交
      pushnewquestion(){
        this.answerdetail.desc = this.descphoto.concat(this.answerdetail.desc)
        const toast = this.$createToast({
          time: 0,
          txt: '正在提交'
        })
        toast.show();

        console.log(this.answerdetail)
        
        addNewQuestion(this.answerdetail)
        .then(res => {
          toast.hide();

          const tip = this.$createToast({
            txt: '提交成功!',
            type: 'correct',
            time: 1300
          })
          tip.show();

          setTimeout(() => { this.close(); }, 1600);

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
    }
  }
</script>

<style scoped>
  .answer-container{
    margin-bottom: 70px;
    overflow: hidden;
  }
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
    /*height: 60vh;*/
  }
  .questiontitle{
    position: absolute;
    margin-top: 12px;
    padding-bottom: 2.5px;
    margin-bottom: 2.5px;
    color: #c0c0c0;
    z-index: -1;
  }
  .footerStyle{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:flex-end;
    width: 94%;
    height: 27px;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .coverArea{
    position: absolute;
    width: 100%;
    /*height: 100%;*/
    min-height: 40vh;
    font-size: 14px;
    margin-top: 17px;
    line-height: 16px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    background: #fff;
    border: 0;
    z-index: 10;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
</style>