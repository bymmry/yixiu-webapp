<template>
  <van-goods-action>
    <van-goods-action-mini-btn @click="good" icon="like-o" text="点赞" />
    <van-goods-action-mini-btn icon="more-o" @click="good" text="评论" />
    <van-goods-action-big-btn text="立即购买"  @click="buy" />
    <van-goods-action-big-btn text="联系客服" @click="good" primary />
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
    },
    methods: {
      good () {
        this.functionunavailable();
      },
      buy () {

      }
    }
  }
</script>

<style scoped>
  .van-goods-action {
    z-index: 20;
  }
</style>
