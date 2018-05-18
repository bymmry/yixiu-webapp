<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="分享"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <!-- 用户看到的分享 -->
    <div class="messageTag">
      <!-- 信息标题 -->
      <div class="myinfo-title-container">
        <div class="myinfo-title">邀请二维码</div>
      </div>

      <div class="row-line"></div>

      <div class="qrcodeBox">
        <div id="qrcode" ref="qrcode"></div>
      </div>

      <p class="tips">邀请注册成功后，可获得用户下单金额 <span>3%</span></p>
    </div>
    <div>
      <div class="tips">邀请用户返利</div>
      <div class="row-line-money"></div>
      <div class="money" >
        <div class="money">已邀请：{{number}}人</div>
        <div class="money">总返利：{{allnumber}}元</div>
        <div class="money">已返利：{{surplusnumber}}元</div>
        <div class="money">待返利：{{allnumber-surplusnumber}}元</div>
      </div>
      <div class="funcbtn">
        <button @click="serchmoney" class="other">查询</button>
        <button @click="getmoney">提现</button>
      </div>
    </div>
  </div>

</template>

<script>
  import './modules/jquery-1.10.2.min.js';
  import './modules/jquery.qrcode.min.js';

  import { NavBar, Button, Dialog} from 'vant';


  export default {
    data () {
      return {
        infoName: '分享',
        number: 0,
        allnumber: 0,
        surplusnumber: 0,
        userlist: [],
        allUserIds: [],
        // userids: [],
        // userOrderlists: [],
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      qrcode () {
        let userData = this.getUserInfo();
        // console.log(userData)
        let num = userData.mobile-0;
        $("#qrcode").qrcode({
          text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92877f3243727d9b&redirect_uri=http://m.yixiutech.com/yixiuwebapp/register&response_type=code&scope=snsapi_userinfo&IDvalue=${userData._id}&state=${userData._id}#wechat_redirect`,
          width:150,
          height:150
        });
      },
      async serchmoney () {
        let userData = this.getUserInfo();
        let userId = userData._id;
        // let userId = "5ad21852ab85e142eaef9276";
        // 1.获取关联用户
        let userLists = await this.$api.sendData('https://m.yixiutech.com/sql/find/', {
            collection:'User',
            parent: userId,
            limit: 0,
            select:{_id:1},
		    })
        console.log('----------------------');
        console.log(userLists);
        let userIdlist = userLists.data;
        this.number = userIdlist.length;
        // if(userIdlist.length == 0){
        //   alert("已推荐0人，加油哦！");
        //   return;
        // } else {
        //   alert("已推荐" + userIdlist.length + "人");
        // }
        
        console.log(userIdlist.length);
        console.log(userIdlist);

        let userids = [];
        if(userIdlist.length>0){
          for(var x= 0; x<userIdlist.length; x++){
            userids.push(userIdlist[x]._id);
          }
        }
        this.allUserIds = userids;
        console.log('----------------------1');
        console.log(userids);
        //2.根据获取到的列表,查询订单列表
        // let iduser = "5ad209cfab85e142eaef9271"
        let userOrderlist = await this.$api.sendData('https://m.yixiutech.com/sql/find/', {
          collection:'Order',
          user:{
            $in:userids//遍历childrenShoplist的_id放到这里面
            // $in:[iduser]
          },
          limit: 0,
          state: 13,
          select:{payment:1, service:1},
        })
        console.log("--------------------------2");
        console.log(userOrderlist);
        let userOrderlists = userOrderlist.data;
        let sumMoney = 0;
        if(userOrderlists.length>0){
          for(var y= 0; y<userOrderlists.length; y++){
            if(userOrderlists[y].service.length !== 0){
              sumMoney = sumMoney + userOrderlists[y].payment;
            }
            
           }
        }
        console.log("--------------------------3");
        console.log(sumMoney);
        this.allnumber = (sumMoney/100)*0.03;
        console.log(this.allnumber);
        // 已返利订单查询

        let userOrderlistHadGet = await this.$api.sendData('https://m.yixiutech.com/sql/find/', {
          collection:'Order',
          user:{
            $in:userids//遍历childrenShoplist的_id放到这里面
            // $in:[iduser]
          },
          limit: 0,
          state: 13,
          userRebate: true,
          select:{payment:1, service:1},
        })

        console.log(userOrderlistHadGet);
        let userOrderlistHadGets = userOrderlistHadGet.data;
        let sum = 0;
        if(userOrderlistHadGets.length>0){
          for(var y= 0; y<userOrderlistHadGets.length; y++){
            if(userOrderlistHadGets[y].service.length !== 0){
              sum = sum + userOrderlistHadGets[y].payment;
            }
           }
        }
        console.log("--------------------------3");
        console.log(sum);
        this.surplusnumber = (sum/100)*0.03;
        console.log(this.surplusnumber);
      },
      
      async getmoney () {
        // Dialog.alert({
        //   message: '我们走，关注翼修领好礼！'
        // }).then(() => {
        //   window.open("https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU0MDY5NjIzMg==&scene=124#wechat_redirect")
        // });
        let sheng = '重庆市';
        let shi = '重庆市';
        let qu = '渝北区';
        let shopLists = await this.$api.sendData('https://m.yixiutech.com/sql/find/', {
            collection:'Shop',
            pay: true,
            qualification: true,
            'addressInfo.province': sheng,
            'addressInfo.city': shi,
            'addressInfo.district': qu,
            limit: 0,

		    })
        console.log(shopLists);
        // let data = { rebate: true};
        // if(this.allnumber - this.surplusnumber == 0){
        //   alert("暂时没有可以提现的金额，加油哦！");
        // } else {
        //   let res = await this.$api.sendData('https://m.yixiutech.com/sql/update', {
        //     collection:'Order',
				//     find: {
				// 	    user: this.userids,
        //       state: 13,
				//     },
				//     update: data
        //   });
        //   if(res.code==200){
        //     alert("提现成功");
        //   } else {
        //     alert("提现失败");
        //   }
        // }
        // alert("开始添加");
        // let data = { mobile: 18584664675};
        // let res = await this.$api.sendData('https://m.yixiutech.com/sql/update', {
        //   collection:'User',
				//   find: {
				// 	  user: this.userids,
        //     _id: "5ad21852ab85e142eaef9276",
				//   },
				//   update: data
        //   });
        //   if(res.code==200){
        //     alert("添加成功");
        //   } else {
        //     alert("添加失败");
        //   }
        // }
      },
    },
    mounted () {    //钩子函数，等于vue1.0中的ready
      this.qrcode();
    }
  }
</script>

<style scoped>
  .myinfo-container{
    min-height: 90vh;
    padding: 2vh 3vw 5vh 3vw;
    background: #fff;
    
  }
  .topblank{
    margin-top: 45.6px;
  }
  .messageTag{
    border: 0.1px solid rgb(240, 241, 245);
    padding: 3vh 4vw 4vh 4vw;
    margin-bottom: 4vh;
  }
  .myinfo-title-container{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 2vh;
  }
  .myinfo-title{
    color: #727272;
    font-size: 4vw;
  }
  .row-line{
    width: 100%;
    height: 0.3vh;
    margin-top: 3vh;
    margin-bottom: 3vh;
    background: #ecebeb;
  }
  .row-line-money{
    width: 100%;
    height: 0.2vh;
    margin-top: 2vh;
    margin-bottom: 1vh;
  }
  .money{
    margin-left: 5vh;
    margin-bottom: 2vh;
  }
  .funcbtn button.other{
        background: #fff;
        color: #2796CB;
  }
  .funcbtn{
      position: absolute;
      display: flex;
      z-index: 100;
      bottom: 0;
      left: 0;
      right: 0;
  }
  .funcbtn button{
      flex: 1;
      border: none;
      background-color: #4991e5;
      float: left;
      padding: 0;
      width: 100vw;
      line-height: 60px;
      text-align: center;
      color: #fff;
      font-size: 6vw;
        
      border-top: 1px solid #eee;
  }
  .myinfo-message{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .qrcodeBox{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tips{
    font-size: 3.8vw;
    margin-top: 3vh;
    text-align: center;
    color: #323643;
  }
  .tips span{
    color: #4BC2C5;
  }
</style>