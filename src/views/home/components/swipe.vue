<template>
  <div class="swipe">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img @click="toShop(image)" v-lazy="image.imgUrl" />
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
          imgUrl: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/swipe1.jpg',
          shopId: '5a96659dda3df52e946142ff',
          type: 'shop'
        },
        {
          imgUrl: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/swipe2.jpg',
          shopId: '5aac6e86eb477d0e1d0bfbb4',
          type: 'shop'
        },
        {
          imgUrl: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/swipe3.jpg',
          shopId: '5aa27cf18d78c262b3f19937',
          type: 'shop'
        },
        {
          imgUrl: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/swipe4.jpg',
          shopId: '5aa4a1a3733e266adc724d1a',
          type: 'shop'
        },
        {
          imgUrl: 'https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/swipe5.jpg',
          shopId: '5aaccd67e3dfdd1ad607f283',
          type: 'shop'
        },
      ];
      this.images = imgData;
    },
    data () {
      return {
        images: []
      }
    },
    methods: {
      toShop: function(item) {
        if(item.shopId){
          console.log(this);
          this.$router.push({
            path: `/shop/${item.shopId}`,
            params: {
              id: item.shopId
            }
          })
        }
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