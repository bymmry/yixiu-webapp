<template>
  <div class="question-container">
    <!-- <router-link  :to="{path:'/find/questionDetail/',params:{question:question}}"> -->
    <!-- <router-link :to="{path:'/hotel',params:{id:item.id}}"> -->
    <router-link v-for="question in questionData" :key="question.id" :to="{ name:'questiondetail', params: { question: question }}">
      <questionBox  :question="question" @click="jumpDetail(question)"></questionBox>
    </router-link>
    

    <!-- 这里再添加一个组件，当没有内容的时候显示的东西 -->

  </div>
</template>

<script>
  //vant
  import questionBox from '../components/questionBox.vue'

  export default {
    data(){
      return {
        questionData:[
          {
            id: 1,
            title: "为什么安卓刘海屏都有一个极丑的下巴??",
            content: "所有人都说 iPhone X 丑，然后都出了一个比 iPhone X 更丑的刘海加下巴的设计手机，比如传闻中的华为 P20、一加6、Vivo X21都采用这样的设计。",
            reply: 613,
            imgurl: "https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/img1.jpg",
            followhuman: 9683,
            folloed: true,
          },
          {
            id: 2,
            title: "为什么安卓刘海屏都有一个极丑的下巴??",
            content: "所有人都说 iPhone X 丑，然后都出了一个比 iPhone X 更丑的刘海加下巴的设计手机，比如传闻中的华为 P20、一加6、Vivo X21都采用这样的设计。",
            reply: 613,
            imgurl: "https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/img1.jpg",
            followhuman: 9683,
            folloed: false,
          },
          {
            id: 3,
            title: "为什么安卓刘海屏都有一个极丑的下巴??",
            content: "所有人都说 iPhone X 丑，然后都出了一个比 iPhone X 更丑的刘海加下巴的设计手机，比如传闻中的华为 P20、一加6、Vivo X21都采用这样的设计。",
            reply: 613,
            imgurl: "https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/img1.jpg",
            followhuman: 9683,
            folloed: false,
          }

        ]
      }
    },
    components: {
      questionBox
    },
    methods: {
      jumpDetail(questionData){
        console.log(questionData);
        // this.$route.push({path:'/find/questionDetail',params:{question:questionData}});//类似post传参
      }
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