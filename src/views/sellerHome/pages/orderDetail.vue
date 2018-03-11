<template>
  <div class="detail">
		<item-header
			:name="infoName"
		/>
		<div class="user">
			<img :src="details.user.wx.avatarUrl" class="user__img" alt="" />
			<div class="user__msg">
				<p>昵称 : {{ details.user.wx.nickName }}</p>
				<p>城市 : {{ details.user.wx.province }} {{ details.user.wx.city }}</p>
			</div>
		</div>
		<div class="service">
			<p><span>手机型号 : </span>{{ details.phoneModel.name }}</p>
			<p><span>描述: </span>{{ details.phoneModel.desc }}</p>
			<p><span>颜色: </span>{{ details.phoneModel.color[0] }}</p>
			<p><span>维修服务: </span>{{ details.service[0].name }}</p>
			<p><span>需要维修的地方: </span>{{ details.service[0].desc }}</p>
		</div>
		<div v-if="details.state == 10">
			<button class="footer" @click="takeOrder">接单</button>
		</div>
		<div v-else-if="details.state == 12">
			<button class="footer" @click="finish">完成</button>
		</div>
  </div>
</template>

<script>
import ItemHeader from '../components/itemHeader'
export default {
	components: {
		ItemHeader
	},
  mounted () {
		this.details = JSON.parse(localStorage.getItem('detail'));
		console.log()
	},
	data () {
		return {
			details: {},
			infoName: '订单详情 '
		}
	},
	methods: {
		async takeOrder () {
			let data = { _id: this.details._id, state: 12 }
			let res = await this.$api.sendData('https://m.yixiutech.com/order/update', data);
			if (res.code == 200) {
				this.prompt('接单成功', 'success').show();
				this.$router.go(-1)
			}
		},
		async finish () {
			let data = { _id: this.details._id, state: 13 }
			let res = await this.$api.sendData('https://m.yixiutech.com/order/update', data);
			if (res.code == 200) {
				this.prompt('接单成功', 'success').show();
				this.$router.go(-1)
			}
		}
	}
}
</script>

<style scoped>
.user {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2%;
  border-bottom: 1px solid gray;
}

.service span {
	display: inline-block;
	width: 150px;
}

.user .user__img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}

.service {
	padding: 4%;
}

.footer {
	width: 100%;
	padding: 4vh;
	color: #fff;
	background: #f44;
	border: none;
	position: fixed;
	bottom: 0;
	z-index: 10;
}
</style>
