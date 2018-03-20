<template>
  <div class="quality">
		<div class="shadow"></div>
		<div class="content">
			<p class="num">
				<span>翼修优品第8888份报告</span>
				<span>No.956541235787</span>
			</p>
			<p class="content__title">iPhone6s</p>
		</div>
		
	</div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.quality {
	width: 100%;
	position: relative;
}

.shadow {
	width: 100%;
	height: 20%;
	position: absolute;
	left: 0;
	top: 0;
	background: -webkit-linear-gradient(-90deg,rgba(2,181,157,.85) 2%,rgba(22,146,183,.85) 100%);
}

.content {
	width: 90%;
	display: flex;
	justify-content: center;
	padding: 4%;
}

.content .num {
	color: gray;
	font-size: 12px;
}

.content .content__title {
	font-size: 24px;
}
</style>
