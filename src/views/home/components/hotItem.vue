<template>
	<div class="hot-item" :service="service" @click="route">
		<sicon :name="icon" scale="3.8"></sicon>
    <br>
    <p>{{name}}</p>
	</div>
</template>

<script>
export default {
  props: {
		name: String,
		icon: String,
		service: String
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
</style>
