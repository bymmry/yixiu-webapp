<template>
  <div class="arrondi-item">
		<img :src="src" alt="" class="arrondi-item__img" srcset="" :shop="shop" @click="route"/>
		<div class="arrondi-item__content">
			<p class="arrondi-item__name">{{ name }}</p>
			<!-- <p><span class="arrondi-item__price">￥{{ price }}</span> <span class="arrondi-item__primeCost">￥{{ primeCost }}</span></p> -->
		</div>
  </div>
</template>

<script>
  export default {
		props: {
			src: String,
			name: String,
			price: String,
			primeCost: String,
			icon: String,
			shop: String
		},
		methods: {
			async route () {
				let res = await this.$api.sendData('https://m.yixiutech.com/category/shop', {type: 'goods', shop: this.shop});
				console.log(res);
				this.$router.push('/phoneList/' + res.data[0]._id + '&' + this.shop);
			}
		}
  }
</script>

<style scoped>
.arrondi-item {
	width: 48%;
	display: flex;
	height: 100px;
	border-radius: 5px;
	align-items: center;
	background: #eee;
	margin-top: 10px;
}

.arrondi-item .arrondi-item__img {
	width: 50%;
	height: 80px;
	padding-left: 2%;
}

.arrondi-item .arrondi-item__content {
	width: 50%;
	font-size: 14px;
}

.arrondi-item__content .arrondi-item__name {
	padding: 6px;
}

</style>