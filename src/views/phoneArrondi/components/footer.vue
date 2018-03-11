<template>
	<van-goods-action>
		<van-goods-action-mini-btn class="icon" @click="good" icon="like-o" text="点赞" />
		<van-goods-action-mini-btn class="icon" icon="more-o" @click="good" text="评论" />
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

.icon {
	height: 8vh;
}

.van-button {
	height: 8vh;
}
</style>
