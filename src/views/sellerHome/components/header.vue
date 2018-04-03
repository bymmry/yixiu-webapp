<template>
  <div class="header">
    <img class="header__logo" :src="shopData.cover"/>
		<p>{{ shopData.name }}</p>
		<p>审核状态:{{ shopData.qualificationState }}</p>
  </div>
</template>

<script>
  export default {
		props: {
			shopData: Object
		}
  }
</script>

<style scoped>
.header {
	width: 100%;
	height: 150px;
	background: #ffbd5c;
	text-align: center;
	color: #fff;
}

.header .header__logo {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	display: inline-block;
	background-size: 100% 100%;
	margin: 10px 0;
}
</style>