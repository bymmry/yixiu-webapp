<template>
  <div class="reply-container">
    <van-nav-bar
      fixed
      style="z-index:100"
      class="titleshadow"
    >
      <div slot="left" @click="close" class="close">
        <sicon name="close" scale="1.4"></sicon>
      </div>
      <div slot="title" class="newTitle">评论</div>
      </van-search>
    </van-nav-bar>
    
    <topNav></topNav>

    <div class="replyTop">评论({{ answerData.comment }})</div>

    <replyBox v-for="reply in replyData" :key="reply.id" :reply="reply" @replyuser="replyuser"></replyBox>
    
    <div class="newreply">
      <input class="replyInput" type="text" placeholder="添加评论" v-model="reply">
      <div @click="pushnewreply"><sicon name="find-send" scale="2.3" color="#9c9c9c" ></sicon></div>
      
    </div>

    <!-- <div class="replyTop"></div> -->
  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "../components/topNav"
  import replyBox from "../components/replyBox"
  import { replyQuestion } from '../../common/api'
  


  export default {
    data(){
      return {
        reply:"",
        replyData:[
          //{
            // _id: "",   //该回复的id
            // question: "",  //该问题的id
            // content:"",    //回答的内容
            // author:"",     //回答人的id
            // adopt:false,   //该回答是否被采纳
            // reply:[],    //该回答的子评论
            // createdAt: 0  //创建时间  时间戳
            // father:"",  问题的题目
            // like:0      点赞数
            // comment: 0   //子评论数，基于reply的长度
          //}
        ],
        pushData:{
          // content:'回复',
          // question:'5aa16da5fffff6833c5cd76a',
          // author:'5a9fdef96be1652f1a746b74'
          // parent:'xxxx',//父级评论的标识_id(不传这个字段则为1级评论 传了则为二级评论)
        }
      }
    },
    components: {
      topNav,
      replyBox,
      [NavBar.name]: NavBar,
    },
    methods: {
      close(){
        this.$router.push({ path: "/find/questiondetail"})
      },
      replyuser(Arr){
        this.reply = "回复：";
        this.reply += Arr[0];
        // this.pushData.parent = Arr[1]
        // console.log(Arr)
      },
      //评论
      async pushnewreply(){
        this.pushData.content = this.reply;
        this.pushData.question = this.answerData.question;
        let userData = this.getUserInfo();
        this.pushData.author = userData._id;

        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        replyQuestion(this.pushData)
        .then(res => {
          toast.hide();
          const tip = this.$createToast({
            txt: '评论成功！',
            type: 'success',
            time: 1300
          })
          //使用show调出方法
          tip.show();
          // this.$router.push();
          // location.reload();

          // let myreply = {
          //   author: userData._id,
          //   content:this.pushData.content,    //回答的内容
          //   updatedAt:Date.parse(new Date()),
          // }
          // this.answerData.reply = this.answerData.reply.push(myreply)
          // console.log(this.answerData)
        },(err => {
          const tip = this.$createToast({
            txt: '评论失败...',
            type: 'fail',
            time: 1300
          })
          //使用show调出方法
          tip.show()
          console.log(err);
        }))
      },
      
    },
    created(){
      let answerData = sessionStorage.getItem("answerData")
      // console.log(answerData)
      answerData = JSON.parse(answerData);
      console.log(answerData)
      this.pushData.parent = answerData._id;
      this.replyData = answerData.reply;
      this.answerData = answerData;

      // this.replyData = this.$route.params.answerData.reply;
      // this.answerData = this.$route.params.answerData;
    }
  }
</script>

<style scoped>
  .reply-container{
    background: #f6f6f6;
    margin-bottom: 70px;
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
  .replyTop{
    height: 6vh;
    width: 100vw;
    padding: 3vw 3vh;
    line-height: 6vh;
    color: #bababa;
    background: #f6f6f6;
  }
  .newreply{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    width: 94vw;
    height: 27px;
    border-top: 0.3vw solid #ebebeb;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .replyInput{
    width: 85%;
    padding-left: 1vw;
    padding-bottom: 0.5vh;
    border-bottom: 2px solid #eee;
    color: rgb(32, 32, 32);
    font-size: 4vw;
    font-weight: 700;
    letter-spacing: 0.2vw;
  }
  .replyInput::-webkit-input-placeholder {   
    /* WebKit browsers */   
    color: #c0c0c0;   
  }   
  .replyInput:-moz-placeholder {   
    /* Mozilla Firefox 4 to 18 */   
    color: #c0c0c0;   
  }   
  .replyInput::-moz-placeholder {   
    /* Mozilla Firefox 19+ */   
    color: #c0c0c0;   
  }   
  .replyInput:-ms-input-placeholder {   
    /* Internet Explorer 10+ */   
    color: #c0c0c0;   
  }

  .newreply svg{
    margin-left: 3vw;
  }

</style>