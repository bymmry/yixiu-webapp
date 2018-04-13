<template>
	<div class="position__title">
		<span>您正在看：{{city}}</span>
		<div class="choseArea">
			<div>选择县区</div>
			<sicon name="local-down" scale="1.3"></sicon>
		</div>
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
		this.city = sessionStorage.getItem('nowcity');
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
	justify-content: space-between;
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

</style>