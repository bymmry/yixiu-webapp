<template>
  <div class="question-container">
      <cube-scroll
        class="scroll"
        :data="questionData"
        :options="options"
        ref="questionList" 
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp">
        <div>
          <div v-for="question in questionData" :key="question.id" @click="createdQStorage(question)">
            <questionBox  :question="question" :questionType="questionType"></questionBox>
          </div>

          <!-- <div class="getMoeMessage" @click="addNewmessage" v-if="!disabled">
            点击获得更多信息
          </div>
          <div class="getMoeMessage"  v-else>
            已无更多信息
          </div> -->
        </div>
      </cube-scroll>


    <!-- 这里再添加一个组件，当没有内容的时候显示的东西 -->

  </div>
</template>

<script>
  //vant
  import questionBox from '../components/questionBox.vue'
  import { getQuestionList } from '../../common/api'
  import { PullRefresh  } from 'vant';

  export default {
    data(){
      return {
        questionType:"all",
        // disabled:false,
        gatQuestionData:{
          // tag: [],
          // title: "",
          // desc: "",
          // info: "",
          state: [1,2],
          limit: 10,
          skip: 0
        },
        figer:[true,true,true,true],
        questionData:[],
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          },
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: 'Load more',
              noMore: '没有更多了'
            }
          }
        }
      }
    },
    components: {
      questionBox,
      [PullRefresh.name]: PullRefresh,
    },
    methods: {
      //刷新
      // onRefresh(){
      //   this.gatQuestionData.limit = 10;
      //   this.gatQuestionData.skip = 0;
      //   // this.disabled = false;
      //   this.getquestionlist(this.gatQuestionData,"new");
      // },
      //获取列表
      getquestionlist(postdata/*,type*/){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        getQuestionList(postdata)
        .then(res => {
          console.log(res);
          toast.hide();
          // if (res.data.length < 10 || !res.data.length) {
          //   this.disabled = true;
          // }
          // if (type!=="new") {
            this.questionData = res.data
          // }else{
            // this.questionData = this.questionData.concat(res.data);
          // }
        },(err => {
          console.log(err);
        }))
      },
      //建立点击question的Storage 并跳转
      createdQStorage(question){
        sessionStorage.setItem("questionId", question._id);
        this.$router.push({ path: "/find/questiondetail"})
      },
      //点击获取新的数据
      // addNewmessage(){
      //   this.gatQuestionData.limit +=10;
      //   this.gatQuestionData.skip +=10;
      //   this.getquestionlist(this.gatQuestionData);
      // },
      onPullingDown(){
        this.gatQuestionData = {
          state: [1,2],
          limit: 10,
          skip: 0
        },
        this.getquestionlist(this.gatQuestionData)
        setTimeout(() => {
          this.$refs.questionList.forceUpdate()
        }, 1000)
      },
      onPullingUp(){
        this.gatQuestionData.limit +=10;
        this.gatQuestionData.skip +=10;
        getQuestionList(this.gatQuestionData)
        .then(res => {
          if (res.data.length < 10 || !res.data.length) {
            this.$refs.questionList.forceUpdate()
          }else{
            this.questionData = this.questionData.concat(res.data);
          }
        },(err => {
          console.log(err);
        }))
      }
    },
    created() {
      this.getquestionlist(this.gatQuestionData);
    }
  }
</script>

<style scoped>
  .scroll{
    width: 100%;
    height: 76vh;
  }
  .question-container{
    background: #ebebeb;
    /*min-height: 100vh;*/
    padding-top: 1.6vh;
    /*margin-bottom: 10vh;*/
  }
/*  .getMoeMessage{
    width: 100%;
    height: 100px;
    line-height: 100px;
    margin-top: -1.7vh;
    text-align: center;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  }*/
  .figer{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);   /* IE 9 */
    -moz-transform:rotate(90deg);  /* Firefox */
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    -o-transform:rotate(90deg);  /* Opera */
    margin-bottom: 5px;
  }
  .figerbox{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
</style>