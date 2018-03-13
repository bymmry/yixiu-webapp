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
  background: url('https://xuhaichao-1253369066.cos.ap-chengdu.myqcloud.com/log-bg.jpg') center center no-repeat;
  background-size: auto 140%;
  position: relative;
}
</style>