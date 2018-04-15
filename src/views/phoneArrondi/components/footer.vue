<template>
	<van-goods-action>
		<!-- <van-goods-action-mini-btn class="icon" icon="cart" @click="toCar" text="购物车" /> -->
		<!-- <sure-order 
			:sureOrderData="sureOrderData"
			:TotalFee="sureOrderData.price"
			:nextStepButtonDisabled="nextStepButtonDisabled"
			class="sss"
		/> -->
		<!-- <van-goods-action-big-btn class="icon" text="加入购物车" @click="addToCar" /> -->
		<van-goods-action-big-btn class="icon" text="立即购买" @click="toOrder" primary />
	</van-goods-action>
</template>

<script>
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant'
import SureOrder from '../../common/components/sureOrder'
export default {
  components: {
		[GoodsAction.name]: GoodsAction,
		[GoodsActionBigBtn.name]: GoodsActionBigBtn,
		[GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
		SureOrder
	},
	props: {
		sureOrderData: Object
	},
	data () {
		return {
			nextStepButtonDisabled: false
		}
	},
	methods: {
		toCar () {

		},
		addToCar () {
			// localStorage中的shopCar一定是数组
			let shopCar = localStorage.getItem('shopCar') ? JSON.parse(localStorage.getItem('shopCar')) : [];
			shopCar.push(JSON.parse(sessionStorage.getItem('detail')));
			localStorage.setItem('shopCar', shopCar);
			this.prompt('添加到购物车成功', 'correct').show();
		},
		toOrder () {
			this.$router.push('/order');
		},
		good () {
			this.functionunavailable();
		},
	},
}
</script>

<style scoped>
.van-goods-action {
	z-index: 20;
}

.icon {
	background-color: red;
}
</style>
