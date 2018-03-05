<template>
  <div class="questionDetail-container">
    问题详情

  </div>
</template>

<script>

  export default {
    data(){
      return {

      }
    },
    components: {

    },
    methods: {

    },
    created:function(){
      console.log(123)
      console.log(this.$route.params)
    }
  }
</script>

<style scoped>
  .questionDetail-container{

  }
</style>