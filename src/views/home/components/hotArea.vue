<template>
  <div class="hot">
    <p class="hot__title">热门手机维修服务</p>
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
      let newData = res.data.map(function (val) {
        if(val.fe){
          return val;
        }else{
          return Object.assign({}, val, that.iconData);
        }
      });
      console.log(newData);
      this.data = newData;
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
