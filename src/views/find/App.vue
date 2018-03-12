<template>
  <div v-if="newquestion === false">
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
        show-action
      >
      <div slot="action" @click="newQuestion" class="newQuestion">
        <sicon name="newQuestion" scale="1.7"></sicon>
        提问
      </div>
      </van-search>
    </van-nav-bar>

    <topNav></topNav>
    <!-- Vant 标签页组件 -->

    <van-tabs :active="0" @click="handleTabClick" class="tabsBox">
      <van-tab v-for="(index,num) in 2" :key="num">


        <div slot="title" class="kindtitlebox" v-if="index===1">
          <van-icon name="question" />问答
        </div>

        <div slot="title" v-else class="kindtitlebox">
          <van-icon name="contact" />我的
        </div>

        <router-view></router-view>

      </van-tab>
    </van-tabs>

  </div>
  <div v-else>
    <newquestion @close="newQuestion"></newquestion>
  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import { Search } from 'vant';
  import { Tab, Tabs } from 'vant';
  import { Icon } from 'vant';
  import newquestion from './components/newquestion'
  import topNav from "./components/topNav"

  export default {
    data(){
      return {
        newquestion:false,
        searchvalue:"",
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Search.name]: Search,
      [Icon.name]: Icon,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      newquestion,
      topNav
    },
    methods: {
      //返回首页
      prepage(){
        this.$router.push({ path: "/home"})
      },
      //点击不可使用
      willCome() {
        this.functionunavailable()
      },
      //点击标签
      handleTabClick(index) {
        
        sessionStorage.setItem("visitType", "other");
        if (index===0) {
          this.$router.push({ path: "/find/question"});
        }else if(index===1){
          this.$router.push({ path: "/find/myquestion"});
          sessionStorage.setItem("visitType", "my");
        }

      },
      async onSearch(){
        let tagSearch = {
          title: this.searchvalue,
          limit:10,
          skip:0
        }
        this.$router.push({ name: "search", params:{searchData: tagSearch}})
      },
      //发起、关闭新提问
      newQuestion() {
        let userData = this.getUserInfo();
        if (userData) {
          this.newquestion = !this.newquestion;
        }
      }
    },
    created(){
      sessionStorage.setItem("visitType", "other");
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
  .kindtitlebox{
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content: center;
    letter-spacing:2px;
  }
  .kindtitlebox i{
    margin-right: 2vw;
  }
  .tabsBox .van-tabs__wrap{
    position: fixed;
    margin-top: 46px;
  }
  .newQuestion{
    display: flex;
    flex-direction: row;
    align-items:center;
    width: 16vw;
    padding-left: 2vw;
    margin-right: -1vw;
    color: rgb(98, 164, 255);
  }
  .prepage{
    display: flex;
    flex-direction: row;
    align-items:center;
    width: 16vw;
    color: rgb(98, 164, 255);
    margin-left: -2vw;
  }
</style>

