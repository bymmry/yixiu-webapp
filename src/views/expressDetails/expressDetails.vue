<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="物流详情"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <div :class="stateStyle[emailData.status]" class="Listtitle">{{state[emailData.status]}}</div>
    <div class="Listtitle">快递公司：{{emailData.company}}</div>
    <div class="Listtitle">快递单号：{{emailData.no}}</div>
    
    <div class="messageBox">
      <last-list-area :list="nowstate" :key="index" v-if="emailData.status!=1"></last-list-area>
      <get-list-area :list="nowstate" :key="index" v-else></get-list-area>
      <list-area v-for="(list,index) in emailData.list" :list="list" :key="index"></list-area>

    </div>

  </div>

</template>

<script>
  import { NavBar } from 'vant';
  import { getemail } from '../common/api'
  import listArea from "./components/list"
  import lastListArea from "./components/last-list"
  import getListArea from "./components/get-list"


  export default {
    data () {
      return {
        nowstate:{},
        state:{
          '0':"关闭",
          '1':"已签收",
          '2':"配送中"
        },
        stateStyle:{
          '0':"close",
          '1':"get",
          '2':"onway"
        },
        emailData:{},
        finddata:{}
      }
    },
    components: {
      [NavBar.name]: NavBar,
      listArea,
      lastListArea,
      getListArea
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.go(-1)
      },
      gettheemail(res){
        this.emailData = res.data.result;
        this.emailData.list = this.emailData.list.reverse();
        this.nowstate = this.emailData.list[0];
        delete this.emailData.list[0];
      }
    },
    created() {
      let res = this.$route.params.res;
      console.log(res);
      this.gettheemail(res);
    }
  }
</script>

<style scoped>
  .Listtitle{
    margin-left: 7vw;
    margin-bottom: 10px;
  }
  .messageBox{
    margin-top: 30px;
  }
  .myinfo-container{
    overflow: hidden;
    width: 100vw;
    margin-bottom: 70px;
  }
  .orderinput{
    border-bottom: 1px solid rgb(244, 244, 244);
  }
  .topblank{
    margin-top: 15vh;
  }
  .findBtn{
    width: 90vw;
    margin-left: 5vw;
    margin-top: 5vh;
  }
  .close{
    color: rgb(204, 204, 204);
  }
  .get{
    color: #2796CB;
  }
  .onway{
    color: rgb(250, 135, 26);
  }

</style>