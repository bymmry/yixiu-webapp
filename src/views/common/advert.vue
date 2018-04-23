<!-- 广告 -->
<template>
  <div class="advert">
    <!-- <div class="back">
      <p>点击返回</p>
    </div> -->
    <cube-scroll class="scroll">
      <img @click="goBack" :src="imgSrc" alt="">
    </cube-scroll>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgSrc: ""
    };
  },

  components: {},

  created(){
    console.log(this.$route.params);
    this.imgSrc = this.$route.params.imgSrc;
  },
  methods: {
    goBack(){
      console.log("back");
      this.$router.back();
    }
  }
}

</script>

<style scoped>
.advert{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 999;
}
.scroll{
  width: 100%;
  height: 100vh;
}
.advert img{
  display: block;
  width: 98%;
  margin: 10px auto;
}
</style>