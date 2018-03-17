<template>
  <div class="my-container">
    <van-nav-bar
      title="个人中心"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>
    <cube-scroll class="scroll">
    <!-- 个人中心-信息 -->
    <!-- 顶部背景图 -->
    <div class="userbg"></div>

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
    <!-- 个人中心-功能菜单 -->
    <div class="user-menu">
      <van-cell-group>
        <van-cell
          v-for="(catalog,index) in catalogs"
          :key="index"
          :title="catalog.name"
          :icon="catalog.icon"
          is-link
          @click="changepage(catalog.url)"
        />
      </van-cell-group>
    </div>
    </cube-scroll>
  </div>
</template>

<script>
  //van
  import { Button } from 'vant';
  import { NavBar } from 'vant';
  import { Cell, CellGroup } from 'vant';
  import { reguser, getuserinforByopenId } from '../common/api'

  export default {
    data () {
      return {
        loggedin: false,    //是否已登录
        //用户信息
        userInfo:{
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
          wx:{
            avatarUrl: "https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png",
            city: "",
            country: "",
            gender: "",
            language: "",
            nickName: "",
            openid: "",
            province: ""
          }
        },
        //功能菜单列表
        catalogs:[
          {
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
            name: "我的钱包",
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
            url: ""
          },
          {
            name: "测试",
            icon: "question",
            url: "my/test"
          }
        ]
      }
    },
    components: {
      [Button.name]: Button,
      [NavBar.name]: NavBar,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
    },
    methods: {
      //返回首页
      prepage(){
        this.$router.push({ path: "/home"})
      },
      //点击功能后进行跳转
      async changepage(url){
        if (this.loggedin===false) {
          const toast = this.$createToast({
            txt: '请先登录',
            type: 'error',
            time: 1500
          })
          //使用show调出方法
          toast.show()
        }else{
          if (url==="") {
            this.functionunavailable();
          }else {
            this.$router.push({ path: url })
          }
        }
      },
      //通过id查询信息
      async getUserinfo(openid){
        getuserinforByopenId(openid)
          .then(res => {
            this.userInfo = res.data
            this.loggedin = true;
          },(err => {
            console.log(err);
          }))
      },
    },
    activated() {
      let userData = this.getUserInfo();

      this.getUserinfo(userData.wx.openid)
    }
  }
</script>

<style scoped>
  /* html{
    overflow: scroll;
  } */
  .scroll{
    width: 100%;
    height: 84vh;
  }
  .my-container{
    padding: 0.3vh 0vw 5vh 0vw;
    /* margin-bottom: 70px; */
    background: #fff;
    height: 91vh;
  }
  .topblank{
    margin-top: 45.6px;
  }
  .userbg{
    height: 24vh;
    border: 0.1vw solid #e9e9e9;
    border-radius: 5px;
    -moz-box-shadow:0vw 1vh 4vw #e9e9e9;
    -webkit-box-shadow:0vw 1vh 4vw #e9e9e9;
    box-shadow:0vw 1vh 4vw #e9e9e9;
    background: url(https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/lattice.jpg);
  }
  .user-area{
    display: flex;
    flex-direction: column;
    align-items:center;
    margin-top: -8vw;
    margin-bottom: 7vh;
  }
  .user-profile{
    width: 16vw;
    height: 16vw;
    border-radius: 50%;
    border: 0.1vw solid #b6baba;
    margin-bottom: 2vh;
    -moz-box-shadow:0vw 0.5vh 3vw #b6baba;
    -webkit-box-shadow:0vw 0.5vh 3vw #b6baba;
    box-shadow:0vw 0.5vh 3vw #b6baba;
    overflow: hidden;
  }
  .user-profile img{
    width: 100%;
    height: 100%;
  }
  .usermessage{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 25vw;
    color: #42535e
  }
  .username{
    justify-content:center;
  }
  .user-menu{
    padding-bottom: 30px;
  }
</style>
