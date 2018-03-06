<template>
	<div class="hotSale-item">
		<img :src="src" class="hotSale-item__img" alt="" srcset=""/>
		<div class="hotSale-item__content">
			<p>{{ name }}</p>
			<p>￥{{ price }}</p>
		</div>
	</div>
</template>

<script>
export default {
  props: {
		src: String,
		name: String,
		price: String
	}
}
</script>

<style scoped>
.hotSale-item {
	width: 46%;
	height: 80px;
	background: #eee;
	border-radius: 5px;
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.hotSale-item .hotSale-item__img {
	width: 30%;
	height: 60px;
}

.hotSale-item__content p:nth-child(2) {
	color: red;
}
</style>
