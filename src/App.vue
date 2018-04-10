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
    <div class="phoneNum">
      <cube-popup type="my-popup" ref="myPopup">
        My Popup Content 1
      </cube-popup>
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
      // let winUrl = window.location.href;
      // alert(winUrl);
      let winUrl = decodeURIComponent(window.location.href);
      // alert(winUrl);
      //带参数
      if (winUrl.indexOf('?') !== -1) {
        let userData = this.urlDataTurnObj(window.location.href);
        userData = JSON.parse(userData);
        console.log(userData);

        /**
         * 根据state判断入口
         * state=1 小程序入口
         * state=123 公众号入口
         * 
         */

        if (userData.state) {
          if (userData.state == 123) { //公众号进入
            this.initGZHInfo(userData);
            
          }else if(userData.state == 1){ //小程序入口
            this.initXCXInfo(userData);

          }else{

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
      },
      async isUserRegister(userInfo){
        //根据openid判断是否注册
        let register = {
          collection: "User",
          'wx.openid': userInfo.wx.openid
        }
        let isRegister = await this.$api.sendData(`https://m.yixiutech.com/sql/find`, register);
        alert(JSON.stringify(isRegister));
        console.log(isRegister.data);
        if (isRegister.data.length == 0){
          //注册
          sessionStorage.setItem("userData", JSON.stringify(userInfo));
          alert("你还没有注册，请先注册")
          this.$router.push("/register");
        }else{
          userInfo = isRegister.data[isRegister.data.length - 1];
          if(userInfo.mobile == ""){
            alert("你还未注册，请先注册");
            this.$router.push("/register");
          }else{
            //更新用户信息
            // alert("else 已注册");
            // users = isRegister.data[0];
            let update = {
              collection: "User",
              find: {
                _id: userInfo._id
              },
              update: {
                name: userInfo.wx.nickname,
                mobile: userInfo.mobile,
                wx: userInfo.wx
              }
            }
            console.log(update);
            let updateInfo = await this.$api.sendData(`https://m.yixiutech.com/sql/update`, update);
          
            sessionStorage.setItem("userData", JSON.stringify(userInfo));
            this.$toast("成功");
          }
         
        }
      },
      async initGZHInfo(userData){ //公众号好用户初始化
        // alert("公众号进入");
        sessionStorage.setItem("code", userData.code);
        let res = await this.$api.getData(`https://m.yixiutech.com/user/wx/${userData.code}`);
        // alert(JSON.stringify(res));
        if(res.openid){
          sessionStorage.setItem("openid", res.openid);
          let userInfo = this.initUserInfo(res);
          this.isUserRegister(userInfo);
        }else{
          alert("你还未注册，请先注册");
          this.$router.push("/register");
        }
        
      },
      async initXCXInfo(userData){ //小程序进入
        // alert("小程序进入");
        // alert(JSON.stringify(userData));
        if(userData.openid){
          sessionStorage.setItem("openid", userData.openid);
        }
        console.log(userData);
        let userInfo = initInfo(userData);
        console.log(userInfo);
        this.isUserRegister(userInfo);

        function initInfo(data){
          const user = {
            headimgurl: data.headimgurl || data.avatarUrl || '',//用户头像
            name: data.nickname || data.nickName || '翼修用户', //用户名称
            email: data.email || '', //邮箱
            mobile: data.mobile || '', //手机号
            password: data.password || '', //密码
            isSys: data.isSys || false, //是否是系统管理员
            role: data.role || [], //如[{name:'普通用户',power:1000},{name:'商家',power,2000}]
            wx: {
              openid: data.openid,
              nickname: data.nickName || '翼修用户',
              headimgurl: data.avatarUrl || ''
            }, //微信信息:如openid,昵称和头像链接等等
          }
          return user;
        }
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

