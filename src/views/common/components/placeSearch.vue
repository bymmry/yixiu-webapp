<!-- 区域搜索 -->
<template>
  <div class="placeSearch">
    <span class="placeTitle placeButton" v-if="city == ''" @click="showCity">请选择区域</span>
    <span class="placeTitle" v-else @click="showCity">已选择：{{city}}（点击改变）</span>
    <div v-if="location" class="cityPickerBox">
      <div class="mask"></div>
      <van-area class="cityPicker" :area-list="areaList" @cancel="cityCancel" @confirm="cityConfirm" />
    </div>
    <!-- <location v-on:changeCity="changeCity" v-if="location"  v-on:back="back"/> -->
    <cube-scroll class="listView">
      <list-view :shopData="shopData" @select="selectShop" :isShowLoadMore="false"></list-view>
    </cube-scroll>
  </div>
</template>

<script>
  import { Area, Toast } from 'vant';
  import location from '../../home/pages/location'
  import listView from './listView'
  import areaList from '../../my/components/data/area.json'
  
  export default {
    data() {
      return {
        location: false,
        areaList: areaList,
        city: '',
        shopData: []
      };
    },

    components: {
      location,
      listView,
      [Area.name]: Area,
      [Toast.name]: Toast
    },
    methods: {
      changeCity(data) {
        console.log(data);
        this.city = data;
        this.searchShop(data);
        this.location = false;
      },
      back() {
        this.location = false;
      },
      showCity() {
        this.location = true;
      },
      cityConfirm(data){
        let that = this;
        console.log(data);
        data[0].code == "-1" || data[1].code == "-1" || data[2].code == "-1" ? that.$toast("请选择区域!") : that.dealCity(data);
      },
      dealCity(data){
        this.location = false;
        let province = data[0].name;
        let city = data[1].name;
        let county = data[2].name;
        let cityObj = {
          province: province,
          city: city,
          county: county
        }
        
        this.city = province + " " + city + " " + county;
        this.searchShop(cityObj);
      },
      cityCancel(){
        this.location = false;
      },
      async searchShop(city) {
        let req = {
          collection: "Shop",
          findType: "find",
          // addressInfo: {
          //   province: {$regex: [city.province]},
          //   city: {$regex: [city.city]},
          //   district: {$regex: [city.county]}
          // }
          address: {
            $regex: [city.county]
          },
          limit: 0
        }
        Toast.loading({
          duration: 0,
          message: '加载中...'
        });
        let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
        // this.shopData = res.data;

        res.data.map((item) => {
          let dis = this.getDistance(item);
          item = Object.assign({}, item, {distance: dis});
          if(item.qualificationState == "正常"){
            this.shopData.push(item);
          }
        });
          
        //排序 ， 距离
        this.shopData = this.shopData.sort(compare("distance"));
        console.log(this.shopData);
        

        function compare(property){
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
          }
        }
          
        Toast.clear();
      },
      selectShop: function (shop) {
        console.log(shop);
        let shopId = shop._id;
        if (shopId) {
          this.$router.push({
            // path: `/shop/${shop._id}`,
            path: `/theShopDes/${shop._id}`,
            params: {
              id: shopId
            }
          })
        }
      },
      getDistance: function(data){
        if(data.position){
          let lng = localStorage.getItem('lng');
          let lat = localStorage.getItem('lat');
          if(data.position.lat == "" || data.position.lng == ""){
            return 999999
          }else{
            return parseInt(this.getGreatCircleDistance(data.position.lat, data.position.lng, lat, lng))
          }
        }else{
          return 999999
        }
        
      },
    }
  }

</script>

<style scoped>
  .placeSearch {
    width: 100%;
    height: 100%;
  }

  .placeSearch .placeTitle {
    display: inline-block;
    margin-left: 15px;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 3px;
    background: #0084fd;
    color: #fff;
  }

  .listView {
    padding: 10px 0;
  }
  .cityPickerBox .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: #999;
    opacity: 0.8
  }
  .cityPicker{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 300;
  }

</style>
