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
			<van-field
				v-model="details.phoneModel.name"
				label="手机型号"
				disabled
			/>

			<van-field
				v-model="details.phoneModel.desc"
				label="描述"
				disabled
			/>

			<van-field
				v-model="details.phoneModel.color[0]"
				label="手机颜色"
				disabled
			/>

			<van-field
				v-model="details.service[0].name"
				label="维修服务"
				disabled
			/>

			<van-field
				v-model="details.service[0].desc"
				label="维修详情"
				disabled
			/>

			<div v-show="details.state == 12">
				<van-field
					v-model="details.trackingNumber"
					label="快递单号"
				/>

				<div class="info">
					<p>快递公司</p>
					<cube-select
						v-model="details.trackingCom"
						:options="trackingComSec" 
					/>
				</div>

			</div>

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
import { Field } from 'vant'
export default {
	components: {
		ItemHeader,
		[Field.name]: Field
	},
  async mounted () {
		this.details = JSON.parse(localStorage.getItem('detail'));

		let res = await this.$api.getData('https://m.yixiutech.com/tracking/com');
		res.data.map(item => {
			this.trackingComSec.push({ text: item.com, value: item.no })
		})
	},
	data () {
		return {
			details: {},
			infoName: '订单详情',
			trackingComSec: []
		}
	},
	methods: {
		async takeOrder () {
			let data = { _id: this.details._id, state: 12 }
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/order/update', data);
			toast.hide();
			if (res.code == 200) {
				this.prompt('接单成功', 'success').show();
				this.$router.go(-1)
			}
		},
		async finish () {
			let data = { _id: this.details._id, state: 13 }
			const toast = this.$createToast({
				message: '加载中...'
			})
			toast.show();
			let res = await this.$api.sendData('https://m.yixiutech.com/order/update', data);
			toast.hide();
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

.info {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 0 15px;
	margin-top: 20px;
	font-size: 14px;
}

.info p {
	width: 90px;
}

.info .cube-select {
	width: 60%;
}
</style>
