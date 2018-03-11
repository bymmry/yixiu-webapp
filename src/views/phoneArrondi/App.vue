<template>
  <div class="phone">
		<Header 
			:name="name"
		/>
		<Swipe></Swipe>
		<Type />
		<Arrondi
			:title="iosTitle"
			:data="iphone"
		/>
		<Arrondi
			:title="androidTitle"
			:data="android"
		/>
		<HotSale></HotSale>
		<Recommend/>
		<div class="space"></div>
  </div>
</template>

<script>
	import Header from './components/header.vue'
	import Swipe from './components/swipe.vue'
	import Type from './components/type.vue'
	import Arrondi from './components/arrondi.vue'
	import Recommend from './components/recommend.vue'
	import HotSale from './components/hotSale.vue'
  export default {
		async mounted () {
			let iphoneData= { goodsName: 'iphone', position: { lng: localStorage.getItem('lng'), lat: localStorage.getItem('lat') }, limit: 4 }
			let iphoneRes = await this.$api.sendData('https://yixiu.natappvip.cc/shop/filter/', iphoneData);
			this.iphone = iphoneRes.data;

			let androidData = { goodsName: '三星', position: { lng: localStorage.getItem('lng'), lat: localStorage.getItem('lat') }, limit: 4 }
			let androidRes = await this.$api.sendData('https://yixiu.natappvip.cc/shop/filter/', androidData);
			this.android = androidRes.data;

		},
    components: {
			Header,
			Swipe,
			Type,
			Arrondi,
			Recommend,
			HotSale
		},
		data () {
			return {
				iosTitle: '二手iPhone直销店',
				androidTitle: '二手Android直销店',
				name: '精品手机',
				iphone: [],
				android: []
			}
		}
  }
</script>

<style scoped>
.space {
	width: 100%;
	height: 8vh;
}
</style>