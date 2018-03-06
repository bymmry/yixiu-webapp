<template>
  <div class="arrondi-item">
		<img :src="src" alt="" class="arrondi-item__img" srcset="" />
		<div class="arrondi-item__content">
			<p class="arrondi-item__name">{{ name }}</p>
			<p><span class="arrondi-item__price">￥{{ price }}</span> <span class="arrondi-item__primeCost">￥{{ primeCost }}</span></p>
			<div class="arrondi-item__preferential"> 立减 {{ primeCost - price }}</div>
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
			icon: String
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
	width: 40%;
	height: 80px;
}

.arrondi-item .arrondi-item__content {
	width: 60%;
}

.arrondi-item__content .arrondi-item__name {
	padding: 6px;
}

.arrondi-item__content .arrondi-item__price {
	color: rgb(228, 41, 41);
	padding-left: 10px;
}

.arrondi-item__content .arrondi-item__primeCost {
	font-size: 10px;
	text-decoration: line-through;
}

.arrondi-item__content .arrondi-item__preferential {
	width: 60%;
	font-size: 10px;
	color: #fff;
	padding: 4px 0;
	background: rgb(228, 41, 41);
	text-align: center;
	margin-left: 10px;
}
</style>