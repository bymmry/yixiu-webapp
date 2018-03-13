<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件-->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件-->
    </router-view>

    <!--顶部导航-->
    <navigation></navigation>
  </div>
</template>

<script>
  import navigation from './views/common/components/navigation';
  // import mainApp from './views/common/App';

  import { reguser } from './views/common/api'
  export default {
    name: 'App',
    components: {
      navigation,
      // mainApp
    },
    created() {
      console.log("App onload--------------------------------------------------->");
      // alert(window.location.href);  
      if (location.href.indexOf('sellerHome') !== -1) {
        this.checkIsShop(userData);
        console.log("sellerHome");
      }else {
        this.$router.push("/home");
      }
      let userData = this.urlDataTurnObj(window.location.href);
      // alert(userData);
      console.log(userData);
      // let userData = sessionStorage.getItem("userData");
      userData = JSON.parse(userData);
      console.log(userData)
      let pushData = this.reguserinfo(userData);
      // console.log(pushData)
      reguser(pushData).then(res => {
        //注册成功
        // console.log(res)
        // if (Data !== {} && Data !== null) {
        let userData2 = JSON.stringify(res.data);
        console.log(res.data);
        sessionStorage.setItem("userData", userData2);
        console.log(sessionStorage.getItem("userData"));
        // }

        console.log(location.href.indexOf('sellerHome'));
        if (location.href.indexOf('sellerHome') !== -1) {
          this.checkIsShop(userData);
          console.log("sellerHome");
        }else {
          this.$router.push("/home");
        }


      },(err => {
        console.log(err)
      }))
      // console.log(userData);
      // sessionStorage.setItem("userData", userData);
    },
    methods: {
      async checkIsShop (userData) {
        let res = await this.$api.sendData('https://m.yixiutech.com/shop/user/', {openid: userData.openid});
        localStorage.setItem('shopData', JSON.stringify(res.data));
        if (res.code == 4004) {
          this.$router.push('/businessRegister');
          return;
        } else {
          this.$router.push('/sellerHome')
        }
      }
    }
  }
</script>

<style scoped>
  #app{
    /*height: 97%;*/
  }
  .van-field input, .van-field textarea{
    text-align: right;
  }
</style>
