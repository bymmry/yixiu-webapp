<template>
  <div class="search">
    <Header></Header>
    <SearchBody></SearchBody>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import SearchBody from './components/searchBody.vue'
  export default {
    components: {
      Header,
      SearchBody
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

</style>