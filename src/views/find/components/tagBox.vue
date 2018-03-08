<template>
  <div class="questionTag">
    <p class="questiontitle">标签:</p>
    <input type="text" placeholder="标签1">
    <input type="text" placeholder="标签2">
    <input type="text" placeholder="标签3">
    <input type="text" placeholder="标签4">
    <input type="text" placeholder="标签5">
    <input type="text" placeholder="标签6">
  </div>
</template>

<script>
  //vant


  export default {
    components: {

    },
    methods: {
    }
  }
</script>

<style scoped>
  .questionTag input{
    width: 29%;
    margin-bottom: 4px;
    margin-right: 2%;
    padding-left: 2px;
    padding-bottom: 2.4px;
    border-bottom: 2px solid #eee;
    color: rgb(32, 32, 32);
    font-size: 5vw;
    letter-spacing: 0.2vw;
  }
  .questionTag input::-webkit-input-placeholder {   
    /* WebKit browsers */   
    color: #c0c0c0;   
  }   
  .questionTag input:-moz-placeholder {   
    /* Mozilla Firefox 4 to 18 */   
    color: #c0c0c0;   
  }   
  .questionTag input::-moz-placeholder {   
    /* Mozilla Firefox 19+ */   
    color: #c0c0c0;   
  }   
  .questionTag input:-ms-input-placeholder {   
    /* Internet Explorer 10+ */   
    color: #c0c0c0;   
  }
</style>