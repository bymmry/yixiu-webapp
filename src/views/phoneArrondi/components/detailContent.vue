<template>
	<div>
		<div class="content">
			<p class="content__name">{{ data.name }}</p>
			<p class="content__spec">网络: {{ data.info ? data.info.productParam.network.join(',') : null }} </p>
			<p class="content__spec"> 版本: {{ data.info ? data.info.productParam.version : null }} </p>
			<p class="content__price">
				<span>￥{{ data.price }}</span>
				<span>￥{{ data.info ? data.info.primeCost : null }}</span>
			</p>
			<div class="fee">
				运费: 0元
			</div>
			<div class="area">
				{{ data.info.area ? data.info.area : '' }}
			</div>
			<div class="content__present"> <tag type="danger">赠品</tag> {{ data.info ? data.info.present : null }} </div>
			<div class="content__promise"> <sicon name="bao" scale="2.4"></sicon> {{ data.info ? data.info.promise : null }} </div>
			<div class="content__pro"> 品质保障: 买家购买的商品，由翼修平台提供质保，质保期限为自买家确认收货30天内。 </div>
			<p class="content__item" @click="showDetail">支付方式: 微信线上支付 <sicon name="phoneMore" scale="2"></sicon></p>
			<p class="content__item" @click="showParam"> 产品参数 <sicon name="phoneMore" scale="2"></sicon></p>
			<p class="content__item quality" @click="showQuality"> 质量报告 <sicon name="phoneMore" scale="2"></sicon></p>
			<p></p>
			<actionsheet class="certain" v-model="show" :actions="actions" cancel-text="确定" />
		</div>

		<div class="content spec">
			<p class="content__name spec-name">质检报告</p>
			<p class="content__name spec-name border">IMEI号 : {{ data.info.productParam.imei ? data.info.productParam.imei : '' }}</p>
			<div class="message">
				<div class="message__item">
					<h2>生产日期</h2>
					<p>{{ data.info.qualityParam.info ? data.info.qualityParam.info.birth : '2016年12月' }}</p>
				</div>
				<div class="message__item">
					<h2>系统版本</h2>
					<p>{{ data.info.qualityParam.info ? data.info.qualityParam.info.sysVersion : '11.1' }}</p>
				</div>
				<div class="message__item">
					<h2>颜色</h2>
					<p>{{ data.info.productParam ? data.info.productParam.color : '黑色' }}</p>
				</div>
				<div class="message__item">
					<h2>充电效率</h2>
					<p>{{ data.info.qualityParam.info ? data.info.qualityParam.info.efficiency : '90%以上' }}</p>
				</div>
				<div class="message__item">
					<h2>充电次数</h2>
					<p>{{ data.info.qualityParam.info ? data.info.qualityParam.info.frequency : '0-100' }}</p>
				</div>
				<div class="message__item">
					<h2>版本</h2>
					<p>{{ data.info.qualityParam.info ? data.info.qualityParam.info.version : '国行' }}</p>
				</div>
			</div>
			<div class="report">
				<div class="head">
					<h1 class="head__title">质检报告书</h1>
					<p>机器型号: {{ data.name }}</p>
					<p>IMEI: {{ data.info.productParam.imei ? data.info.productParam.imei : '' }}</p>
				</div>
				<div class="expert">
					<p class="expert__info">
						{{ data.info ? data.info.qualityParam.name : null }}   
						<span class="info__academic">
							{{ data.info ? data.info.qualityParam.academicTitle : null }}
						</span>
					</p>
					<p class="expert__report">
						{{ data.info ? data.info.qualityParam.sum : null }}
					</p>
				</div>
				<div class="head">
					<p class="item">
						<span class="pass">
							<sicon name="qualityScreen" scale="2.4"></sicon>
							外观检测
						</span>
						<span class="pass">
							<sicon name="true" scale="2"></sicon>
							已通过
						</span>
					</p>
					<p class="item">
						<span class="pass">
							<sicon name="setting" scale="2.4"></sicon>
							12项功能检测
						</span>
						<span class="pass">
							<sicon name="true" scale="2"></sicon>
							已通过
						</span>
					</p>
					<p>
						<button class="btn" size="large" @click="detail">
							查看详细质检报告
							<sicon name="top" scale="2.0" v-show="status"></sicon>
							<sicon name="down" scale="2.0" v-show="!status"></sicon>
						</button>
					</p>
					<transition name="fade">
						<img :src="functions" v-show="status" class="flowTip" alt="" />
					</transition>
					<img :src="flowTip" class="flowTip" alt="" />
					<h2 class="quality-title">质检流程</h2>
					<img :src="flow" class="photo" alt="" />
				</div>
			</div>
		</div>
	</div>
	
</template>

