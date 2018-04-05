<template>
	<div class="hot-item" :service="service" @click="route">
		<!-- <sicon :name="icon" scale="3.8"></sicon> -->
		<img :src="img" alt="">
    <br>
    <p>{{name}}</p>
	</div>
</template>

<script>
export default {
  props: {
		name: String,
		icon: String,
		service: String,
		img: String
	},
	methods: {
		route () {
			this.$router.push('/shop?' + this.service)
		}
	}
}
</script>

<style scoped>
.hot-item {
	display: inline-block;
	width: 20%;
	text-align: center;
	font-size: 12px;
  color: #949191;
  margin: 10px 0;
}
.hot-item img{
	margin: 0 auto;
	width: auto;
	height: 25px;
}
</style>
