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
      <van-search
        v-model="searchvalue"
        @search="onSearch"
        slot="title"
        class="titleSearch"
      >
      </van-search>
    </van-nav-bar>

    <!-- 顶部留白 -->
    <div class="topblank"></div>
    <detailContent :question="questiondetail"></detailContent>
    <div class="answerblank"></div>
    <div v-for="answer in answerData" :key="answer.id">
      <answer :answer="answer"></answer>
    </div>

  </div>
</template>

<script>
  import { NavBar } from 'vant';
  import { Search } from 'vant';
  import detailContent from "../components/detailContent";
  import answer from "../components/answer";

  export default {
    data(){
      return {
        searchvalue: "",
        questiondetail: {},
        answerData:[
          {
            id:1,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            username:"青石先生",
            imgurl:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg",
            content:"前女友：真是反了 谈恋爱你就想牵手 结婚后你难道还想上床？我：..............——————手动分割线————————评论...",
            replay:"128",
            time:"1天前"
          },
          {
            id:2,
            avator:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            username:"青石先生",
            imgurl:"https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg",
            content:"前女友：真是反了 谈恋爱你就想牵手 结婚后你难道还想上床？我：..............——————手动分割线————————评论...",
            replay:"128",
            time:"1天前"
          }
        ]
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Search.name]: Search,
      detailContent,
      answer,
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
  .topblank{
    margin-top: 46px;
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