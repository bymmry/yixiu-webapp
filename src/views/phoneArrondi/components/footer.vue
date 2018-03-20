<template>
	<van-goods-action>
		<van-goods-action-mini-btn class="icon" @click="good" icon="chat" text="客服" />
		<van-goods-action-mini-btn class="icon" @click="good" icon="like-o" text="收藏" />
		<van-goods-action-mini-btn class="icon" icon="cart" @click="good" text="购物车" />
		<sure-order 
			:sureOrderData="sureOrderData"
			:TotalFee="sureOrderData.price"
			class="sss"
		/>
		<van-goods-action-big-btn class="icon" text="联系客服" @click="good" primary />
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

		}
	},
	methods: {
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
</style>
