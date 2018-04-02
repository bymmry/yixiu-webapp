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
.teaching{
    width: 100%;
    height: 92vh;
    overflow: hidden;
}
</style>
