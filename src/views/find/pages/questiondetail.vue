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

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 问题部分 -->
      <detailContent :question="questiondetail"></detailContent>
      <div class="answerblank"></div>
      <!-- 回答部分 -->
      <div v-for="answer in answerData" :key="answer.id" @click="jumpanswerDetail(answer)">
        <answerBox :answer="answer"></answerBox>
      </div>

    </van-pull-refresh>

  </div>
</template>

<script>
  import { NavBar, PullRefresh } from 'vant';
  import detailContent from "../components/detailContent";
  import answerBox from "../components/answerBox";
  import topNav from "../components/topNav";
  import { getQuestionByQid, getQAListByQid } from '../../common/api'

  export default {
    data(){
      return {
        isLoading:false,
        questionId:"",
        getAnswerList: {},
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
          }
        ]
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [PullRefresh.name]: PullRefresh,
      detailContent,
      answerBox,
      topNav,
    },
    methods: {
      //刷新
      onRefresh(){
        this.getQuestion(this.questionId);
        this.getQAList(this.questionId);
      },
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
      //前往单个回答详情
      jumpanswerDetail(answer){
        console.log(answer)
        this.$router.push({ path: "/find/answerdetail"})
      },
      //通过id查询问题详情
      getQuestion(id) {
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        getQuestionByQid(id)
        .then(res => {
          toast.hide();
          this.isLoading = false;
          this.questiondetail = res.data;
        },(err => {
          console.log(err);
        }))
      },
      //通过id获取问题的回复列表
      getQAList(id){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        getQAListByQid(id)
        .then(res => {
          toast.hide();
          console.log(res)
          // this.questiondetail = res.data;
        },(err => {
          console.log(err);
        }))
      }
    },
    created:function(){

      this.questionId = sessionStorage.getItem("questionId")

      this.getQuestion(this.questionId);
      this.getQAList(this.questionId);
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