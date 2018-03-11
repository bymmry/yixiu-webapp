<template>
  <div class="login">
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
    }
  }
</script>

<style scoped>
body {
  color: #000;
}

.login {
  width: 100%;
  height: 140%;
  background: url('./log-bg.jpg') center center no-repeat;
  background-size: auto auto;
  position: relative;
}
</style>