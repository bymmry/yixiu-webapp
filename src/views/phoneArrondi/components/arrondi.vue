<template>
  <div class="arrondi">
		<p class="arrondi__title">{{ title }}</p>
		<div class="arrondi__cotent">
			<ArrondiItem v-for="(item, index) in content" 
				:key="index"
				:name="item.name"
				:src="item.src"
				:price="item.price"
				:type="type"
				:primeCost="item.primeCost"
			/>
		</div>
  </div>
</template>

<script>
	import ArrondiItem from './arrondiItem.vue'
	import iphoneX from '@/assets/iphoneX.png';
	import iphone8 from '@/assets/iphone8.png';
	import iphone8P from '@/assets/iphone8PLUS.png';
	import iphone6s from '@/assets/iphone6.png';
  export default {
    props: {
			title: String,
			content: Array,
			type: String
		},
		components: {
			ArrondiItem
		},
		methods: {

		},
		data () {
			return {
				defaultPrice: '7800',
				defaultPhoto: iphoneX,
				datas: [
					// { name: 'iphoneX', price: 6800, primeCost:8600, cover: iphoneX },
					// { name: 'iphone8', price: 5400, primeCost:7800, cover: iphone8 },
					// { name: 'iphone8 PLUS', price: 5800, primeCost:8200, cover: iphone8P },
					// { name: 'iphone6S', price: 3000, primeCost:5300, cover: iphone6s },
				]
			}
		},
  }
</script>

<style scoped>
.arrondi__title {
	text-align: center;
	padding: 10px 0;
}

.arrondi__cotent {
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
</style>