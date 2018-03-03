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
  import Header from './components/header.vue'
  import PositionItem from './components/positionItem.vue'
  export default {
    components: {
      Header,
      PositionItem
    },
    mounted: async function () {
      let _this = this;
      Mock.mock('http://xhc.com', {
        'list|30': ['@city'] 
      })
      this.$ajax.get('http://xhc.com')
        .then(function (response) {
          let result = response.data.list;
          _this.citys = result;
        }).catch(function (error) {
          console.log(error);
        })
    },
    data () {
      return {
        citys: ['中国']
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