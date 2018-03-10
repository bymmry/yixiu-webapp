<template>
  <div class="header"  @click="back">
    <sicon name="back" scale="3"></sicon>
    <p class="header__title">{{ name }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      route: String,
      path: String
    },
    methods: {
      back (e) {
        if (e.target.classList.contains('svg-icon')) {
          this.$router.go(-1);
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    padding: 8px;
    display: flex;
    align-items: center;
    background: #ffbd5c;
  }

  .header__title {
    color: #fff;
    font-size: 20px;
    margin-left: 20px;
    letter-spacing: 4px;
  }

</style>
