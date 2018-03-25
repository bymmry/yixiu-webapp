<template>
  <ul class="list">
		<li class="list__item" v-for="(item, index) in modules" :key="index" @click="detail(index)">
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
					{ name: '待接单', num: 0, state: 10},
					{ name: '维修中', num: 0, state: 12 },
					{ name: '已完成', num: 0, state: 13 },
					{ name: '浏览量', num: 0, state: 0 }
				],
				shop: JSON.parse(localStorage.getItem('shopData'))._id,
				state: ''
			}
		},
		methods: {
			detail (index) {
				if (this.modules[ index ].state == 0 ) return;
				this.$router.push('/orderList/' + this.modules[ index ].state);
			}
		},
		async mounted () {
			this.modules.slice(0, 3).map( async item => {
				let res = await this.$api.sendData('https://m.yixiutech.com/order/service/filter', { type: 0, shop: this.shop, state: item.state });
				item.num = res.data.length;
			})
			this.modules[3].num = JSON.parse(localStorage.getItem('shopData')).pv;
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