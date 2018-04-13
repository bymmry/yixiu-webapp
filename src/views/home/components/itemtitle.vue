<template>
	<div class="position__title">
		<span class="positionTitle">您正在：</span>
		<span class="position">{{city}}</span>
		<!-- <div class="choseArea">
			<div>选择县区</div>
			<sicon name="local-down" scale="1.3"></sicon>
		</div> -->

	</div>
</template>

<script>

export default {
	data(){
		return {
			city:""
		}
	},
	methods: {

	},
	created(){
		let cityData = JSON.parse(sessionStorage.getItem('nowposition'));
		// console.log(cityData)
		this.city = cityData.province+cityData.city+cityData.district+cityData.street;
	}
}
</script>

<style scoped>
.position__title {
	background: #fff;
	height: 5vh;
	padding: 8px;
	padding-left: 4vw;
	font-weight: 700;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #d8d8d8;
	font-size: 4vw;
}
.choseArea{
	font-size: 3.5vw;
	color: #a8a8a8;
	font-weight: 500;
	margin-right: 5vw;
	overflow: hidden;
}
.choseArea div{
	display: inline-block;
	overflow: hidden;
}
.choseArea svg{
	margin-left: 3px;
}
.header__title {
	color: #fff;
	font-size: 20px;
	margin-left: 20px;
	letter-spacing: 4px;
}
.map {
  width: 100%;
  height: 300px;
}
.position{
	line-height: 5vw;
}
.positionTitle{
	min-width: 16vw;
}
</style>