<template>
  <div class="type__item"  @click="route">
    <!-- <sicon :name="icon" scale="3.8"></sicon> -->
    <img :src="img" alt="">
    <br>
    <p>{{name}}</p>
  </div>
</template>

<script>
  
  export default {
    props: {
      name: String,
      icon: String,
      img: String
    },
    methods: {
      route () {
        this.name === '手机维修' ? this.$router.push('/shop') : 
          (this.name === '精品手机' ? this.$router.push('/phoneArrondi') : 
          (this.name === '工程师培训' ? this.$router.push('/teaching') : 
          (this.name === '快速上门' ? window.open('www.yixiutech.com') : 
          (this.name === '更多' ? this.showMore() : this.functionunavailable() ))));
      },
      showMore() {
        this.$emit("showMore");
      }
    }
  }
</script>

<style scoped>
.type__item {
	display: inline-block;
	width: 25%;
	text-align: center;
	font-size: 12px;
  color: #949191;
  margin: 10px 0;
}
.type__item img{
  width: 35px;
  height: 35px;
}
</style>