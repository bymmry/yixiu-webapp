<template>
  <div>
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

    <!-- 顶部留白 -->
    <div class="topblank"></div>
    <!-- Vant 标签页组件 -->

    <van-tabs :active="0" @disabled="onClickDisabled"  @click="handleTabClick" class="tabsBox">
      <van-tab v-for="(index,num) in 2" :disabled="index === 2" :key="num">


        <div slot="title" class="kindtitlebox" v-if="index===1">
          <van-icon name="question" />问答
        </div>

        <div slot="title" v-else class="kindtitlebox">
          <van-icon name="close" />热榜
        </div>

        <router-view></router-view>

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import { Search } from 'vant';
  import { Tab, Tabs } from 'vant';
  import { Icon } from 'vant';

  export default {
    data(){
      return {
        searchvalue:"",

      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Search.name]: Search,
      [Icon.name]: Icon,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab
    },
    methods: {
      //返回首页
      prepage(){
        this.$router.push({ path: "/home"})
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
      //点击标签
      handleTabClick() {
        const toast = this.$createToast({
          time: 0,
          type: "loading"
        })
        toast.show();
        this.$router.push({ path: "/find/question"});
        toast.hide();
      },
      async onSearch(){
        alert("搜索")
      },
      //发起新提问
      newQuestion() {
        this.onClickDisabled()
      }
    }
  }
</script>

<style scoped>
  .titleshadow{
    -moz-box-shadow:0vw -0.5vh 3vw #b6baba; 
    -webkit-box-shadow:0vw -0.5vh 3vw #b6baba; 
    box-shadow:0vw -0.5vh 3vw #b6baba;
  }
  .topblank{
    margin-top: 46px;
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

