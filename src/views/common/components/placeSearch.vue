<!-- 区域搜索 -->
<template>
  <div class="placeSearch">
    <span class="placeTitle" v-if="city == ''" @click="showLocation">请选择区域</span>
    <span class="placeTitle" v-else @click="showLocation">已选择：{{city}}（点击改变）</span>
    <location v-on:changeCity="changeCity" v-if="location"  v-on:back="back"/>
    <div class="listView">
      <list-view :shopData="shopData"></list-view>
    </div>
  </div>
</template>

<script>
import location from '../../home/pages/location'
import listView from './listView'
export default {
  data () {
    return {
      location: false,
      city: '',
      shopData: []
    };
  },

  components: {
    location,
    listView
  },

  methods:{
    changeCity(data){
      console.log(data);
      this.city = data;
      this.searchShop(data);
      this.location = false;
    },
    back(){
      this.location = false;
    },
    showLocation(){
      this.location = true;
    },
    async searchShop(city){
      let req = {
        collection: "Shop",
        findType:"find",
        address: {
              $regex: [city]
            }
      }
      let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
      this.shopData = res.data;
    }
  }
}

</script>

<style scoped>
.placeSearch{
  width: 100%;
  height: 100%;
}
.placeSearch .placeTitle{
  display: block;
  padding-left: 15px;
  font-size: 14px;
}
.listView{
  padding: 10px 0;
}
</style>