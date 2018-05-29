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
    <button @click="setStorage">存储数据</button>
    <button @click="getStorage">显示数据</button>
    <button @click="getWxinfo">显示微信信息</button>
    <button @click="getWxinfo1">显示微信信息2</button>
    <button @click="webapp">webapp支付测试</button>
    <div>
      <div class="funcbtn">
        <button @click="authLogin" class="other">登录授权</button>
        <button @click="authUserInfo">获取信息</button>
      </div>
    </div>
  </div>

</template>

<script>
  import { NavBar, Button, Dialog} from 'vant';
  import { getIp } from '../../../common/api';
  import md5 from 'js-md5'; //MD5加密
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
        appid: "",
        mch_id: "",//微信官方的  
        key: "",//自己设置的微信商家key
        rand: "",
        out_trade_no: "",//平台内部订单号
        nonce_str: "",//随机字符串 
        body: "",//内容  
        total_fee: 0,//金额  
        spbill_create_ip: "",//IP  
        notify_url: "", //回调地址  
        trade_type: "",//交易类型 具体看API 里面有详细介绍  
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
		
		// Remove storage item
      setStorage() {
		  plus.storage.setItem("longdong","18584664675");
	  },
      getStorage() {
		    alert(plus.storage.getItem("longdong"));
	  },
      // serchwx () {
      // },
      getWxinfo() {
        alert(sessionStorage.getItem("infoOfWX"));
      },
      getWxinfo1() {
        alert(sessionStorage.getItem("longdong"));
      },
      webapp() {
        let ip = '';
        getIp().then(res => {
          let ip = res.origin;
          // alert(res.origin);
        },(err => {
          console.log(err);
        }))
        // ip
       this.appid = "wx92877f3243727d9b";//微信给的  
       this.mch_id = "1499236172";//微信官方的  
       this.key = "GONGSHUWEN112233GONGSHUWEN112233";//自己设置的微信商家key  
       
       let nuM = "";
       for (var i=0;i<8;i++) {
        nuM+=Math.floor(Math.random()*10);
       }
      //  alert(nuM);
       this.rand = nuM;  
      //  this.out_trade_no = new Date().getTime();//平台内部订单号
       this.out_trade_no = "253651351352";//平台内部订单号
       alert(this.out_trade_no);
       this.nonce_str = md5(this.out_trade_no);//随机字符串  
       this.body = "H5支付";//内容  
       this.total_fee = 1; //金额  
       this.spbill_create_ip = ip; //IP  
       this.notify_url = "http://www.baidu.com"; //回调地址  
       this.trade_type = 'MWEB';//交易类型 具体看API 里面有详细介绍  
       let scene_info ='{"h5_info":{"type":"Wap","wap_url":"http://m.yixiutech.com/yixiuwebapp/home","wap_name":"支付"}}';//场景信息 必要参数
       let signA = `appid=${this.appid}` + `&body=${this.body}` + `&mch_id=${this.mch_id}` + `&nonce_str=${this.nonce_str}`
        + `&notify_url=${this.notify_url}` + `&out_trade_no=${this.out_trade_no}` + `&scene_info=${scene_info}`
        + `&spbill_create_ip=${this.spbill_create_ip}` + `&total_fee=${this.total_fee}` + `&trade_type=${this.trade_type}`;
      //  alert(signA);
       let strSignTmp = `${signA}` + `&key=${this.key}`; //拼接字符串  注意顺序微信有个测试网址 顺序按照他的来 直接点下面的校正测试 包括下面XML  是否正确  
      //  alert(strSignTmp);
       let sign = md5(`${strSignTmp}`).toUpperCase(); // MD5 后转换成大写 
       alert(sign);
       let post_data = `<xml>  
                       <appid>${this.appid}`+`</appid>  
                       <body>${this.body}`+`</body>  
                       <mch_id>${this.mch_id}`+`</mch_id>  
                       <nonce_str>${this.nonce_str}`+`</nonce_str>  
                       <notify_url>${this.notify_url}`+`</notify_url>  
                       <out_trade_no>${this.out_trade_no}`+`</out_trade_no>  
                       <scene_info>${scene_info}`+`</scene_info>  
                       <spbill_create_ip>${this.spbill_create_ip}`+`</spbill_create_ip>  
                       <total_fee>${this.total_fee}`+`</total_fee>  
                       <trade_type>${this.trade_type}`+`</trade_type>  
                       <sign>${sign}`+`</sign>
                   </xml>`;//拼接成XML 格式  
       alert(post_data);
       let url = "https://api.mch.weixin.qq.com/pay/unifiedorder";//微信传参地址  
      },
      async authLogin () {
		    let s = this.auths[0];
		    alert(JSON.stringify(s));
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
      async authUserInfo () {
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
      plusReady ();
      document.addEventListener("plusready",plusReady,false);
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
    mounted () {
      // this.auths = null;
      let that = this;
		  // 监听plusready事件  
		  document.addEventListener( "plusready", function(){
			  // 扩展API加载完毕，现在可以正常调用扩展API
			  plus.oauth.getServices( function(services){
          alert(JSON.stringify(e));
				  that.auths = services;
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