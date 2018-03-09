<template>
  <div class="question-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">

        <div v-for="question in questionData" :key="question.id" @click="createdQStorage(question)">
          <questionBox  :question="question"></questionBox>
        </div>

        <div class="getMoeMessage" @click="addNewmessage" v-if="!disabled">
          获得更多信息
          <div class="figerbox"> 
            <!-- <sicon 
              name="find-figer" 
              scale="2" 
              class="figer" 
              v-for="index in figer" 
              v-if="figer[index] != true"
            >
            </sicon> -->
          </div>
          
        </div>


    </van-pull-refresh>
    
    


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
        disabled:false,
        isLoading:false,
        gatQuestionData:{
          // tag: [],
          // title: "",
          // desc: "",
          // info: "",
          limit: 10,
          skip: 0
        },
        figer:[true,true,true,true],
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
        this.gatQuestionData.limit = 10;
        this.gatQuestionData.skip = 0;
        this.disabled = false;
        this.getquestionlist(this.gatQuestionData,"new");
      },
      //获取列表
      getquestionlist(postdata,type){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        getQuestionList(postdata)
        .then(res => {
          toast.hide();
          this.isLoading = false;
          if (res.data.length < 10 || !res.data.length) {
            this.disabled = true;
          }
          if (type==="new") {
            this.questionData = res.data
          }else{
            this.questionData = this.questionData.concat(res.data);
          }
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
      addNewmessage(){
        this.gatQuestionData.limit +=10;
        this.gatQuestionData.skip +=10;
        this.getquestionlist(this.gatQuestionData)
      },
      async showFiger(arr){
        // for(let i = 0; i<=4; i++){
        //   setTimeout(function(){
        //     arr[i] = !arr[i]
        //   },500)
        //   if (i==4) {
        //     i = 0;
        //   }
        // }
      }
    },
    created() {
      this.getquestionlist(this.gatQuestionData);
      this.showFiger(this.figer)

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
  .getMoeMessage{
    width: 100%;
    height: 100px;
    line-height: 100px;
    margin-top: -1.7vh;
    text-align: center;
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  }
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