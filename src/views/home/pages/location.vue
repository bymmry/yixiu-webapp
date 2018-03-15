<template>
  <div class="position">
    <Header></Header>

    <p class="position__item" @click="pitchOn" v-for="(city, index) in citys" :key="index">
      {{city}}
    </p>

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
    },
    methods: {
      pitchOn: function (e) {
        let currentItem = e.target.innerHTML.trim();
        this.$emit('changeCity', currentItem);
      }
    }
  }
</script>

<style scoped>
  .space {
    width: 100%;
    height: 8vh;
  }

.position__item {
  padding: 5%; 
  width: 90%;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}
</style>
