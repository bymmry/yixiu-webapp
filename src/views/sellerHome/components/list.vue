<template>
  <ul class="list">
		<li class="list__item" v-for="(item, index) in modules" :key="index" @click="detail">
			<p class="item__name">{{item.name}}</p>
			<p class="item__num">{{item.num}}</p>
		</li>
  </ul>
</template>

<script>
  export default {
		data () {
			return {
				modules: [
					{ name: '待接单', num: 30 },
					{ name: '维修中', num: 320 },
					{ name: '已完成', num: 3000 },
				]
			}
		},
		methods: {
			detail () {
				console.log(123)
			}
		}
  }
</script>

<style scoped>
.list {
	display: flex;
	align-items: center;
	background: #ffbd5c;
	border-bottom: 5px solid #ffbd5c;
}

.list .list__item {
	text-align: center;
	flex-grow: 1;
	border: 1px solid #fff;
}
</style>