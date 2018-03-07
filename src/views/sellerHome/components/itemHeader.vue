<template>
  <div class="header">
		<router-link to="/sellerHome">
			<sicon name="back" scale="3"></sicon>
		</router-link>
		<p class="header__title">{{ name }}</p>
  </div>
</template>

<script>
export default {
	props: {
		name: String
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

</style>