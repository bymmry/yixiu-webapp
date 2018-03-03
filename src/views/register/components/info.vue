<template>
  <div class="info">
		<van-steps :active="active">
			<van-step>输入手机号</van-step>
			<van-step>输入验证码</van-step>
			<van-step>设置密码</van-step>
		</van-steps>
		<div class="info__item" v-if="active === 0">
			<InfoItem
				:tip="tips[0].msg"
				:icon="tips[0].icon"
				:type="tips[0].type"
			/>
		</div>
		<div class="info__item" v-else-if="active === 1">
			<InfoItem
				:tip="tips[1].msg"
				:icon="tips[1].icon"
				:type="tips[1].type"
			/>
		</div>
		<div class="info__item" v-else>
			<InfoItem
				:tip="tips[2].msg"
				:icon="tips[2].icon"
				:type="tips[2].type"
			/>
		</div>
		<button class="info__btn" @click="next">下一步</button>
		<div class="info__tip">
		</div>
  </div>
</template>

<script>
import { Step, Steps } from 'vant';
import InfoItem from './infoItem'
export default {
	components: {
		InfoItem,
		[Step.name]: Step,
		[Steps.name]: Steps
	},
	data () {
		return {
			tips: [
				{ msg: '请输入手机号码', type: 'text', icon: 'phone'},
				{ msg: '请输入验证码', type: 'text', icon: 'identifyCode'},
				{ msg: '请输入密码', type: 'password', icon: 'lock'}
			],
			active: 0
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