<template>
    <div class="loading">loading</div>
</template>

<script>
  export default {
    name: 'to-seller-home',
    created() {
      console.log(window.location.href);
      let seller = this.urlDataTurnObj(window.location.href);
      seller = JSON.parse(seller);
      alert(seller);
      console.log(seller);
    }
  };
</script>

<style scoped>
  .loading{
    width: auto;
    height: auto;
    padding-top: 20vh;
    text-align: center;
  }
</style>
