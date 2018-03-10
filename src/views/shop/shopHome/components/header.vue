<template>
  <div class="header">
    <div class="header__logo"></div>
		<p>{{ sellerName }}</p>
  </div>
</template>

<script>
  export default {
		props: {
			sellerName: String
		}
  }
</script>

<style scoped>
.header {
	width: 100%;
	height: 20vh;
	background: #ffbd5c;
	text-align: center;
	color: #fff;
}

.header .header__logo {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	display: inline-block;
	background: url('https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/Default-Profile.png') center center no-repeat;
	background-size: 100% 100%;
	margin: 10px 0;
}
</style>