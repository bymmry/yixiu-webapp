<template>
	<div class="content">
		<p class="content__name">{{ data.name }}</p>
		<p class="content__spec">网络: {{ data.info ? data.info.productParam.network.join(',') : null }} </p>
		<p class="content__spec"> 版本: {{ data.info ? data.info.productParam.version : null }} </p>
		<p class="content__price"><span>￥{{ data.price }}</span> <span>￥{{ data.info ? data.info.primeCost : null }}</span> </p>

		<div class="content__present"> <tag type="danger">赠品</tag> {{ data.info ? data.info.present : null }} </div>
		<div class="content__promise"> <sicon name="bao" scale="2.0"></sicon> {{ data.info ? data.info.promise : null }} </div>
		<p class="content__item" @click="showDetail">支付方式: 微信线上支付 <sicon name="right" scale="2"></sicon></p>
		<p class="content__item" @click="showParam"> 产品参数 <sicon name="right" scale="2"></sicon></p>
		<p class="content__item" @click="showQuality"> 质量报告 <sicon name="right" scale="2"></sicon></p>
		
		<actionsheet class="certain" v-model="show" :actions="actions" cancel-text="确定" />
	</div>
</template>

<script>
import { Actionsheet, Tag, Popup } from 'vant';
import product from './product';
import quality from './quality';
export default {
	components: {
		Actionsheet,
		Tag,
		[Popup.name]: Popup,
		product,
		quality
	},
	props: {
		data: Object
	},
	methods: {
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
	padding: 4% 0;
}

.content .content__name {
	font-size: 20px;
	padding: 0 4%;
}

.certain .van-actionsheet__cancel {
	background: #f85;
	color: #fff;
}

.content__price {
	padding: 2%;
}

.content__price span:nth-child(1) {
	color: red;
	font-size: 20px;
}

.content__price span:nth-child(2) {
	color: gray;
	font-size: 14px;
	text-decoration: line-through;
}

.content .content__spec {
	color: gray;
	font-size: 0.4em;
	padding: 0 4%;
}

.content__present {
	padding: 2% 4%;
	display: flex;
	align-items: center;
}

.content__present .van-tag {
	margin-right: 4%;
}

.content__promise {
	padding: 1% 4%;
	display: flex;
	align-items: center;
	color: #d81e06;
	background: #fed79e;
	font-size: 12px;
	margin-bottom: 10px;
}

.content__promise .svg-icon {
	margin-right: 4%;
}

.content__item {
	padding: 1% 4%;
	border-bottom: 1px solid gray;
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
</style>
