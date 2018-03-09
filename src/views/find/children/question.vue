<template>
  <div class="question-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ul
        v-waterfall-lower="loadMore"
        waterfall-disabled="disabled"
        waterfall-offset="400"
      >
        <div v-for="question in questionData" :key="question.id" @click="createdQStorage(question)">
          <questionBox  :question="question"></questionBox>
        </div>
      </ul>

    </van-pull-refresh>
    

    <!-- 这里再添加一个组件，当没有内容的时候显示的东西 -->

  </div>
</template>

<script>
  //vant
  import questionBox from '../components/questionBox.vue'
  import { getQuestionList } from '../../common/api'
  import { PullRefresh } from 'vant';
  import { Waterfall } from 'vant';

  export default {
    data(){
      return {
        isLoading:false,
        gatQuestionData:{
          // tag: [],
          // title: "",
          // desc: "",
          // info: "",
          limit: 10,
          skip: 0
        },
        questionData:[]
      }
    },
    components: {
      questionBox,
      [PullRefresh.name]: PullRefresh,
      [Waterfall.name]: Waterfall,
    },
    methods: {
      //刷新
      onRefresh(){
        this.getquestionlist(this.gatQuestionData);
      },
      //获取列表
      getquestionlist(postdata){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();

        getQuestionList(postdata)
        .then(res => {
          toast.hide();
          this.isLoading = false;
          this.questionData.push(res.data);
          // console.log(res.data)
        },(err => {
          console.log(err);
        }))
      },
      //建立点击question的Storage 并跳转
      createdQStorage(question){
        sessionStorage.setItem("questionId", question._id);
        this.$router.push({ path: "/find/questiondetail"})
      },
      loadMore(){
        this.gatQuestionData.limit += 10;
        this.gatQuestionData.skip += 10;
      }
    },
    created() {
      this.getquestionlist(this.gatQuestionData)
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