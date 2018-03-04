<template>
  <div class="info">
		<InfoItem
			v-for="(tip ,index) in tips"
			:key="index"
			:tip="tip.msg"
			:icon="tip.icon"
			:type="tip.type"
		/>
		<button class="info__btn" @click="login">登录</button>
		<div class="info__tip">
			<router-link class="tip__pwd" to="/home">忘记密码</router-link>
			<router-link class="tip__register" to="/home">立即注册</router-link>
		</div>
  </div>
</template>

<script>
import InfoItem from './infoItem'
export default {
	components: {
		InfoItem
	},
	data () {
		return {
			tips: [
				{ msg: '请输入手机号码', type: 'text', icon: 'phone'}, 
				{ msg: '请输入密码', type: 'password', icon: 'lock'}
			]
		}
	},
	methods: {
		login () {
			
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
</style>