<template>
	<div class="info">
		<p>选择品牌</p>
		<div class="service" @click="click">
			<single-select ref="select"  v-for="(item, index) in brand" :key="index"
				:data="item"
			/>
		</div>
		
		<p>选择型号</p>

		<cube-select
			v-model="res.name"
			:options="models"
		/>

		<p>选择颜色</p>
		<div class="service">
			<selects v-for="(item, index) in color" :key="index"
				:data="item"
			/>
		</div>

		<p>选择分类</p>
		<div class="service">
			<selects v-for="(item, index) in category" :key="index"
				:data="item"
			/>
		</div>
		
		<p>选择维修服务</p>
		<div class="service">
			<selects v-for="(item, index) in service" :key="index"
				:data="service"
			/>
		</div>

		<p>价钱</p>
		
	</div>
</template>

<script>
import selects from '../components/select'
import singleSelect from '../components/singleSelect'
export default {
  components: {
		selects,
		singleSelect
	},
	data () {
		return {
			brand: ['苹果', '三星', '小米'],
			models: [],
			res: {},
			color: ['银色', '金色', '黑色', '白色'],
			category: ['屏幕问题', '耳机问题'],
			service: []
		}
	},
	methods: {
		click () {
			this.$refs.select.map(item => {
				console.log(item);
			})
		}
	}
}
</script>

<style scoped>
.service {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content:space-around;
}

.info p {
	padding: 2%;
}
</style>
