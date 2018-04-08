<!-- 物流信息 -->
<template>
  <div class="logistics">
    <h3>填写物流信息</h3>
    <div class="inputs">

      <cube-select class="logisticsSelect" v-model="logistics" placeholder="请选择快递公司" :options="theLogistics" @change="selectServiceWay">
      </cube-select>
    </div>
    <div class="inputs">
      <cube-input v-model="value" placeholder="请输入运单号"></cube-input>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logistics: '',
        theLogistics: [],
        value: ''
      };
    },

    components: {},
    methods: {
      selectServiceWay() {

      }
    }
  }

</script>

<style scoped>
  .logistics {
    width: 80vw;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
  }

  .logistics h3 {
    width: auto;
    height: 40px;
    line-height: 40px;
  }
  .logistics .inputs{
    padding: 10px;
  }

</style>
