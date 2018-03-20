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

    <cube-scroll class="scroll" :data="answerData">
      <div style="padding-bottom:30px;">
        <!-- 问题部分 -->
        <detailContent :question="questiondetail" @type="canChose"></detailContent>
        <div class="answerblank"></div>
        <!-- 回答部分 -->
        <div v-for="answer in answerData" :key="answer.id" @click="jumpanswerDetail(answer)">
          <answerBox :answer="answer"></answerBox>
        </div>
      </div>
      
    </cube-scroll>
  </div>
</template>

<script>
  import { NavBar } from 'vant';
  import detailContent from "../components/detailContent";
  import answerBox from "../components/answerBox";
  import topNav from "../components/topNav";
  import { getQuestionByQid, getQAListByQid } from '../../common/api'

  export default {
    data(){
      return {
        caniChose:false,
        questionId:"",
        getAnswerList: {},
        questiondetail: {},
        answerData:[
          //{
            // _id: "",   //该回复的id
            // question: "",  //该问题的id
            // content:"",    //回答的内容
            // author:"",     //回答人的id
            // adopt:false,   //该回答是否被采纳
            // reply:[],    //该回答的子评论
            // createdAt: 0,  //创建时间  时间戳
            // like:0      点赞数
          //}
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
        answer.points = this.questiondetail.reward;
        let arr = this.questiondetail.reply ? this.questiondetail.reply : 0;
        answer.comment = arr.length ? arr.length : 0;

        if(this.caniChose === true ){
          answer.choseA = true;
        }

        this.$router.push({ name: "answerdetail", params:{answerData: answer}})
      },
      //吧info和Img的内容连接起来
      allcontent(){
        for(let index in this.questiondetail.image){
          this.questiondetail.info = 
          this.questiondetail.info.concat(`<img src=${this.questiondetail.image[index]}>`)
        }
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
          this.questiondetail = res.data;
          this.allcontent();
          // console.log(this.questiondetail)
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
          // console.log(this.answerData)
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

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0

      this.questionId = sessionStorage.getItem("questionId")
      // console.log(this.questionId);

      this.getQuestion(this.questionId);
      this.getQAList(this.questionId);

    }
  }
</script>

<style scoped>
  .scroll{
    width: 100%;
    height: 85vh;
    /*padding-bottom: 45px;*/
  }
  .prepage{
    display: flex;
    flex-direction: row;
    align-items:center;
    width: 65px;
    color: rgb(98, 164, 255);
    margin-left: -15px;
    padding-left: 11px;
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
    /*min-height: 100vh;*/
    height: 91vh;
    overflow: hidden;
    /*padding-bottom: 45px;*/
    /*margin-bottom: 30px;*/
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