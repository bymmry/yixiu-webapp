<template>
  <div class="questionDetail-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      style="z-index:100"
      class="titleshadow"
    >
      <div slot="left" @click="prepage" class="prepage">
        <sicon name="find-leftArr" scale="1.7"></sicon>
        返回
      </div>
      <div slot="title" class="detailTitle">{{ questiondetail.title }}</div>
      </van-search>
    </van-nav-bar>

    <topNav></topNav>

    <!-- 问题部分 -->
    <detailContent :question="questiondetail"></detailContent>
    <div class="answerblank"></div>
    <!-- 回答部分 -->
    <router-link v-for="answer in answerData" :key="answer.id" :to="{ name:'answerdetail', params: { answerId: answer.id }}">
      <answerBox :answer="answer"></answerBox>
    </router-link>

  </div>
</template>

<script>
  import { NavBar } from 'vant';
  import detailContent from "../components/detailContent";
  import answerBox from "../components/answerBox";
  import topNav from "../components/topNav";

  export default {
    data(){
      return {
        searchvalue: "",
        questiondetail: {},
        answerData:[
          {
            id:11,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            username:"青石先生",
            imgurl:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg",
            content:"前女友：真是反了 谈恋爱你就想牵手 结婚后你难道还想上床？我：..............——————手动分割线————————评论...",
            replay:"128",
            time:"1天前"
          },
          {
            id:12,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            username:"青石先生",
            imgurl:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg",
            content:"前女友：真是反了 谈恋爱你就想牵手 结婚后你难道还想上床？我：..............——————手动分割线————————评论...<image src='https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg'>",
            replay:"128",
            time:"1天前"
          }
        ]
      }
    },
    components: {
      [NavBar.name]: NavBar,
      detailContent,
      answerBox,
      topNav,
    },
    methods: {
      //返回首页
      prepage(){
        this.$router.push({ path: "/find/question"})
      },
      //点击不可使用
      onClickDisabled() {
        const toast = this.$createToast({
          txt: '本功能即将到来',
          type: 'error',
          time: 1500
        })
        //使用show调出方法
        toast.show()
      },
      async onSearch(){
        alert("搜索")
      }
    },
    created:function(){
      this.questiondetail = this.$route.params.question;
      for(let answer in this.answerData){
        this.answerData[answer].title = this.questiondetail.title
        this.answerData[answer].father = this.questiondetail
      }
      
      // console.log(this.$route.params)
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
  .detailTitle{
    display: inline-block;
    width: 60vw;
    color: #646464;
    white-space:nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .titleshadow{
    -moz-box-shadow:0vw -0.5vh 3vw #b6baba; 
    -webkit-box-shadow:0vw -0.5vh 3vw #b6baba; 
    box-shadow:0vw -0.5vh 3vw #b6baba;
  }
  .questionDetail-container{
    background: #ebebeb;
    min-height: 100vh;
    padding-bottom: 45px;
  }
  .titleSearch{
    float: right;
    width: 85vw;
    margin-top: 2px;
    background: transparent !important;
  }
  .answerblank{
    margin-top: 6vh;
  }
</style>