<template>
	<div class="view-service">
		<item-header
			:name="name"
			v-on:backParent="back"
		/>

		<service-item
			:key="index"
			:data="services"
		/>
		

	</div>
</template>

<script>
import serviceItem from '../components/serviceItem'
import itemHeader from '../components/itemHeader'
export default {
  async mounted () {
		let data = { shop: this.shop };
		let serviceMap = await this.$api.sendData('https://m.yixiutech.com/service/shop', data);
		serviceMap.code == 200 ? this.services = serviceMap.data : null;
		console.log(this.services);
	},
	methods: {
		back () {
			this.$router.push('/sellerHome')
		} 
	},
	data () {
		return {
			name: '查看已添加的服务列表',
			services: [],
			shop: JSON.parse(localStorage.getItem('shopData'))._id
		}
	},
	components: {
		itemHeader,
		serviceItem
	}
}
</script>

<style scoped>

</style>
