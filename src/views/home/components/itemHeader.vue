<template>
  <div class="position__header">
		<router-link to="/home">
			<sicon name="back" scale="3"></sicon>
		</router-link>
		<p class="header__title">选择城市</p>
  </div>
</template>

<script>
export default {
	methods: {

	}
}
</script>

<style scoped>
.position__header {
	background: #ffbd5c;
	padding: 8px;
	display: flex;
	align-items: center;
}

.header__title {
	color: #fff;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}

</style>