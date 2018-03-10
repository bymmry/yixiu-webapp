<template>
	<div class="content">
		<p class="content__name">{{ data.name }}</p>
		<p class="content__price"><span>￥{{ data.price }}</span></p>
		<div class="content__desc">
			{{ data.detail }}
		</div>
		<div class="content__img">
			<img v-for="(item, index) in imgList" :key="index" :src="item" class="img" alt="" />
		</div>
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
	padding: 4%;
}

.content .content__price {
	padding-bottom: 4%;
}

.content .content__name {
	font-size: 28px;
}

.content__price span:nth-child(1) {
	color: red;
	font-size: 20px;
}

.content__price span:nth-child(2) {
	color: gray;
	margin-left: 10px;
	font-size: 14px;
	text-decoration: line-through;
}

.content__img .img {
	width: 100%;
	margin-top: 20px;
}

.content .content__desc {
	font-size: 20px;
	letter-spacing: 2px;
	line-height: 24px;
	transition: all 0.1s;
}
</style>
