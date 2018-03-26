<template>
	<div class="entry">
		<van-button class="manager" size="large" @click="toManager">我是管理员</van-button>
		<van-button size="large" @click="toOwner">我是拥有者</van-button>
	</div>
</template>

<script>
import { Button } from 'vant'
export default {
  components: {
		[Button.name]: Button
	},
	methods: {
		toManager () {
			
		},
		toOwner () {

		}
	}
}
</script>

<style scoped>
.entry {
	width: 80%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.manager {
	margin-bottom: 20px;
}
</style>
