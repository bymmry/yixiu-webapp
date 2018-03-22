<template>
	<div class="product">
		<p class="title">详细参数</p>
		<div class="item">
			<p class="item__title">基础参数</p>
			<p class="item__content"> 
				<span class="content__name">型号</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.model : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">内存</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.storage : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">颜色</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.color : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">网络</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.network.join(',') : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">成色</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.quality : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">版本</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.version : null }}</span> 
			</p>
		</div>
		<div class="item">
			<p class="item__title">屏幕信息</p>
			<p class="item__content"> 
				<span class="content__name">屏幕尺寸</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.screenSize : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">内存</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.ratio : null }}</span> 
			</p>
		</div>
		<div class="item">
			<p class="item__title">外观信息</p>
			<p class="item__content"> 
				<span class="content__name">手机尺寸</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.phoneSize : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">SIM卡规格</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.SIM : null }}</span> 
			</p>
		</div>
		<div class="item">
			<p class="item__title">摄像头</p>
			<p class="item__content"> 
				<span class="content__name">前置摄像头</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.frontCamera : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">后置摄像头</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.backCamera : null }}</span> 
			</p>
		</div>
		<div class="item">
			<p class="item__title">硬件信息</p>
			<p class="item__content"> 
				<span class="content__name">CPU</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.cpu : null }}</span> 
			</p>
			<p class="item__content"> 
				<span class="content__name">主频</span>
				<span class="content__value">{{ data.info  ? data.info.productParam.basicFrequency : null }}</span> 
			</p>
		</div>
		<div class="quit" @click="back">
			<sicon name="quit" scale="5"></sicon>
		</div>
	</div>
</template>

<script>
import parameter from '../data/parameter.json'
export default {
	props: {
		data: Object
	},
	mounted () {
		console.log(this.data);
	},
  data () {
		return {
			
		}
	},
	methods: {
		back () {
			this.$emit('backDetail', true);
		}
	}
}
</script>

<style scoped>
.product {
	width: 100%;
	position: relative;
}

.title {
	text-align: center;
}

.item {
	width: 92%;
	padding: 4%;
}

.item .item__title {
	font-size: 16px;
	color: #13D1BE;
}

.item .item__content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2% 0;
}

.quit {
	position: absolute;
	left: 50%;
	transform: translate(-50%);
}
</style>
