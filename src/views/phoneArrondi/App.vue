<template>
  <div class="phone">
	<cube-scroll class="scroll">
		<div>
			<Header 
				:name="name"
			/>
			<Swipe></Swipe>
			<Type />
			<Arrondi
				:title="iosTitle"
				:content="iphone"
				:type="ios"
			/>
			<Arrondi
				:title="androidTitle"
				:content="android"
				:type="androidId"
			/>
			<HotSale 
				:androidType="androidId"
				:iosType="ios"
			/>
			<Recommend
				:androidType="androidId"
				:iosType="ios"
			/>
			<div class="space"></div>
		</div>
	</cube-scroll>
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

			// let addCategory = await this.$api.sendData('https://m.yixiutech.com/category', {type: 'goods', name: 'android', shop: '5ab93879d4e7f1497d58d94e', parent: '5aba57d8cb8a365364b118ac'})

			let categoryRes = await this.$api.sendData('https://m.yixiutech.com/category/shop', { type: 'goods', shop: '5ab93879d4e7f1497d58d94e' });
			categoryRes.data.map(item => {
				if (item.name == 'ios') {
					this.ios = item._id;
				}
				if (item.name == 'android') {
					this.androidId = item._id;
				}
			})

			let iosList = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category/', {category: this.ios, shop: '5ab93879d4e7f1497d58d94e'});
			
			iosList.code == 200 ? this.iphone = iosList.data.slice(0, 4) : alert('网络错误, 请稍后重试!');	

			let androidList = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category/', {category: this.androidId, shop: '5ab93879d4e7f1497d58d94e'})
			
			androidList.code == 200 ? this.android = androidList.data.slice(0, 4) : alert('网络错误, 请稍后重试!');

			// let list = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category/', { category: this.category, shop: '5aa4a1a3733e266adc724d1a'});
			// this.data = res.data;
			// console.log(list);

			// let iphoneData= { goodsName: 'iphone', position: { lng: localStorage.getItem('lng'), lat: localStorage.getItem('lat') }, limit: 4 }
			// let iphoneRes = await this.$api.sendData('https://m.yixiutech.com/shop/filter/', iphoneData);
			// this.iphone = iphoneRes.data;
			// console.log(this.iphone);

			// let androidData = { goodsName: '三星', position: { lng: localStorage.getItem('lng'), lat: localStorage.getItem('lat') }, limit: 4 }
			// let androidRes = await this.$api.sendData('https://m.yixiutech.com/shop/filter/', androidData);
			// this.android = androidRes.data;

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
				android: [],
				androidId: '',
				ios: ''
			}
		}
  }
</script>

<style scoped>
.scroll{
	width: 100%;
	height: 91vh;
	}
.space {
	width: 100%;
	height: 8vh;
}
</style>