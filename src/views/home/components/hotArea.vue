<template>
  <div class="hot">
    <p class="hot__title">热门手机维修服务</p>
    <div class="hot__content">
      <hot-item
        v-for="(item, index) in data"
        :key="index"
        :name="item.name"
        :service="item.name"
      />
    </div>
  </div>
</template>

<script>
  import HotItem from './hotItem.vue'
  export default {
    components: {
      HotItem
    },
    data () {
      return {
        data: []
      }
    },
    async mounted () {
      let res = await this.$api.getData('https://m.yixiutech.com/category/phoneRepair');
      this.data = res.data;
    }
  }
</script>



<style scoped>
  .hot {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .hot__content {
    width: 90%;
    display: inline-block;
    border-bottom: 2px solid #efefef;
  }
</style>
