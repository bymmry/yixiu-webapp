<template>
  <div class="teaching">
      <the-header></the-header>
      <videos></videos>
  </div>
</template>

<script>
    import theHeader from './components/header.vue'
    import videos from './components/videos.vue'
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
    height: 91vh;
    overflow: hidden;
}
</style>
