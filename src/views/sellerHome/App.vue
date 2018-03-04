<template>
  <div class="seller">
		<Header 
			:sellerName="sellerName"
		/>
		<List/>
		<div class="statistics">
			<sicon name="pv" scale="5"></sicon>
			<p>统计</p>
			<sicon name="right" scale="3"></sicon>
		</div>
  </div>
</template>

<script>
	import Header from './components/header.vue'
	import List from './components/list.vue'
  export default {
    components: {
			Header,
			List
		},
		data () {
			return {
				sellerName: '小姐姐家的店'
			}
		}
  }
</script>

<style scoped>
.statistics {
	width: 96%;
	display: flex;
	align-items: center;
	padding: 2%;
	border-bottom: 2px solid #ffbd5c;
}

.statistics p {
	flex: 1;
}
</style>