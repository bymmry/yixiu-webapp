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
    created(){
      let imgData = [
        {
          imgUrl: 'https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/swipe1.jpg',
          shopId: '5a96659dda3df52e946142ff',
          type: 'shop'
        },
        {
          imgUrl: 'https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/swipe2.jpg',
          shopId: '5aac6e86eb477d0e1d0bfbb4',
          type: 'shop'
        },
        {
          imgUrl: 'https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/swipe3.jpg',
          shopId: '5aa27cf18d78c262b3f19937',
          type: 'shop'
        },
        {
          imgUrl: 'https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/swipe4.jpg',
          shopId: '5aa4a1a3733e266adc724d1a',
          type: 'shop'
        },
        {
          imgUrl: 'https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/swipe5.jpg',
          shopId: '5aaccd67e3dfdd1ad607f283',
          type: 'shop'
        },
      ];
      this.images = imgData;
    },
    async mounted () {
      // let res = await this.$api.getData('https://m.yixiutech.com/carousel');
      // this.images = res.data;
      // console.log(res.data);
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