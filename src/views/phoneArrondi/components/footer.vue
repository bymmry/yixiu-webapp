<template>
	<van-goods-action>
		<van-goods-action-mini-btn icon="like-o" text="点赞" />
		<van-goods-action-big-btn text="立即购买" />
		<van-goods-action-big-btn text="联系客服" primary />
	</van-goods-action>
</template>

<script>
import {
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
export default {
  components: {
		[GoodsAction.name]: GoodsAction,
		[GoodsActionBigBtn.name]: GoodsActionBigBtn,
		[GoodsActionMiniBtn.name]: GoodsActionMiniBtn
	}
}
</script>

<style scoped>

</style>
