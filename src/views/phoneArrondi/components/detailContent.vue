<template>
	<div class="content">
		<p class="content__name">{{ data.name }}</p>
		<p class="content__spec">网络: 移动4G,联通4G,电信4G </p>
		<p class="content__spec"> 版本: 国行 </p>
		<p class="content__price"><span>￥{{ data.price }}</span></p>
		<div class="content__desc">
			{{ data.detail }}
		</div>
		<p class="content__item">支付方式: 微信线上支付</p>
	</div>
</template>

<script>
export default {
	props: {
		data: Object
	},
  data () {
		return {
			imgList: [

			]
		}
	}
}
</script>

<style scoped>
.content {
	padding: 4% 0;
}

.content .content__price {
	padding-bottom: 4%;
}

.content .content__name {
	font-size: 20px;
	padding: 0 4%;
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

.content__item {
	padding: 1% 0;
	border-top: 1px solid gray;
	border-bottom: 1px solid gray;
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
