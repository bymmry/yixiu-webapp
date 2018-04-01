<template>
  <div class="recommend">
		<p class="recommend__title">人气推荐</p>
		<div class="recommend__content">
			<RecommendItem v-for="(item, index) in data" :key="index"
				:name="item.name"
				:src="item.src"
				:standard="item.standard"
				:price="item.price"
				:type="item.type"
			/>
		</div>
  </div>
</template>

<script>
	import RecommendItem from './recommendItem.vue'
	import data from '../data/recommend.json'
  export default {
		components: {
			RecommendItem
		},
		data () {
			return {
				data: data
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
	overflow-y: hidden;
	overflow-x: scroll;
}
</style>