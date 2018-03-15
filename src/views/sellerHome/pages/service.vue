<template>
	<div class="info">
		<p>选择品牌</p>
		<div class="service">
			<selects 
				:brand="brand"
			/>
		</div>
		<p>选择型号</p>

		<cube-select
			v-model="res.name"
			:options="models"
		/>

		<p>选择颜色</p>
		<div class="service">
			<selects 
				:brand="brand"
			/>
		</div>

		<p>选择分类</p>
		<div class="service">
			<selects 
				:brand="brand"
			/>
		</div>
		
		<p>选择维修服务</p>
		<div class="service">
			<selects 
				:brand="brand"
			/>
		</div>

		<p>价钱</p>
		
	</div>
</template>

<script>
import selects from '../components/select'
export default {
  components: {
		selects
	},
	data () {
		return {
			brand: '苹果',
			models: [],
			res: {}
		}
	}
}
</script>

<style scoped>
.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}

.info p {
	padding: 2%;
}
</style>
