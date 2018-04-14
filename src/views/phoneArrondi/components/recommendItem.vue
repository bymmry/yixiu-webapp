<template>
  <div class="recommend-item" @click="search(name)">
		<img :src="src" alt="" class="recommend-item__img" srcset="" />
		<p class="recommend-item__name">{{ name }}</p>
		<p class="recommend-item__standard">{{ standard }}</p>
		<p class="recommend-item__price"> ￥{{ price }}</p>
  </div>
</template>

<script>
  export default {
		props: {
			src: String,
			name: String,
			price: String,
			standard: String,
			type: String
		},
		methods: {
			async search (name) {
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
.recommend-item {
	width: 33%;
	text-align: center;
	display: inline-block;
	font-size: 14px;
}

.recommend-item .recommend-item__img {
	display: inline-block;
	width: 80%;
}

.recommend-item .recommend-item__price {
	color: red;
}
</style>