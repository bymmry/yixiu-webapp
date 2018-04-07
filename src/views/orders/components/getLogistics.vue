<!-- 物流信息 -->
<template>
  <div class="logistics">
    <cube-select 
      class="logisticsSelect" 
      v-model="logistics"
      placeholder="请选择快递公司" 
      :options="theLogistics" 
      @change="selectServiceWay">
    </cube-select>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logistics: '',
      theLogistics: []
    };
  },

  components: {},
  methods: {
    selectServiceWay(){

    }
  }
}

</script>

<style scoped>
.logistics{
  width: 80vw;
}
</style>