<template>
  <div class="swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.url" @click="toMore"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { Swipe, SwipeItem, Lazyload } from 'vant';
  export default {
    methods: {
      toMore () {
        sessionStorage.setItem('images', JSON.stringify(this.images))
        this.$router.push('/toMore');
      }
    },
    props: {
      images: Array
    },
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Lazyload.name]: Lazyload
    },
    async mounted () {
      console.log(this.images);
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
.swipe {
  height: 300px;
}

.van-swipe {
  height: 300px;
}

.van-swipe img {
  width: 100%;
}
</style>