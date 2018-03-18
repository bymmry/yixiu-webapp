<template>
  <div class="arrondi-item">
		<img :src="src" alt="" class="arrondi-item__img" srcset="" :shop="shop" @click="route"/>
		<div class="arrondi-item__content">
			<p class="arrondi-item__name">{{ name }}</p>
			<p class="arrondi-item__name"><span class="arrondi-item__price">￥{{ price }}</span> <span class="arrondi-item__primeCost">￥{{ primeCost }}</span></p>
			<div class="arrondi-item__preferential">立省{{ primeCost - price }}元</div>
		</div>
  </div>
</template>

<script>
  export default {
		props: {
			src: String,
			name: String,
			price: Number,
			primeCost: Number,
			icon: String,
			shop: String
		},
		methods: {
			async route () {
				// console.log(this.shop);
				// let res = await this.$api.sendData('https://m.yixiutech.com/category/shop', {type: 'goods', shop: this.shop});
				// console.log(res);
				// this.$router.push('/phoneList/' + res.data[0]._id + '&' + this.shop);
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
	justify-content: space-around;
	background: #eee;
	margin-top: 10px;
}

.arrondi-item .arrondi-item__img {
	width: 25%;
	height: 80px;
	padding-left: 2%;
}

.arrondi-item .arrondi-item__content {
	width: 64%;
	font-size: 14px;
}

.arrondi-item__content .arrondi-item__name {
	padding: 2%;
	width: 96%;
	display: flex;
	align-items: center;
}

.arrondi-item__price {
	color: red;
	font-size: 18px;
	display: inline-block;
}

.arrondi-item__primeCost{
	color:gray;
	font-size: 14px;
	text-decoration: line-through;
	display: inline-block;
	margin-left: 2%;
}

.arrondi-item__preferential {
	width: 60%;
	text-align: center;
	font-size: 10px;
	padding: 4% 0;
	color: #fff;
	margin-left: 4%;
	background: #fe6547;
}

</style>