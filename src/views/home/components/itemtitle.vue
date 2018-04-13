<template>
	<div class="position__title">
		<span>您正在：{{city}}</span>
		<!-- <div class="choseArea">
			<div>选择县区</div>
			<sicon name="local-down" scale="1.3"></sicon>
		</div> -->
		<baidu-map class="map" center="北京">
		    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="test"></bm-geolocation>
		  </baidu-map>
	</div>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '4cdmmdF0fyNMf6pSEtWuZMDRrYBBzsLc'
})
export default {
	data(){
		return {
			city:""
		}
	},
	methods: {
		test(point, AddressComponent, marker){
			console.log(point)
			alert(JSON.stringify(AddressComponent))
		}
	},
	created(){
		this.city = sessionStorage.getItem('nowcity');
	}
}
</script>

<style scoped>
.position__title {
	background: #fff;
	/*height: 5vh;*/
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
.map {
  width: 100%;
  height: 300px;
}
</style>