<template>
  <div class="arrondi">
		<p class="arrondi__title">{{ title }}</p>
		<div class="arrondi__cotent">
			<ArrondiItem v-for="(item, index) in data" 
				:key="index" 
				:name="item.name"
				:src="item.cover"
				:shop="item._id"
			/>
		</div>
  </div>
</template>

<script>
	import ArrondiItem from './arrondiItem.vue'
  export default {
    props: {
			title: String,
			data: Array
		},
		components: {
			ArrondiItem
		},
		data () {
			return {
				
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