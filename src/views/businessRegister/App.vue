<template>
  <div class="login">
    <Info></Info>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import Info from './components/info.vue'
  export default {
    components: {
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
  height: 250%;
  background: #fff;
  position: relative;
}
</style>