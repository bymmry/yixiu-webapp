<template>
  <div class="quality" v-if="data">
		<div class="header">
			<p class="header__title">质检报告</p>
            <span @click="closeQuality"><sicon class="close" name="close" scale="1.7"></sicon></span>
		</div>
		<div class="shadow"></div>
		<div class="content">
			<p class="num">
				<span>翼修维修第xxxxxxx份报告</span>
				<span>No.956541235787</span>
			</p>
			<img :src="serviceIcon" class="service-icon" alt="">
			<p class="content__desc">
				{{ new Date(data.appointment).getFullYear() }}/
				{{ new Date(data.appointment).getMonth() }}/
				{{ new Date(data.appointment).getDate() }}  
				{{ new Date(data.appointment).getHours() }} : 
				{{ new Date(data.appointment).getMinutes() }}
				<span>/预约时间</span>
			</p>
			<p class="content__desc">{{ data.phoneModel.color[0] }} <span>/颜色</span></p>
			<p class="content__desc">{{ data.user.name }} <span>/用户名</span></p>
			<!-- <p class="content__desc"> {{ data.info ? data.info.productParam.network.join(',') : null }} <span>/网络制式</span></p> -->
		</div>
		
		<div class="content spec">
			<sicon name="shandian" scale="6"></sicon>
			<div class="desc">
				<p class="desc__title">翼修专业维修</p>
				<p class="desc__content">为您的手机保驾护航</p>
			</div>
		</div>

		<div class="content">
			<div class="expert">
				<div class="content__sum">
					<p class="sum__title">用户备注</p>
					<p class="sum__content">{{ data.remark }}</p>
				</div>
			</div>
		</div>

		<div class="content" v-show="data.state == 12">
				<van-field
					v-model="data.trackingNumber"
					label="快递单号"
				/>

				<div class="info">
					<p>快递公司</p>	
					<cube-select
						v-model="data.trackingCom"
						:options="trackingComSec" 
					/>
				</div>

			</div>
            <cube-button @click="closeQuality">关闭</cube-button>
	</div>
</template>

<script>
import service from '@/assets/service.png'
import { Field, Button } from 'vant'
export default {
    name: 'quality',
	props: {
		data: Object
	},
	components: {
		[Button.name]: Button,
		[Field.name]: Field
	},
	data () {
		return {
			details: {},
			infoName: '订单详情',
			trackingComSec: [],
			serviceIcon: service
		}
	},
	async mounted () {

		console.log(this.data);
		let res = await this.$api.getData('https://m.yixiutech.com/tracking/com');
		res.data.map(item => {
			this.trackingComSec.push({ text: item.com, value: item.no })
		})
	},
  methods: {
		closeQuality () {
			this.$emit("closeQuality");
		},
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

.header {
	padding: 8px;
	display: flex;
	align-items: center;
	background: #ffbd5c;
}
.header span{
    position: absolute;
    right: 10px;
}

.service-icon {
	width: 40%;
	position: absolute;
	right: 0;
	top: 84px;
}

.header__title {
	color: #fff;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}


.cube-select {
	width: 60%;
    margin-left: 30px;
}

.quality {
	width: 100%;
	height: 100%;
	position: relative;
	background: #eee;
}

.shadow {
	width: 100%;
	height: 150px;
	position: absolute;
	left: 0;
	top: 48px;
	background: -webkit-linear-gradient(-90deg,rgba(2,181,157,.85) 2%,rgba(22,146,183,.85) 100%);
	z-index: 0;
}

.content {
	width: 82%;
	position: relative;
	margin: 20px auto 10px auto;
	padding: 4%;
	background: #fff;
	z-index: 2;
}

.footer {
	color: #fff;
	background: red;
}

.spec {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.spec .desc {
	margin-left: 5%;
}

.content .num {
	color: gray;
	font-size: 12px;
	display: flex;
	justify-content: space-between;
}

.content .content__title {
	font-size: 26px;
}



.content .content__desc {
	font-size: 14px;
}

.content__desc span {
	color: gray;
}

.desc__title {
	font-size: 20px;
	color: rgba(2,181,157,.85);
}

.desc__content {
	font-size: 14px;
	color: gray;
}

.expert {
	display: flex;
	justify-content: flex-start;
	font-size: 12px;
}

.expert__info {
	margin-left: 10px;
}

.info {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 12px;
	padding: 4%;
}

.expert__info p {
	padding: 2px 0;
}

.info__academic {
	margin-left: 20px;
}

.info__address {
	color: #fff;
	background: rgba(2,181,157,.85);
	padding: 4px;
}

.content__sum .sum__title {
	font-size: 16px;
	font-weight: bold;
}

.content__sum .sum__content {
	font-size: 14px;
}

.quit {
	position: absolute;
	left: 50%;
	transform: translate(-50%);
}
</style>
