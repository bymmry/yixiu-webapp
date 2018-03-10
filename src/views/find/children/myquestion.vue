<template>
  <div class="question-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="question in questionData" :key="question.id" @click="createdQStorage(question)">
        <questionBox  :question="question"></questionBox>
      </div>
    </van-pull-refresh>


    <!-- 这里再添加一个组件，当没有内容的时候显示的东西 -->

  </div>
</template>

<script>
  //vant
  import questionBox from '../components/questionBox.vue'
  import { getQuestionListById } from '../../common/api'
  import { PullRefresh } from 'vant';

  export default {
    data(){
      return {
        isLoading:false,
        userId: "",
        questionData:[]
      }
    },
    components: {
      questionBox,
      [PullRefresh.name]: PullRefresh,
    },
    methods: {
      //刷新
      onRefresh(){
        this.getQuestionList(this.userId);
      },
      //获取列表
      getQuestionList(postdata){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();

        getQuestionListById(postdata)
          .then(res => {
            toast.hide();
            this.isLoading = false;
            this.questionData = res.data;
            // console.log(res.data)
          },(err => {
            console.log(err);
          }))
      },
      //建立点击question的Storage
      createdQStorage(question){
        sessionStorage.setItem("questionId", question._id);
        this.$router.push({ path: "/find/questiondetail"})
      }
    },
    created() {
      let userData = this.getUserInfo();
      this.userId = userData._id;
      this.getQuestionList(this.userId)
    }
  }
</script>

<style scoped>
  .question-container{
    background: #ebebeb;
    min-height: 100vh;
    padding-top: 1.6vh;
    margin-bottom: 10vh;
  }
</style>
