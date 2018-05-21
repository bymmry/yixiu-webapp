
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <script type="text/javascript" charset="utf-8">
      	mui.init();
		var auths=null;
		// 监听plusready事件  
		document.addEventListener( "plusready", function(){
			// 扩展API加载完毕，现在可以正常调用扩展API
			plus.oauth.getServices( function(services){
				console.log(JSON.stringify(services));
				auths = services;
			}, function(e){
				alert( "获取分享服务列表失败："+e.message+" - "+e.code );
			} );
		}, false );
		// 登录操作
		function authLogin(){
			alert(JSON.stringify(auths));
			console.log(auths[0].id);
			console.log(auths[0].description);
			console.log(JSON.stringify(auths));
			var s = auths[0];
			if ( !s.authResult ) {
				s.login( function(e){
					alert( "登录认证成功！" );
				}, function(e){
					alert( "登录认证失败！" );
				} );
			}else{
				alert( "已经登录认证！" );
			}
		}
		// 获取登录用户信息操作
		function authUserInfo(){
			var s = auths[0];
			if ( !s.authResult ) {
				alert("未登录授权！");
			} else {
				s.getUserInfo( function(e){
					alert( "获取用户信息成功："+JSON.stringify(s.userInfo) );
				}, function(e){
					alert( "获取用户信息失败："+e.message+" - "+e.code );
				} );
			}
		}	
		//注销登录
		function authLogout() {
            for (var i in auths) {
                var s = auths[i];
                if (s.authResult) {
                    s.logout(function(e) {
                        console.log("注销登录认证成功！");
                    }, function(e) {
                        console.log("注销登录认证失败！");
                    });
                }
            }
        }
    </script>
</head>
<body>
	<span class="mui-icon weixin" id="weixin">服务列表</span> 
	<button onclick="authLogin()">登录</button>
	<button onclick="authUserInfo()">获取用户信息</button>
	<button onclick="authLogout()">注销</button>
</body>