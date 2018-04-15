<template>
  <div class="coupon">
		<item-header
			:name="name"
		/>

		<coupon-item
			v-for="(item, index) in couponList"
			:key="index"
			:name="item.name"
			:shopName="item.shopName"
			:condition="item.condition"
			:denomination="item.denomination"
		/>
		
	</div>
</template>

<script>
import itemHeader from '../components/header'
import couponItem from '../components/couponItem';
export default {
	async created () {
		let shop = await this.$api.sendData('https://m.yixiutech.com/shop/filter', {limit: 100, skip: 0});
		shop.data.map(item => {
			item.sellPhone ? this.couponList = this.couponList.concat(item.promotion) : null;
		})
	},
	data () {
		return {
			name: '优惠券列表',
			couponList: []
		}
	},
  components: {
		couponItem,
		itemHeader
	}
}
</script>

<style scoped>
.coupon {
	width: 100%;
	height: 100%;
	background: rgb(248, 247, 247);
}
</style>
