<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
      style="z-index:100"
    >
      <van-search
        v-model="searchvalue"
        @search="onSearch"
        slot="title"
        class="titleSearch"
      >
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
      }
    }
  }
</script>

<style scoped>
  .topblank{
    margin-top: 46px;
  }
  .titleSearch{
    float: right;
    width: 80%;
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
  
</style>

