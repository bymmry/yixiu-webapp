<template>
  <div class="question-container">
    <router-link v-for="question in questionData" :key="question.id" :to="{ path: '/find/questiondetail' }">
      <questionBox  :question="question"></questionBox>
    </router-link>
    

    <!-- 这里再添加一个组件，当没有内容的时候显示的东西 -->

  </div>
</template>

<script>
  //vant
  import questionBox from '../components/questionBox.vue'
  import { getQuestionList } from '../../common/api'

  export default {
    data(){
      return {
        gatQuestionData:{
          tag: [],
          title: "",
          desc: "",
          info: "",
          limit: 10,
          skip: 0
        },
        questionData:[]
      }
    },
    components: {
      questionBox
    },
    methods: {
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
          this.questionData = res.data;
          console.log(res.data)
        },(err => {
          console.log(err);
        }))
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