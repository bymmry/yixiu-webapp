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
    <button @click="authLogout">登录注销</button>
    <div>
      <div class="funcbtn">
        <button @click="serchmoney" class="other">登录授权</button>
        <button @click="getmoney">获取信息</button>
      </div>
    </div>
  </div>

</template>

<script>
  import { NavBar, Button, Dialog} from 'vant';
  export default {
    data () {
      return {
        infoName: '登录测试',
        number: 0,
        allnumber: 0,
        surplusnumber: 0,
        userlist: [],
        allUserIds: [],
        auths: null,
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
      async serchmoney () {
		this.auths = null;
		// 监听plusready事件  
		document.addEventListener( "plusready", function(){
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.oauth.getServices( function(services){
				this.auths = services;
			}, function(e){
				alert( "获取分享服务列表失败："+e.message+" - "+e.code );
			} );
		}, false );
        
		let s = this.auths[0];
		console.log(s);
		if ( !s.authResult ) {
			s.login( function(e){
				alert( "登录认证成功！" );
			}, function(e){
				alert( "登录认证失败！" );
			} );
		}else{
			alert( "已经登录认证！" );
		}
      },
      async getmoney () {
		let s = this.auths[0];
		if ( !s.authResult ) {
			alert("未登录授权！");
		} else {
			s.getUserInfo( function(e){
				alert( "获取用户信息成功："+JSON.stringify(s.userInfo) );
			}, function(e){
				alert( "获取用户信息失败："+e.message+" - "+e.code );
			} );
		}
      },
     async authLogout () {
        let auth = this.auths;
        for (var i in auth) {
            var s = auth[i];
            if (s.authResult) {
                s.logout(function(e) {
                    console.log("注销登录认证成功！");
                }, function(e) {
                    console.log("注销登录认证失败！");
                });
            }
        }
     },
    created() {
		this.auths = null;
		// 监听plusready事件  
		document.addEventListener( "plusready", function(){
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.oauth.getServices( function(services){
				this.auths = services;
			}, function(e){
				alert( "获取分享服务列表失败："+e.message+" - "+e.code );
			} );
		}, false );
    },
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