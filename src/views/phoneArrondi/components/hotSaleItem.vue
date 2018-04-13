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
		async search () {
			let data = { type: 'goods', shop: '5ab93879d4e7f1497d58d94e' };
			let typeId = '';
			let searchName = this.name.replace(this.spaceReg, '').toLowerCase();
			let categoryRes = await this.$api.sendData('https://m.yixiutech.com/category/shop', data);
			categoryRes.data.map(item => {
				item.name == this.type ? typeId = item._id : null;
			})
			this.$router.push('/phoneList/' + typeId + '&' + searchName);
		}
	},
	data () {
		return {
			spaceReg: /\s+/g
		}
	}
}
</script>

<style scoped>
.hotSale-item {
	width: 46%;
	height: 100px;
	box-shadow: 0 0 5px;
	border-radius: 5px;
	float: left;
	border: 1px solid #eee;
	margin: 10px 5px;
}

.hotSale-item .hotSale-item__img {
	width: 36%;
	height: 84px;
	margin-top: 8px;
	margin-left: 4%;
	display: inline-block;
	vertical-align: middle;
}

.hotSale-item .hotSale-item__content {
	display: inline-block;
	vertical-align: middle;
}

.hotSale-item__content p:nth-child(1) {
	font-size: 12px;
}

.hotSale-item__content p:nth-child(2) {
	color: red;
}
</style>
