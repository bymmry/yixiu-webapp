<template>
  <div class="answer-container">
    <van-nav-bar
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
    
    <topNav></topNav>

    <div class="answercontent" v-html="answerdetail.content">
      <!-- {{  }} -->
    </div>

    <div class="answerFooter">
      <div class="supportArea">
        <div class="supportBtn" @click="clickSupport">
          <sicon name="find-support" scale="1.7"></sicon>
          200
        </div>
        <div class="supportBtn" @click="clickUnSupport">
          <sicon name="find-unsupport" scale="1.7"></sicon>
          0
        </div>
        
      </div>
      <div class="otherBtn">
        <div class="funcBtn" @click="clickCollect">
          <sicon name="my-collect" scale="2"></sicon>
          收藏
        </div>
        <div class="funcBtn" @click="seereply">
          <sicon name="find-talk" scale="2"></sicon>
          <div>270</div>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "../components/topNav";
  import { likethis } from '../../common/api'

  export default {
    data(){
      return {
        answerdetail:{
          id:11,
          avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
          username:"青石先生",
          imgurl:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg",
          content:"<p>前女友：真是反了 谈恋爱你就想牵手 结婚后你难道还想上床？我：..............——————手动分割线————————评论...</p><img src='https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg'>",
          replay:"128",
          time:"1天前",
          title: "为什么安卓刘海屏都有一个极丑的下巴??"
        }
      }
    },
    components: {
      [NavBar.name]: NavBar,
      topNav
    },
    methods: {
      prepage(){
        this.$router.go(-1)
      },
      //点击不支持
      clickUnSupport(){
        this.functionunavailable();
      },
      //点击支持
      clickSupport(){

        this.functionunavailable();
        /*
        likethis(postdata)
        .then(res => {
          toast.hide();
          this.questionData = res.data;
          console.log(res.data)
        },(err => {
          console.log(err);
        }))
        */
      },
      //点击收藏
      clickCollect(){
        this.functionunavailable();
      },
      //查看回复
      seereply(){
        this.$router.push({ path: "/find/reply/1"});
      }
    },
    created:function(){
      
      let answerId = this.$route.params.answerId
      console.log(answerId)
      //获取到id后交互得到具体的内容
    },
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
    min-height: 80vh;
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
  .answercontent{
    padding: 3.2vh 3.2vw;
    /*width: 93.6vw;*/
  }
  .answercontent >>> img{
    display: block;
    max-width: 93.6vw;
  }
  .answerFooter{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 27px;
    border-top: 0.3vw solid #ebebeb;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .supportArea{
    display: flex;
    justify-content:center;
    width: 50%;
  }
  .supportBtn{
    margin-right: 2vw;
    display: flex;
    flex-direction: row;
    align-items:center;
    padding: 1.9vh 2vw;
    border-radius: 4px;
    background: #ebebeb;
    color: #999;
  }
  .supportBtn svg{
    display: inline-block;
    margin-right: 2vw;
  }
  .otherBtn{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
  }
  .funcBtn{
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    margin-left: 6.8vw;
    font-size: 4vw;
    color: #333;
  }
  .funcBtn svg{
    margin-bottom: 0.6vh;
  }
</style>