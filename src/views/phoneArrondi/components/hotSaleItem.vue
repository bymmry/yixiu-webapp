<template>
	<div class="hotSale-item" @click="search">
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
		price: String,
		type: String
	},
	methods: {
		search () {
			this.$router.push('/phoneList/' + this.type + '&' + this.name);
		}
	}
}
</script>

<style scoped>
.hotSale-item {
	width: 46%;
	height: 80px;
	box-shadow: 0 0 5px;
	border-radius: 5px;
	display: inline-block;
	border: 1px solid #eee;
	margin: 10px 5px;
}

.hotSale-item .hotSale-item__img {
	width: 50%;
	height: 80px;
	display: inline-block;
	vertical-align: middle;
}

.hotSale-item .hotSale-item__content {
	display: inline-block;
	vertical-align: middle;
}

.hotSale-item__content p:nth-child(1) {
	font-size: 14px;
}

.hotSale-item__content p:nth-child(2) {
	color: red;
}
</style>
