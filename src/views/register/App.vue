<template>
  <div class="register">
    <Header></Header>
    <Info></Info>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import Info from './components/info.vue'
  export default {
    components: {
      Header,
      Info
    },
    mounted: function () {
      
    },
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  background: url('./log-bg.jpg') center center no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>