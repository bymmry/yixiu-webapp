<template>
	<div class="hot">
		<p class="hot__title">热门手机维修服务</p>
		<div class="hot__content">
			<type-item
				v-for="(item, index) in data" 
				:key="index" 
				:name="item.name"
				:icon="item.fe.icon"
			/>
		</div>
	</div>
</template>

<script>
	import TypeItem from './typeItem.vue'
	export default {
		components: {
			TypeItem
		},
		data () {
			return {
				data: []
			}
		},
		mounted () {
			this.$ajax.get('https://m.yixiutech.com/category/phoneRepair')
				.then(response => {
					this.data = response.data;
				}).catch(error => {
					console.log(error);
				})
		}
	}
</script>

<style scoped>
.hot {
	width: 100%;
	text-align: center;
	margin-top: 20px;
}
.hot__content {
	width: 90%;
	display: inline-block;
}
</style>