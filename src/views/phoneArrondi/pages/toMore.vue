<template>
	<div class="toMore">
		<item-header
			:name="infoName"
			@backParent="backToParent"
		/>

		<div class="container">
			<van-swipe :autoplay="3000">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<img v-lazy="image.url"/>
				</van-swipe-item>
			</van-swipe>
		</div>
	</div>
</template>

<script>
import itemHeader from '../../sellerHome/components/itemHeader'
import { Swipe, SwipeItem, Lazyload } from 'vant';

export default {
	methods: {
		backToParent () {
			this.$router.go(-1);
		}
	},
	mounted () {
		this.images = JSON.parse(sessionStorage.getItem('images'));
		console.log(this.images)
	},
	components: {
		itemHeader,
		[Swipe.name]: Swipe,
		[SwipeItem.name]: SwipeItem,
		[Lazyload.name]: Lazyload
	},
	data () {
		return  {
			infoName: '图片详情',
			images: []
		}
	}
}
</script>

<style scoped>
.toMore {
	width: 100%;
	height: 100%;
	background: #000;
}

.container {
	width: 100%;
	height: 80%;
	position: relative;
}

.van-swipe {
  height: 100%;
}

.van-swipe img {
  width: 100%;
}
</style>
