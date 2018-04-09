<template>
  <div class="my-container">
    <!-- <van-nav-bar
      title="个人中心"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    /> -->
    <!-- 顶部留白 -->
    <!-- <div class="topblank"></div> -->
    <cube-scroll class="scroll">
      <!-- 个人中心-信息 -->
      <!-- 顶部背景图 -->
      <div class="userbg">
        <div class="returnHome" @click="prepage">
          <sicon name="find-leftArr" scale="1.7" color="#FCFCFC"></sicon>
          &nbsp;首页
        </div>
        <div class="sign">
          <div class="rightTag2" @click="sign" v-if="signShow">
            <div class="iconBox">
              <sicon name="unsign" scale="2.7" color="#fff"></sicon>
            </div>
            <div class="integralBox">
              签到
            </div>
          </div>
          <div class="rightTag2" v-else>
            <div class="iconBox">
              <sicon name="sign" scale="2.5" color="#fff"></sicon>
            </div>
            <div class="integralBox">
              已签到
            </div>
          </div>
        </div>
        <!-- 用户头像及登录注册 -->
        <div class="user-area">
          <div class="user-profile">
            <img :src="userInfo.wx.avatarUrl">
          </div>
          <div class="usermessage" v-if="!loggedin">
            <router-link id="login" to="/login">登录</router-link>
            <div>|</div>
            <router-link id="register" to="/register">注册</router-link>
          </div>
          <div class="usermessage username" v-else>
            {{ userInfo.name }}
          </div>
        </div>

        <div class="rightTag" @click="enterIcons">
          <div class="iconBox">
            <sicon name="my-icons" scale="2.7" color="#fff"></sicon>
          </div>
          <div class="integralBox">
            {{ userInfo.points }} 积分
          </div>
        </div>
      </div>


      <!-- 个人中心-功能菜单 -->
      <div class="user-menu">
        <van-cell-group>
          <van-cell v-for="(catalog,index) in catalogs" :key="index" :title="catalog.name" :icon="catalog.icon" is-link @click="changepage(catalog.url)"
          />
        </van-cell-group>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  //van
  import {
    NavBar,
    Button,
    Cell,
    CellGroup,
    Dialog
  } from 'vant';
  import {
    reguser,
    getuserinforByopenId,
    updateuserinfo
  } from '../common/api'

  export default {
    data() {
      return {
        loggedin: false, //是否已登录
        //用户信息
        userInfo: {
          // wx.avatarUrl  头像框   如果没有就有默认头像
          // wx.city       城市
          // wx.country    国家
          // wx.gender     性别   1是男
          // wx.language   语言
          // wx.nickName   昵称
          // wx.openid     ID
          // wx.province   省份
          name: "",
          mobile: 0,
          email: "",
          wx: {
            avatarUrl: "https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            city: "",
            country: "",
            gender: "",
            language: "",
            nickName: "",
            openid: "",
            province: ""
          },
          signShow: false
        },
        //功能菜单列表
        catalogs: [{
            name: "优惠券",
            icon: "gold-coin",
            url: "my/mycoupus"
          },
          {
            name: "个人信息",
            icon: "contact",
            url: "my/information"
          },
          {
            name: "我的积分",
            icon: "pending-payment",
            url: "my/mywallet"
          },
          {
            name: "我的收藏",
            icon: "like-o",
            url: ""
          },
          {
            name: "我的地址",
            icon: "location",
            url: "my/myaddress"
          },
          {
            name: "快递查询",
            icon: "logistics",
            url: "my/myexpress"
          },
          {
            name: "问题反馈",
            icon: "question",
            url: "my/feedback"
          },
          // {
          //   name: "测试",
          //   icon: "question",
          //   url: "my/test"
          // }
        ]
      }
    },
    components: {
      [Button.name]: Button,
      [NavBar.name]: NavBar,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Dialog.name]: Dialog,
    },
    methods: {
      //返回首页
      prepage() {
        this.$router.push({
          path: "/home"
        })
      },
      enterIcons() {
        // this.functionunavailable()
      },
      //点击功能后进行跳转
      async changepage(url) {
        if (this.loggedin === false) {
          const toast = this.$createToast({
            txt: '请先登录',
            type: 'error',
            time: 1500
          })
          //使用show调出方法
          toast.show()
        } else {
          if (url === "") {
            this.functionunavailable();
          } else {
            this.$router.push({
              path: url
            })
          }
        }
      },
      //通过id查询信息
      async getUserinfo(openid) {
        getuserinforByopenId(openid)
          .then(res => {
            this.userInfo = res.data
            console.log(res.data);
            this.loggedin = true;
          }, (err => {
            console.log(err);
          }))
      },
      updateSign(uppoint, nowDate) {
        let JSONnowDate = JSON.stringify(nowDate)
        localStorage.setItem("signTime", JSONnowDate);

        updateuserinfo(uppoint)
          .then(res => {
            Dialog.alert({
              message: '签到成功！'
            }).then(() => {
              let userData = this.getUserInfo();
              this.getUserinfo(userData.wx.openid);
              this.signPD()
            });
          }, (err => {
            console.log(err);
          }))
      },
      sign() {
        let nowDate = new Date();
        nowDate = [nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()];

        let JSONoldDate = localStorage.getItem("signTime");

        if (!JSONoldDate) {
          let uppoint = {
            _id: this.userInfo._id,
            points: (parseInt(this.userInfo.points) + 5)
          }
          this.updateSign(uppoint, nowDate);
        } else {
          let oldDate = JSON.parse(JSONoldDate)
          if (nowDate[0] > oldDate[0]) {
            let uppoint = {
              _id: this.userInfo._id,
              points: (parseInt(this.userInfo.points) + 5)
            }
            this.updateSign(uppoint, nowDate);
          } else if (nowDate[0] == oldDate[0]) {
            if (nowDate[1] > oldDate[1]) {
              let uppoint = {
                _id: this.userInfo._id,
                points: (parseInt(this.userInfo.points) + 5)
              }
              this.updateSign(uppoint, nowDate);
            } else if (nowDate[1] == oldDate[1]) {
              if (nowDate[2] > oldDate[2]) {
                let uppoint = {
                  _id: this.userInfo._id,
                  points: (parseInt(this.userInfo.points) + 5)
                }
                this.updateSign(uppoint, nowDate);
              } else {
                alert("你已签到过了")
              }
            } else {
              alert("你已签到过了")
            }
          } else {
            alert("你已签到过了")
          }
        }
      },
      signPD() {
        let nowDate = new Date();
        nowDate = [nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate()];

        let JSONoldDate = localStorage.getItem("signTime");

        if (!JSONoldDate) {
          this.signShow = true;
        } else {
          let oldDate = JSON.parse(JSONoldDate)
          if (nowDate[0] > oldDate[0]) {
            this.signShow = true;
          } else if (nowDate[0] == oldDate[0]) {
            if (nowDate[1] > oldDate[1]) {
              this.signShow = true;
            } else if (nowDate[1] == oldDate[1]) {
              if (nowDate[2] > oldDate[2]) {
                this.signShow = true;
              } else {
                this.signShow = false;
              }
            } else {
              this.signShow = false;
            }
          } else {
            this.signShow = false;
          }
        }
      },
      initUserInfo(userData) {
        // this.userInfo = res.data
        console.log()
        let data = {
          createdAt: userData.createdAt,
          email: userData.email || '',
          isSys: userData.isSys || false,
          mobile: userData.mobile,
          money: userData.money,
          name: userData.role[0].name,
          password: "",
          points: userData.points,
          role: userData.role,
          updatedAt: userData.updatedAt,
          wx: {
            avatarUrl: "",
            city: "",
            country: "",
            gender: 0,
            language: "",
            nickName: "",
            openid: "",
            province: ""
          },
          __v: userData.__v,
          _id: userData._id
        }
        this.userInfo = data;
        this.loggedin = true;
      }
    },
    created() {
      let userData = this.getUserInfo();
      console.log("==================================>");
      console.log(userData);
      alert(userData);
      // this.initUserInfo(userData);
      this.getUserinfo(userData.wx.openid);
      this.signPD()
    }
  }

