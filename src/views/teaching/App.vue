<template>
  <div class="teaching">
    <the-header></the-header>
    <videos></videos>
  </div>
</template>

<script>
  import theHeader from './components/header.vue'
  import videos from './page/videos.vue'
  export default {
    name: 'app',
    components: {
      theHeader,
      videos
    }
  }

</script>

<style>
  .teaching {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: #f1f5f6;
  }

</style>

