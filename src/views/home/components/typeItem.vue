<template>
  <div class="type__item"  @click="route">
    <sicon :name="icon" scale="3.8"></sicon>
    <br>
    <p>{{name}}</p>
  </div>
</template>

<script>

  export default {
    props: {
      name: String,
      icon: String
    },
    methods: {
      route () {
        this.name === '手机维修' ? this.$router.push('/shop') : 
          (this.name === '精品手机' ? this.$router.push('/phoneArrondi') : this.functionunavailable() );
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
</style>