<template>
  <div id="app">

    <div class="appBox">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件-->
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不被缓存的视图组件-->
      </router-view>
    </div>
    <!--顶部导航-->
    <div class="nav">
      <navigation></navigation>
    </div>
  </div>
</template>

<script>
  import navigation from './views/common/components/navigation';
  // import mainApp from './views/common/App';

  import {
    reguser
  } from './views/common/api'
  export default {
    name: 'App',
    components: {
      navigation,
      // mainApp
    },
    async created() {
      let winUrl = window.location.href;
      //带参数
      if (winUrl.indexOf('?') !== -1) {
        let userData = this.urlDataTurnObj(window.location.href);
        userData = JSON.parse(userData);
        // alert(window.location.href);
        console.log(userData);

        /**
         * 根据state判断入口
         * 
         */

        if (userData.state) {
          if (userData.state == 123) { //公众号进入
            sessionStorage.setItem("code", userData.code);
            let wxInfo = await this.$api.getData(`https://m.yixiutech.com/user/wx/${userData.code}`);
            console.log(wxInfo);
            alert(wxInfo.code);
          } else {

          }
        } else {
          let pushData = this.reguserinfo(userData);
          // console.log(pushData)
          reguser(pushData).then(res => {
            console.log(res);
            //注册成功
            // console.log(res)
            // if (Data !== {} && Data !== null) {
            let userData2 = JSON.stringify(res.data);
            // console.log(res.data);
            sessionStorage.setItem("userData", userData2);
            // console.log(sessionStorage.getItem("userData"));
            // }


          }, (err => {
            console.log(err)
          }))
        }
        window.isAttestation = false;
        // if (location.href.indexOf('sellerHome') !== -1) {
        //   this.checkIsShop(userData);
        // } else {
        //   this.$router.push("/home");
        // }


      } else { // 不带参数

      }

      // console.log(userData);
      // sessionStorage.setItem("userData", userData);
    },
    data() {
      return {
        active: false
      }
    },
    methods: {
      async checkIsShop(userData) {

        let res = await this.$api.sendData('https://m.yixiutech.com/shop/user/', {
          openid: userData.openid
        });
        if (res.code == 4004) {
          this.$router.push('/enterRules');
          return;
        }
        sessionStorage.setItem('userData', userData.openid);
        localStorage.setItem('shopData', JSON.stringify(res.data));
        this.$router.push('/sellerHome')
      }
    }
  }

</script>


<style scoped>
  #app {
    position: fixed;
    top: 0;
    left: 0;
    /* height: 97%;
    min-height: 550px; */
  }

  .van-field input,
  .van-field textarea {
    text-align: right;
  }

  .appBox {
    width: 100%;
    height: 92%;
    min-height: 480px;
    overflow: scroll;
  }

  .nav {
    position: relative;
    top: 0;
  }

</style>

