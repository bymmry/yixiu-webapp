<template>
  <div class="order">
		<item-header :name="infoName" />
		<div class="blank" v-if="data.length == 0">
			<sicon name="order" scale="30"></sicon>
			<h1>该订单列表为空~~</h1>
		</div>
		<order-item v-for="(item, index) in data" :key="index" 
			:data="item"
		/>
	</div>
</template>

<script>
import ItemHeader from '../components/itemHeader'
import OrderItem from '../components/orderItem'

export default {
  components: {
		ItemHeader,
		OrderItem
	},
	data () {
		return {
			infoName: '订单列表',
			state: '',
			data: []
		}
	},
	async mounted () {
		this.state = location.href.split('/').pop();
		let data = { shop: JSON.parse(localStorage.getItem('shopData'))._id, state: Number(this.state), limit: 10 }
		let res = await this.$api.sendData('https://m.yixiutech.com/order/service/filter', data);
		this.data = res.data;
	}
}
</script>

<style scoped>
.blank {
	text-align: center;
	font-size: 20px;
	color: #515151;
}
</style>
