<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="发现"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 搜索框 -->
    
    <van-search
      v-model="searchvalue"
      show-action
      @search="onSearch"
      class="search-box"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    

    <!-- 顶部留白 -->
    <div class="topblank"></div>
    <div>123456</div>
    
  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import { Search } from 'vant';

  export default {
    data(){
      return {
        searchvalue:"",

      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Search.name]: Search
    },
    methods: {
      //返回首页
      prepage(){
        this.$router.push({ path: "/home"})
      },
      async onSearch(){
        alert("搜索")
      }
    }
  }
</script>

<style scoped>
  .topblank{
    margin-top: 87.6px;
    margin-top: 150px;
  }
  .search-box{
    position: fixed;
    top: 45.6px;
    width: 100%;
    padding-top: 5vh;
    padding-bottom: 3vh;
    /*background: url(https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/beatch.jpg) !important;*/
  }
  
</style>