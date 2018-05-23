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


  var toast;
  export default {
    name: 'App',
    components: {
      navigation,
      // mainApp
    },
    async created() {
      // let winUrl = window.location.href;
      // alert(winUrl);
      toast = this.$createToast({
        txt: 'Loading...',
        mask: true,
        time: 2000
      })
      toast.show();
      let winUrl = decodeURIComponent(window.location.href);
      // alert(winUrl);
      //带参数
      if (winUrl.indexOf('?') !== -1) {
        let userData = this.urlDataTurnObj(window.location.href);
        userData = JSON.parse(userData);
        /**
         * 根据state判断入口
         * state=1 小程序入口
         * state=123 公众号入口
         * 
         */
        // document.body.appendChild('<script src="/static/baidumapv2/baidumap_offline_v2_load.js"><\/script>')

        if (userData.state) {
          if (userData.state == 123) { //公众号进入
            this.initGZHInfo(userData);

          } else if (userData.state == 1) { //小程序入口
            this.initXCXInfo(userData);

          } else if (userData.state == 2) { //app入口
            this.initAndroidApp();
          } else if (userData.state == 3) { //注册返利入口
            alert(winUrl);
          } else { //注册返利入口
            sessionStorage.setItem('parentId', userData.state);
            toast.hide();
            this.registerMoney(userData);
          }
        } else {
          toast.hide();
        }
        window.isAttestation = false;

      } else { // 不带参数

      }
    },
    data() {
      return {
        active: false,
      }
    },
    methods: {
      authLogin(auths) {
        if (auths) {
          let s = auths[0];
          if (!s.authResult) {
            s.login((e) => {
              s.getUserInfo(e => {
                // alert("成功：" + JSON.stringify(s.userInfo));
                // alert(s.userInfo);
                if (s.userInfo.openid) {
                  sessionStorage.setItem("openid", s.userInfo.openid);
                  let userInfo = this.initUserInfo(s.userInfo);
                  this.isUserRegister(userInfo);
                } else {
                  this.$toast("账号信息有误");
                }
              }, e => {
                alert("获取用户信息失败：" + e.message + " - " + e.code);
              });
            }, (e) => {
              this.$toast("登录认证失败！");
            });
          } else {
            this.$toast("已经登录认证！");
          }
        } else {
          this.$toast("微信登录失败！");
        }

      },
      authUserInfo(auths) {
        var s = auths[0];
        if (!s.authResult) {
          alert("未登录授权！");
        } else {
          s.getUserInfo(function (e) {
            alert("获取用户信息成功：" + JSON.stringify(s.userInfo));
            if (s.userInfo.openid) {
              sessionStorage.setItem("openid", res.openid);
              let userInfo = this.initUserInfo(s.userInfo);
              this.isUserRegister(userInfo);
            } else {
              this.$toast("账号信息有误");
            }
            sessionStorage.setItem("infoOfWX", JSON.stringify(s.userInfo));
          }, function (e) {
            alert("获取用户信息失败：" + e.message + " - " + e.code);
          });
        }
      },
      // 安卓app进入初始化
      initAndroidApp() {
        let that = this;

        document.addEventListener("plusready", function () {
          // 扩展API加载完毕，现在可以正常调用扩展API
          plus.oauth.getServices(function (services) {
            that.authLogin(services);
            // alert("webapp获取信息");
            // that.authUserInfo(auths);
          }, function (e) {
            alert("获取分享服务列表失败：" + e.message + " - " + e.code);
          });
        }, false);
      },
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
      // 初始化用户信息
      initUserInfo(data) {
        const information = {
          headimgurl: data.headimgurl || '', //用户头像
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
      // 判断用户是否注册
      async isUserRegister(userInfo) {
        //根据openid判断是否注册
        let nowopenid = [userInfo.wx.openid];
        alert(nowopenid);
        nowopenid.push()
        let register = {
          collection: "User",
          wxopenid: {
            '$in': nowopenid
          }
          // 'wxopenid': userInfo.wx.openid
        }
        let isRegister = await this.$api.sendData(`https://m.yixiutech.com/sql/find`, register);
        alert(JSON.stringify(isRegister));

        toast.hide();
        console.log("=========================================>user data");
        console.log(isRegister.data);
        if (isRegister.data.length == 0) {
          //注册
          // alert("data.length = 0")
          sessionStorage.setItem("userData", JSON.stringify(userInfo));
          alert("你还未登录，请先登录");
          this.$router.push("/userlogin");
        } else {
          // alert("data.length != 0");
          let userIn = isRegister.data[isRegister.data.length - 1];
          // alert(JSON.stringify(userInfo))
          if (userIn.mobile == "") {
            alert("你还未登录，请先登录");
            this.$router.push("/userlogin");
          } else {
            //更新用户信息
            // alert("else 已注册");
            // users = isRegister.data[0];
            if (userIn._id) {
              let update = {
                collection: "User",
                find: {
                  '_id': userIn._id
                },
                update: {
                  name: userIn.wx.nickname,
                  mobile: userIn.mobile,
                  wx: userIn.wx
                }
              }
              console.log(update);
              let updateInfo = await this.$api.sendData(`https://m.yixiutech.com/sql/update`, update);

            }

            sessionStorage.setItem("userData", JSON.stringify(userIn));
            this.$toast("自动登录成功");

          }

        }
      },
      // *公众号进入
      // *公众号好用户初始化
      async initGZHInfo(userData) { //公众号好用户初始化
        // alert("公众号进入");
        let res = await this.$api.getData(`https://m.yixiutech.com/user/wx/${userData.code}`);
        // alert(JSON.stringify(res));
        if (res.openid) {
          // alert(JSON.stringify(res.openid));
          sessionStorage.setItem("openid", res.openid);
          let userInfo = this.initUserInfo(res);
          this.isUserRegister(userInfo);
        } else {
          this.$toast("账号信息有误");
        }

      },
      // *小程序进入
      async initXCXInfo(userData) { //小程序进入
        // alert("小程序进入");
        // alert(JSON.stringify(userData));
        //获取在不同的微信公众号或者小程序获取到的openid
        // let openids = [];
        // openids.push(userData.openid);
        // let op = {
        //   collection:'User',
        //   wxopenid: {
        //     '$in': openids
        //   }
        // }
        // let wxopenids = await this.$api.sendData(`https://m.yixiutech.com/sql/find`, op);
        // console.log(wxopenids);
        // alert(JSON.stringify(wxopenids));
        if (userData.openid) {
          sessionStorage.setItem("openid", userData.openid);
          //初始化用户信息
          let userInfo = initInfo(userData);
          //判断用户是否注册
          this.isUserRegister(userInfo);
        }

        function initInfo(data) {
          const user = {
            headimgurl: data.headimgurl || data.avatarUrl || '', //用户头像
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
      },
      //  * 注册返利入口
      async registerMoney(userData) {
        let res = await this.$api.getData(`https://m.yixiutech.com/user/wx/${userData.code}`);
        // alert(JSON.stringify(res));
        if (res.openid) {
          sessionStorage.setItem("openid", res.openid);
          let userInfo = this.initUserInfo(res);
          this.isUserRegister(userInfo);
        } else {
          alert(JSON.stringify(res));
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

