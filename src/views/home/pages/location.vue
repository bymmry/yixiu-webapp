<template>
  <div class="position">
    <Header></Header>
    <PositionItem
      v-for="(city, index) in citys"
      :key="index"
      :city="city"
    />
    <div class="space"></div>
  </div>
</template>

<script>
  import Header from '../components/itemHeader.vue'
  import PositionItem from '../components/positionItem.vue'
  import city from '../data/city.json'
  export default {
    components: {
      Header,
      PositionItem
    },
    data () {
      return {
        citys: city
      }
    }
  }
</script>

<style scoped>
  .space {
    width: 100%;
    height: 8vh;
  }
</style>
