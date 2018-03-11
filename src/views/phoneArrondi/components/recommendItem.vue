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
			standard: String
		},
		methods: {
			search (name) {
				this.$router.push('/shop?' + name)
			}
		}
  }
</script>

<style scoped>
.recommend-item {
	width: 33%;
	text-align: center;
	display: inline-block;
}

.recommend-item .recommend-item__img {
	display: inline-block;
	width: 80%;
}

.recommend-item .recommend-item__price {
	color: red;
}
</style>