</script>

<style scoped>
  /* html{
    overflow: scroll;
  } */

  .scroll {
    width: 100%;
    height: 84vh;
  }

  .my-container {
    padding: 0.3vh 0vw 5vh 0vw;
    background: #fff;
    height: 91vh;
  }

  .topblank {
    margin-top: 45.6px;
  }

  .userbg {
    height: 21vh;
    min-height: 130px;
    border: 0.1vw solid #e9e9e9;
    -moz-box-shadow: 0vw 1vh 4vw #e9e9e9;
    -webkit-box-shadow: 0vw 1vh 4vw #e9e9e9;
    box-shadow: 0vw 1vh 4vw #e9e9e9;
    background-image: linear-gradient(90deg, #48c6ef 0%, #6f86d6 100%);
  }

  .returnHome {
    display: flex;
    width: 20vw;
    padding: 15px 10px;
    padding-bottom: 10px;
    color: #FCFCFC;
  }

  .sign {
    position: absolute;
    top: 0;
    right: 0;
    padding: 15px 10px;
    padding-right: 0;
    padding-top: 3px;
    padding-bottom: 10px;
    color: #FCFCFC;
  }

  .user-area {
    display: flex;
    flex-direction: flex-start;
    margin-top: 3.5vw;
  }

  .user-profile {
    width: 14vw;
    height: 14vw;
    border-radius: 50%;
    border: 1px solid #fff;
    margin-bottom: 2vh;
    margin-left: 4vw;
    -moz-box-shadow: 0vw 0.5vh 3vw #b6baba;
    -webkit-box-shadow: 0vw 0.5vh 3vw #b6baba;
    box-shadow: 0vw 0.5vh 3vw #b6baba;
    overflow: hidden;
  }

  .user-profile img {
    width: 100%;
    height: 100%;
  }

  .rightTag {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    top: 8.5vh;
    height: 40px;
    background-image: linear-gradient(90deg, rgba(53, 53, 53, 0.2) 0%, rgba(53, 53, 53, 0.1) 100%);

    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .rightTag2 {
    display: flex;
    align-items: center;
    right: 0;
    top: 8.5vh;
    height: 40px;

  }

  .iconBox {
    margin-top: 2px;
    margin-left: 8px;
    margin-right: 8px;
  }

  .integralBox {
    font-size: 15px;
    color: #F3F3F3;
    margin-right: 8px;
  }

  .usermessage {
    display: flex;
    margin-left: 5vw;
    margin-top: 13px;
    min-width: 25vw;
    max-width: 75vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #FCFCFC;
    font-size: 5vw;
  }

  .usermessage a {
    margin: 0 5px;
  }

  .username {
    justify-content: center;
    font-size: 6vw;
  }

  .user-menu {
    padding-bottom: 30px;
  }

</style>

