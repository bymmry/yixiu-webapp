<template>
  <div class="hot">
    <!-- <p class="hot__title">热门手机维修服务</p> -->
    <div v-if="data" class="hot__content">
      <hot-item
        v-for="(item, index) in data"
        :key="index"
        :name="item.name"
        :icon="item.fe.icon"
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
        data: [],
        iconData:{
          fe: {
            icon: "undefined"
          }
        }
      }
    },
    async mounted () {
      let that = this;
      let res = await this.$api.getData('https://m.yixiutech.com/category/phoneRepair');
      let showData = [];
      res.data.forEach(el => {
        if(el.fe){
          showData.push(el);
        }
      });
      let newData = res.data.map(function (val) {
        if(val.fe){
          return val;
        }else{
          return Object.assign({}, val, that.iconData);
        }
      });
      if(showData.length >= 5){
        showData = showData.slice(0, 5);
      }
      this.data = showData;
    }
  }
</script>



<style scoped>
  .hot {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    
    border-bottom: 10px solid #efefef;
  }
  .hot__content {
    width: 90%;
    display: inline-block;
  }
</style>
