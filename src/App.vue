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
            let res = await this.$api.getData(`https://m.yixiutech.com/user/wx/${userData.code}`);
            let useInfo = this.initUserInfo(res);
            let register = {
              collection: "User",
              'wx.openid': useInfo.wx.openid
            }
            let isRegister = this.$api.sendData(`https://m.yixiutech.com/sql/find`, register);
            if (isRegister == 'ok'){
              //绑定
              alert("请绑定手机号");
              this.$router.push("/my/information");
            }else{
              //更新用户信息
              let update = {
                collection: "User",
                find: {
                  _id: useInfo._id
                },
                update: {
                  name: useInfo.name,
                  wx: useInfo.wx
                }
              }
              let updateInfo = this.$api.sendData(`https://m.yixiutech.com/sql/update`, update);
            }
            sessionStorage.setItem("userData", JSON.stringify(useInfo));
            console.log();
            if(useInfo.wx.openid){
              let reqUser = {
                collection: 'User',
                find: {
                  _id: ''
                },
                update:{
                  wx: useInfo.wx
                }
              }
              let ri = this.$api.sendData("https://m.yixiutech.com/sql/update", reqUser);
              this.$toast("微信自动登录成功");
            }
            
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
      },
      initUserInfo(data) { //初始化用户信息
        const information = {
          headimgurl: data.headimgurl || '',//用户头像
          name: data.nickname || '翼修用户', //用户名称
          email: data.email || '', //邮箱
          mobile: data.mobile || '', //手机号
          password: data.password || '', //密码
          isSys: data.isSys || false, //是否是系统管理员
          role: data.role || [], //如[{name:'普通用户',power:1000},{name:'商家',power,2000}]
          wx: data, //微信信息:如openid,昵称和头像链接等等
          parent: data.parent || 0
        }
        if (information.parent === 0) {
          delete information.parent
        }

        return information;
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

