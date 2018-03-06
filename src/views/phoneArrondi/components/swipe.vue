<template>
  <div class="swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.imgUrl" />
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
    mounted () {
      this.$ajax.get('https://m.yixiutech.com/carousel')
        .then(response => {
          this.images = response.data
        }).catch(error => {
          console.log(error);
        })
    },
    data () {
      return {
        images: []
      }
    }
  }
</script>

<style scoped>
.swipe {
  height: 140px;
}

.van-swipe {
  height: 140px;
}

.van-swipe img {
  width: 100%;
}
</style>