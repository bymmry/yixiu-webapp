<template>
  <div class="graybg">
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
    
    <topNav></topNav>
    <div class="topbland"></div>
    <!-- Vant 标签页组件 -->

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div v-for="question in questionData" :key="question.id" @click="createdQStorage(question)">
        <questionBox :question="question"></questionBox>
      </div>
    </van-pull-refresh>
    

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import { Search } from 'vant';
  import topNav from "../components/topNav"
  import questionBox from '../components/questionBox.vue'
  import { getQuestionList } from '../../common/api'
  import { PullRefresh } from 'vant';

  export default {
    data(){
      return {
        isLoading:false,
        searchvalue:"",
        questionData:[],
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Search.name]: Search,
      [PullRefresh.name]: PullRefresh,
      topNav,
      questionBox
    },
    methods: {
      //刷新
      onRefresh(){
        let tagSearch = {
          tag:[],
          title: this.searchvalue,
          desc:"",
          info:"",
          limit:10,
          skip:0
        }
        this.getquestionlist(tagSearch);
      },
      //返回上一页
      prepage(){
        this.$router.go(-1)
      },
      async onSearch(){
        let tagSearch = {
          // tag:[],
          title: this.searchvalue,
          // desc:"",
          // info:"",
          limit:10,
          skip:0
        }
        this.getquestionlist(tagSearch);
      },
      //搜索
      getquestionlist(postdata){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        getQuestionList(postdata)
        .then(res => {
          toast.hide();
          this.isLoading=false;
          this.questionData = res.data;
          console.log(res.data)
        },(err => {
          console.log(err);
        }))
      },
      //建立点击question的Storage 并跳转
      createdQStorage(question){
        sessionStorage.setItem("questionId", question._id);
        this.$router.push({ path: "/find/questiondetail"})
      }
    },
    created(){
      let searchData = this.$route.params.searchData
      this.searchvalue = searchData.title;
      this.getquestionlist(searchData)
      // console.log(searchData)
    }
  }
</script>

<style scoped>
  .titleshadow{
    -moz-box-shadow:0vw -0.5vh 3vw #b6baba; 
    -webkit-box-shadow:0vw -0.5vh 3vw #b6baba; 
    box-shadow:0vw -0.5vh 3vw #b6baba;
  }
  .titleSearch{
    float: right;
    width: 85vw;
    margin-top: 2px;
    background: transparent !important;
  }
  .tabsBox .van-tabs__wrap{
    position: fixed;
    margin-top: 46px;
  }
  .prepage{
    display: flex;
    flex-direction: row;
    align-items:center;
    width: 16vw;
    color: rgb(98, 164, 255);
    margin-left: -2vw;
  }
  .topbland{
    padding-top: 3px;
  }
  .graybg{
    min-height: 100%;
    background: #ebebeb;
  }
</style>

