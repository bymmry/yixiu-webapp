<template>
  <div class="info">

		<van-field
			v-model="infos.username"
			label="用户名"
			placeholder="请输入用户名"
		/>

		<van-field
			v-model="infos.password"
			label="密码"
			placeholder="请输入密码"
		/>

		<button class="info__btn" @click="login">登录</button>
		<div class="info__tip">
			<router-link class="tip__pwd" to="/home">忘记密码</router-link>
			<router-link class="tip__register" to="/register">立即注册</router-link>
		</div>
  </div>
</template>

<script>
import { Field } from 'vant'
export default {
	components: {
		[Field.name]: Field
	},
	data () {
		return {
			infos: {
				username: '',
				password: ''
			}
		}
	},
	methods: {
		login () {
			this.$ajax.post('http://result.eolinker.com/rNJ9VKm854aa0a35ae4638e2071c22691b3bc309a1342ce?uri=/login', this.infos)
				.then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				})
		}
	}
}
</script>

<style scoped>
.info {
    width: 90%;
    position: absolute;
    left: 50%;
    margin-top: 40px;
    transform: translate(-50%);
}

.info .van-field {
	background: transparent;
	color: #fff;
}

.info input {
	background: transparent;
}

.info .info__btn {
	width: 100%;
	margin-top: 30px;
	padding: 20px 0;
	color: #fff;
	background: transparent;
	border-radius: 10px;
	border: 2px solid #fff;
}

.info .info__tip {
	font-size: 20px;
	margin-top: 30px;
}

.info__tip a {
	color: #fff;
}

.info__tip .tip__pwd {
	float: left;
}

.info__tip .tip__register {
	float: right;
}

input::-webkit-input-placeholder{
	color:#fff;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
	color:#fff;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
	color:#fff
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
	color:#fff;
}
</style>