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

    <div class="replyTop">评论(270)</div>

    <replyBox v-for="reply in replyData" :key="reply.id" :reply="reply" @replyuser="replyuser"></replyBox>
    
    <div class="newreply">
      <input class="replyInput" type="text" :placeholder="replyplaceholder" v-model="reply">
      <div @click="pushnewreply"><sicon name="find-send" scale="2.3" color="#9c9c9c" ></sicon></div>
      
    </div>

    <div class="replyTop"></div>
  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "../components/topNav"
  import replyBox from "../components/replyBox"

  export default {
    data(){
      return {
        replyplaceholder:"添加评论",
        reply:"",
        replyData:[
          {
            id:1,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            name:"鬼人再世",
            content:"这图是咋凑起来的。。。",
            time:"01-11",
            like:"474"
          },
          {
            id:2,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            name:"死肥宅哦",
            content:"一直以为第一个和第二个是同一个人",
            time:"01-11",
            like:"502"
          },
          {
            id:3,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            name:"时光米U型",
            content:"倚天屠龙记？",
            time:"01-11",
            like:"84"
          },
        ]
      }
    },
    components: {
      topNav,
      replyBox,
      [NavBar.name]: NavBar,
    },
    methods: {
      close(){
        this.$router.go(-1)
      },
      replyuser(name){
        this.replyplaceholder = "回复：";
        this.replyplaceholder += name;
      },
      async pushnewreply(){
        this.functionunavailable()
      }
    },
    created(){
      
    }
  }
</script>

<style scoped>
  .reply-container{
    background: #f6f6f6;
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