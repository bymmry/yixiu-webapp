<template>
	<div class="position__title">
		<!-- <div class="wbg"></div> -->
		<span class="positionTitle">您正在：</span>
		<span class="positionText">{{city}}</span>
		<span class="pointClick" @click="toMap">		
			<sicon name="local-point" scale="3" color="#676767"></sicon>
		</span>
		<!-- <div class="choseArea">
			<div>选择县区</div>
			<sicon name="local-down" scale="1.3"></sicon>
		</div> -->

		<loacal-map @close="closeMap" v-if="changePoint"></loacal-map>
	</div>
</template>

<script>
import loacalMap from "./local-map"

export default {
	components: {
      loacalMap
    },
	data(){
		return {
			city:"",
			changePoint:false
		}
	},
	methods: {
		closeMap(){
			this.changePoint = false;
			let cityData = JSON.parse(sessionStorage.getItem('nowposition'));
			this.city = cityData.province+cityData.city+cityData.district+cityData.street+cityData.street_number;
		},
		toMap(){
			this.changePoint = true;
		}
	},
	created(){
		let cityData = JSON.parse(sessionStorage.getItem('nowposition'));
		this.city = cityData.province+cityData.city+cityData.district+cityData.street+cityData.street_number;
	}
}
</script>

<style scoped>
.position__title {
	position: relative;
	background: #fff;
	height: 8vh;
	line-height: 8vh;
	/*padding: 8px;*/
	padding-left: 4vw;
	font-weight: 700;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #d8d8d8;
	font-size: 4vw;
}
.wbg{
	position: absolute;
	width: 100%;
	height: 100%;
	background: #fff;
	margin-left:-4vw;
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
.positionText{
	display: inline-block;
	line-height: 5vw;
	z-index: 10;
	max-width: 65vw;
}
.positionTitle{
	min-width: 16vw;
	z-index: 10;
}
.pointClick{
	z-index: 10;
	width: 10vw;
	margin-left: 3vw;
	text-align: center;
}
.pointClick svg{
	margin-bottom: -1.5vh;
}
</style>