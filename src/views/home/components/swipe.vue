<template>
  <div class="swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <!-- <img v-lazy="image" /> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { Swipe, SwipeItem, Lazyload } from 'vant';
  export default {
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload
    },
    data () {
      return {
        images: [
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1857017071,2328839346&fm=58',
          'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1857017071,2328839346&fm=58'
        ]
      }
    }
  }
</script>

<style scoped>
.swipe {
  height: 120px;
}

.van-swipe {
  height: 120px;
}
</style>