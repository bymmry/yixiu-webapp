<template>
  <div class="order">
    <item-header :name="infoName" />

  </div>
</template>

<script>
  import ItemHeader from '../components/itemHeader'
  // {
  //       //店铺id和用户id至少填一个,但是不能同时填
  //       shop:"5a9ff811d79f455630d24287",//店铺id
  //       user:"5a9ff811d79f455630d24287",//用户id
  //       state:10,//订单状态
  //       limit:10,//一次取列表的条数
  //       skip:0//跳过skip条数据
  // }
  export default {
    components: {
      ItemHeader
    },
    data () {
      return {
        infoName: '订单列表',
        state: ''
      }
    },
    async mounted () {
      this.state = location.href.split('/').pop();
      let data = { shop: '5a9fe2a27c67ee2f8c98c9d5', state: Number(this.state), limit: 10 }
      let res = await this.$api.sendData('https://m.yixiutech.com/order/service/filter', data);
    }
  }
</script>

<style scoped>

</style>
