<template>
	<div class="shopCar">
		<item-header
			:name="name"
		/>
		
		<van-card
			title="标题"
			desc="描述"
			num="2"
			price="2.00"
			:thumb="imageURL"
		/>
	</div>
</template>

<script>
import itemHeader from '../components/header'
import { Card } from 'vant'
export default {
	data () {
		return {
			name: '购物车'
		}
	},
  components: {
		itemHeader,
		[Card.name]: Card
	}
}
</script>

<style scoped>

</style>