<script>
import { Actionsheet, Tag, Popup, Button } from 'vant';
import flow from '@/assets/flow.png';
import product from './product';
import quality from './quality';
import flowTip from '@/assets/flow-tip.png';
import functions from '@/assets/function.png'
export default {
	mounted () {
		console.log(this.data);

	},
	components: {
		Actionsheet,
		Tag,
		[Popup.name]: Popup,
		[Button.name]: Button,
		product,
		quality
	},
	props: {
		data: Object
	},
	methods: {
		detail () {
			this.status = !this.status;
		},
		showDetail () {
			this.show = !this.show;	
			console.log(this.data);
		},
		showParam () {
			this.$emit('showParam', true);
		},
		showQuality () {
			this.$emit('showQuality', true);
		}
	},
  data () {
		return {
			imgList: [],
			show: false,
			popupShow: false,
			paramStatus: false,
			qualityStatus: false,
			status: false,
			functions: functions,
			flow: flow,
			flowTip: flowTip,
			qualityMsg: [],
      actions: [
        {
          name: '支持服务方式: 微信线上支付'
        },
      ]
		}
	}
}
</script>

<style scoped>
.content {
	padding: 4% 0 0 0;
	border-radius: 5px;
	width: 96%;
	background: #fff;
	margin: 10px auto;
	position: relative;
}

.area {
	font-size: 14px;
	position: absolute;
	right: 20px;
	top: 110px;
}

.content .content__name {
	font-size: 24px;
	padding: 0 4%;
}

.certain .van-actionsheet__cancel {
	background: #f85;
	color: #fff;
}

.content__price {
	padding: 2%;
	border-bottom: 1px solid #f1f5ff;
}

.content__price span:nth-child(1) {
	color: red;
	font-size: 24px;
}

.content__price span:nth-child(2) {
	color: gray;
	font-size: 14px;
	text-decoration: line-through;
}

.van-button  {
	background: #ffe8c7;
	color: #000;
}

.content .content__spec {
	color: gray;
	font-size: 0.4em;
	padding: 0 4%;
}

.fee {
	position: absolute;
	top: 60px;
	right: 20px;
	font-size: 14px;
}

.content__present {
	padding: 2% 4%;
	display: flex;
	font-size: 12px;
	align-items: center;
}

.content__present .van-tag {
	margin-right: 3%;
}

.content__pro {
	padding: 2% 5%;
	font-size: 12px;
	line-height: 20px;
}

.spec {
	width: 92%;
	padding: 0 2%;
}

.content__promise {
	padding: 1% 5%;
	display: flex;
	align-items: center;
	color: #f18a31;
	background: #ffe8c7;
	line-height: 20px;
	font-size: 12px;
}

.content__promise .svg-icon {
	margin-right: 4%;
}

.content__item {
	padding: 2% 4%;
	font-size: 14px;
	border-bottom: 1px solid #f1f5ff;
	position: relative;
}

.content__item .svg-icon {
	position: absolute;
	right: 2%;
	top: 50%;
	transform: translate(0, -50%)
}

.content__img .img {
	width: 100%;
	margin-top: 20px;
}

.content .content__desc {
	font-size: 16px;
	letter-spacing: 2px;
	padding: 2% 4%;
	line-height: 24px;
	transition: all 0.1s;
}

.btn {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2% 0;
	border: none;
	background: #ffe8c7;
}

.quality {
	border: 0;
}

.item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2%;
}

.item .pass {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.content .spec-name {
	font-size: 18px;
	padding: 2% 0;
}

.message {
	width: 93%;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	text-align: center;
}

.message .message__item {
	width: 31%;
	padding: 10px 0;
}

.message h2 {
	color: gray;
	font-size: 14px;
}

.message p {
	font-size: 16px;
}

.report {
	width: 100%;
	position: relative;
}

.border {
	border-bottom: 1px solid #f1f5ff;
}

.head {
	text-align: center;
}

.head p {
	color: gray;
	font-size: 14px;
}

.expert {
	padding: 4% 0;
}

.expert .expert__info {
	padding: 2% 0;
	border-bottom: 1px dashed #f1f5ff;
}

.expert .expert__report {
	line-height: 20px;
	padding: 4% 0;
	font-size: 14px;
	border-bottom: 1px dashed #f1f5ff;
}

.expert span {
	color: gray;
}

.head .head__title {
	display: inline-block;
	width: 40%;
	font-size: 18px;
	padding: 4% 0;
	border-bottom: 2px solid #000;
	margin-bottom: 2%;
}

.photo {
	width: 100%;
}

.quality-title {
	text-align: center;
	font-size: 16px;
	color: #f56b0e;
	letter-spacing: 2px;
	padding: 5% 0;
}

.flowTip {
	margin-top: 20px;
	width: 80%;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
