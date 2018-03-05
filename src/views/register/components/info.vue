<template>
  <div class="info">

		<!-- <van-field
			v-model="infos.password"
			label="用户名"
			placeholder="请输入用户名"
		/>

		<van-field
			v-model="infos.password"
			label="密码"
			placeholder="请输入用户名"
		/>

		<van-field
			v-model="infos.password"
			label="验证码"
			placeholder="请输入验证码" -->
		/>

		<button class="info__btn" @click="next">下一步</button>
		<div class="info__tip">
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
			tips: [
				{ msg: '请输入手机号码', type: 'text', icon: 'phone'},
				{ msg: '请输入验证码', type: 'text', icon: 'identifyCode'},
				{ msg: '请输入密码', type: 'password', icon: 'lock'}
			]
		}
	},
	methods: {
		next () {
			this.active++;
		}
	}
}
</script>

<style scoped>
.info {
    width: 90%;
    position: absolute;
    left: 50%;
    margin-top: 20px;
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

.info .info__item {
	margin: 20px 0;
}
</style>