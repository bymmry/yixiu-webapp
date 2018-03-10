<template>
  <div class="phoneList">
		<Header
			:name="name"
		/>

		<phoneItem v-for="(item ,index) in data" 
			:key="index"
			:name="item.name"
			:desc="item.desc"
			:price="item.price"
			:cover="item.cover"
			:phone="item._id"
		/>
	</div>
</template>

<script>
import Header from '../components/header'
import phoneItem from '../components/phoneItem'
export default {
  components: {
		Header,
		phoneItem
	},
	data () {
		return {
			name: '商店手机列表',
			data: []
		}
	},
	async mounted () {
		let param = location.href.split('/').pop().split('&');
		let res = await this.$api.sendData('https://m.yixiutech.com/goods/shop/category/', { category: param[0], shop: param[1]});
		this.data = res.data;
	}
}
</script>

<style scoped>

</style>
