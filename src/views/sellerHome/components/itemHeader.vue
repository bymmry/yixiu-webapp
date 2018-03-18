<template>
  <div class="header">
		<div class="back" @click="back"></div>
		<sicon @click="back" name="back" scale="3"></sicon>
		<p class="header__title">{{ name }}</p>
  </div>
</template>

<script>
export default {
	props: {
		name: String
	},
	methods: {
		back () {
			this.$emit('backParent', true);
		}
	}
}
</script>

<style scoped>
.header {
	padding: 8px;
	display: flex;
	align-items: center;
	background: #ffbd5c;
}

.header__title {
	color: #fff;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}

.back {
	width: 40px;
	height: 40px;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 8;
}
</style>