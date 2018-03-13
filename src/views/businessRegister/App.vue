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
  height: 250%;
  background-image: linear-gradient( 135deg, #FAD7A1 10%, #E96D71 100%);
  position: relative;
}
</style>