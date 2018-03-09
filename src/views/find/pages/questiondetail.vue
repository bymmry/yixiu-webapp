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
      <detailContent :question="questiondetail" @type="canChose"></detailContent>
      <div class="answerblank"></div>
      <!-- 回答部分 -->
      <div v-for="answer in answerData" :key="answer.id" @click="jumpanswerDetail(answer)">
        <answerBox :answer="answer"></answerBox>
      </div>

    </van-pull-refresh>

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
        caniChose:false,
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
      //前往单个回答详情
      jumpanswerDetail(answer){
        // console.log(answer)
        answer.father = this.questiondetail.title;
        let arr = this.questiondetail.reply ? this.questiondetail.reply : 0;
        answer.comment = arr.length ? arr.length : 0;

        if(this.caniChose === true ){
          answer.choseA = true;
        }

        this.$router.push({ name: "answerdetail", params:{answerData: answer}})
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
          // console.log(res.data)
          this.answerData = res.data;
          console.log(this.answerData)
        },(err => {
          console.log(err);
        }))
      },
      //如果是从 我的选项 进来的，添加删除绑定
      canChose(type){
        this.caniChose = true;
      }
    },
    created:function(){
      if (this.isLoaded==false) {
        console.log(this.$route.params.question)
        this.questiondetail = this.$route.params.question;
        this.isLoaded = true;
      }else{
        console.log(ok);
      }
      
      // console.log(this.questiondetail)

      // for(let answer in this.answerData){
      //   this.answerData[answer].title = this.questiondetail.title
      //   this.answerData[answer].father = this.questiondetail
      // }
      
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
  .popup{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width: 80%;
    height: 30%;
  }
  .popupBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .popupTitle{
    margin-bottom: 3vh;
  }
  .popupBtn{
    width: 80%;
  }
  .popupBtn button{
    width: 40%;
  }
</style>