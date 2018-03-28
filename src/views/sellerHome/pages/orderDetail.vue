<template>
  <div class="quality">
		<div class="header">
			<div class="back" @click="back"></div>
			<sicon name="back" scale="3"></sicon>
			<p class="header__title">订单详情</p>
		</div>
		<div class="shadow"></div>
		<div class="content">
			<p class="num">
				<span>翼修维修第xxxxxxx份报告</span>
				<span>No.956541235787</span>
			</p>
			<!-- <p class="content__title">{{ details.phoneModel.name }}</p>
			<p class="content__desc" v-for="(item, index) in details.service" :key="index">
				{{ item.name }} 
				<span>/维修问题{{ index+1 }}</span>
			</p>
			<img :src="serviceIcon" class="service-icon" alt="">
			<p class="content__desc">
				{{ new Date(details.appointment).getFullYear() }}/
				{{ new Date(details.appointment).getMonth() }}/
				{{ new Date(details.appointment).getDate() }}  
				{{ new Date(details.appointment).getHours() }} : 
				{{ new Date(details.appointment).getMinutes() }}
				<span>/预约时间</span>
			</p>
			<p class="content__desc">{{ details.phoneModel.color[0] }} <span>/颜色</span></p>
			<p class="content__desc">{{ details.user.name }} <span>/用户名</span></p>
			<p class="content__desc">{{ details.phone }} <span>/联系方式</span></p>
			<p class="content__desc">{{ details.serviceWay }} <span>/服务方式</span></p>
			<p class="content__desc">{{ details.address }} <span>/用户地址</span></p> -->
			
			<van-field
				v-model="info.name"
				label="手机"
				placeholder="请输入手机名称"
			/>

			<van-field
				v-model="info.color"
				label="颜色"
				placeholder="请输入手机颜色"
			/>

			<div class="info">
				<p>容量</p>	
				<cube-select
					v-model="info.storage"
					:options="storages" 
				/>
			</div>

			<van-field
				v-model="info.IMei"
				label="IM ei"
				placeholder="请输入IMei"
			/>

			<div class="box">
				<p>网络制式</p>

				<div class="service">
					<selects v-for="(item, index) in networks"
						:type="networksType"
						:key="index"
						@sendMsg="sendMsg"
						@remove="remove"
						:data="item"
						:manufacturer="item._id"
					/>
				</div>
			</div>

		</div>
		
		<!-- <div class="content spec">
			<sicon name="shandian" scale="6"></sicon>
			<div class="desc">
				<p class="desc__title">翼修专业维修</p>
				<p class="desc__content">为您的手机保驾护航</p>
			</div>
		</div> -->

		<div class="content">
			<van-field
				v-model="info.conclusion"
				label="总体质检结论"
				type="textarea"
				placeholder="请输入总体质检结论"
			/>

			<van-field
				v-model="info.supplement"
				label="工程师补充"
				type="textarea"
				placeholder="请输入工程师补充"
			/>
		</div>

		<div class="content" v-show="details.state == 12">
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

		<div v-if="details.state == 11">
			<van-button size="large" class="footer" @click="takeOrder">接单</van-button>
		</div>
		<div v-else-if="details.state == 12">
			<van-button size="large" class="footer" @click="finish">完成</van-button>
		</div>
	</div>
</template>

<script>
import itemHeader from '../components/itemHeader'
import service from '@/assets/service.png'
import selects from '../components/select'
import { Field, Button } from 'vant'
export default {
	props: {
		data: Object
	},
	components: {
		itemHeader,
		[Button.name]: Button,
		[Field.name]: Field,
		selects
	},
	data () {
		return {
			details: {},
			infoName: '订单详情',
			networksType: '网络样式',
			networks: ['联通4G', '移动4G', '电信4G'],
			storages: ['16G', '32G', '64G', '128G', '256G'],
			trackingComSec: [],
			serviceIcon: service,
			info: {
				name: '',
				storage: '',
				color: '',
				IMei: '',
				network: [],
				conclusion: '',
				supplement: ''
			}
		}
	},
	async mounted () {
		window.status = false;
		this.details = JSON.parse(localStorage.getItem('detail'));
		this.details.info ? this.info = this.details.info : null;
		let res = await this.$api.getData('https://m.yixiutech.com/tracking/com');
		res.data.map(item => {	
			this.trackingComSec.push({ text: item.com, value: item.no })
		})
	},
  methods: {
		sendMsg (data) {
			this.info.network.push(data);
		},
		remove (data) {
			this.info.network.map( (item, index) => {
				item == data ? this.info.network.splice(index, 1) : null;
			})
		},
		back () {
			this.$router.go(-1);
		},
		async takeOrder () {
			for (var key in this.info) {
				if (this.info[ key ] == '' || this.info[key] == []) {
					this.prompt('信息未填写完', 'error').show();
					return;
				}
			}
			let data = { _id: this.details._id, state: 12, info: this.info }
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

.service-icon {
	width: 40%;
	position: absolute;
	right: 0;
	top: 84px;
}

.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:flex-start;
}

.header__title {
	color: #fff;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}

.back {
	width: 40px;
	height: 40px;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 8;
}

.cube-select {
	width: 60%;
	margin-left: 20%;
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
