<template>
  <div class="recommend">
		<p class="recommend__title">人气推荐</p>
		<div class="recommend__content">
			<RecommendItem v-for="(item, index) in data" :key="index"
				:name="item.name"
				:src="item.src"
				:standard="item.standard"
				:price="item.price"
			/>
		</div>
  </div>
</template>

<script>
	import RecommendItem from './recommendItem.vue'
  export default {
		components: {
			RecommendItem
		},
		data () {
			return {
				data: [
					{ name: 'iPhone X', standard: '32G 黑', price: '1650', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0' },
					{ name: 'iPhone X', standard: '32G 黑', price: '1650', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0' },
					{ name: 'iPhone X', standard: '32G 黑', price: '1650', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0' },
					{ name: 'iPhone X', standard: '32G 黑', price: '1650', src: 'https://paimgcdn.baidu.com/B24DB760B27E4279?src=https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/dsp-image/144801233.jpg&rz=urar_2_968_600&v=0' }
				]
			}
		}
  }
</script>

<style scoped>
.recommend__title {
	text-align: center;
	padding: 10px 0;
}

.recommend__content {
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	overflow-x: scroll;
	transition: all 0.2s;
}
</style>