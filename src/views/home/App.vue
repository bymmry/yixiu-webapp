<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <HomeHeader></HomeHeader>
      <Swipe></Swipe>
      <Type></Type>
      <HotArea></HotArea>
      <Ticket></Ticket>
      <Activity></Activity>
      <div class="shopTitle">
        <h3><sicon name="home" scale="1.6"></sicon><span>附近维修店</span></h3>
      </div>
      <shop-list></shop-list>
      <div class="space"></div>
    </van-pull-refresh>

  </div>
</template>

<script>
  import Nav from '../common/components/navigation.vue'
  import HomeHeader from './components/header.vue'
  import Swipe from './components/swipe.vue'
  import Type from './components/type.vue'
  import HotArea from './components/hotArea.vue'
  import Ticket from './components/tickets.vue'
  import Activity from './components/activity.vue'
  import shopList from '../common/components/shopList'
  import { PullRefresh } from 'vant'
  import {reguser} from '../common/api'
  export default {
    components: {
      Nav,
      HomeHeader,
      Swipe,
      Type,
      HotArea,
      Ticket,
      Activity,
      shopList,
      [PullRefresh.name]: PullRefresh
    },
    data () {
      return {
        isLoading: false
      }
    },
    create() {
      let userData = this.urlDataTurnObj(window.location.href);
      console.log(userData);
      // let userData = sessionStorage.getItem("userData");
      userData = JSON.parse(userData);
      // console.log(userData)
      let pushData = this.reguserinfo(userData);
      reguser(pushData).then(res => {
        //注册成功
        // console.log(res)
        // if (Data !== {} && Data !== null) {
        let userData2 = JSON.stringify(res.data);
        console.log(res.data);
        sessionStorage.setItem("userData", userData2);
        console.log(sessionStorage.getItem("userData"));
        // }

        if (location.href.indexOf('sellerHome') !== -1) {
          this.checkIsShop(userData);
          console.log("sellerHome");
        }else {
          this.$router.push("/home");
        }
      },(err => {
        console.log(err)
      }))
    },
    methods: {
      onRefresh() {
        setTimeout(() => {
          this.prompt('刷新成功', 'success');
          this.isLoading = false;
        }, 500);
      }
    }
  }
</script>

<style scoped>
  .space {
    width: 100%;
    height: 8vh;
  }
  .shopTitle{
    width: auto;
    height: 5vh;
  }
  .shopTitle h3{
    width: auto;
    text-align: center;
  }
  .shopTitle h3 svg{
    color: #eea17a;
    margin-right: 2px;
  }
  .shopTitle h3 svg,  .shopList .shopTitle h3 span{
    vertical-align: middle;
    display: inline-block;
    line-height: 5vh;
    font-size: 13px;
  }
</style>
