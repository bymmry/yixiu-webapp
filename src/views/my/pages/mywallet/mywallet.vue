<template>
  <div class="myinfo-container">
    <div class="navBox">
      <div @click="prepage" class="prepageBox"><sicon name="find-leftArr" scale="1.2"></sicon>&nbsp;返回</div>
      <div class="navtitle">我的钱包</div>
    </div>
    <!-- 顶部留白 -->
    <div class="topblank"></div>


    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="countBox">
        <img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/dribbble2.png" alt="">
        <div class="money">{{userinfo.points/100}} 元</div>
      </div>
    </van-pull-refresh>

  </div>

</template>

<script>
  import { PullRefresh } from 'vant';
  import { getuserinforByopenId } from '../../../common/api'
  export default {
    data () {
      return {
        isLoading:false,
        userinfo:{}
      }
    },
    components: {
      [PullRefresh.name]: PullRefresh,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      //更新
      async onRefresh(type){
        const toast = this.$createToast({
          time: 0,
          txt: '正在更新'
        })
        toast.show();
        //更新需要进行的操作
        //传递的新数据
        getuserinforByopenId(this.userinfo.wx.openid)
          .then(res => {
            toast.hide()
            const tip = this.$createToast({
              txt: '更新成功!',
              type: 'correct',
              time: 1000
            })
            tip.show();
            this.isLoading = false;
            this.userinfo = res.data;
          },(err => {
            const tip = this.$createToast({
              txt: '更新失败!',
              type: 'fail',
              time: 1000
            })
            tip.show()
          }))
      },
      //获取用户信息
      async getUserinfo(userData){
        getuserinforByopenId(userData.wx.openid)
          .then(res => {
            this.userinfo = res.data;
          },(err => {
            console.log(err);
          }))
      },
    },
    created() {
      let userData = this.getUserInfo();
      this.getUserinfo(userData);
    }
  }
</script>

<style scoped>
  .myinfo-container{
    overflow: hidden;
    width: 100vw;
  }
  .navBox{
    position: fixed;
    top: 0;
    padding-left: 10px;
    width: 100vw;
    min-height: 73px;
    height: 15vh;
    margin-left: -3vw;
    display: flex;
    flex-direction:row;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    color: #FCFCFC;
    font-size: 4vw;
    background-image: linear-gradient(to right, #434343 0%, black 100%);
  }
  .navtitle{
    margin-left: 22vw;
  }
  .prepageBox{
    height: 54px;
    line-height: 54px;
    width: 17vw;
    text-align: center;
  }
  .countBox{
    padding-top: 10vh;
    height: 70vh;
    text-align: center;
  }
  .countBox img{
    width: 166px;
    height: 233.3px;
  }
  .money{
    color:#3c6b7a;
    font-size: 6vw;
    margin-top: -30px;
  }
  .topblank{
    margin-top: 15vh;
  }
</style>
