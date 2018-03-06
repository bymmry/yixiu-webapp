<template>
  <div class="phone">
		<Header></Header>
		<Swipe></Swipe>
		<Type />
		<Arrondi
			:title="iosTitle"
		/>
		<Arrondi
			:title="androidTitle"
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
				iosTitle: 'iPhone热卖',
				androidTitle: 'Android热卖'
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