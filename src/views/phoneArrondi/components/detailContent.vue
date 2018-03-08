<template>
	<div class="content">
		<p class="content__price"><span>￥2799</span><span>￥3999</span></p>
		<div class="content__desc">
			我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机
			我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机我的手机
		</div>
		<div class="content__img">
			<img v-for="(item, index) in imgList" :key="index" :src="item" class="img" alt="" />
		</div>
	</div>
</template>

<script>
export default {
  data () {
		return {
			imgList: [
				'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3146109938,3614262430&fm=27&gp=0.jpg',
				'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3146109938,3614262430&fm=27&gp=0.jpg',
				'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3146109938,3614262430&fm=27&gp=0.jpg'
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
