<template>
  <div>
    <div v-show="!location">
      <div class="header">
        <HomeHeader :city="city"  v-on:listenToChild="showMsg"></HomeHeader>
      </div>
      
      <cube-scroll
          class="homeScroll">
      <div class="homeContent">
      <!-- <van-pull-refresh class="homeContent" v-model="isLoading" @refresh="onRefresh" v-show="!location"> -->
        <Swipe></Swipe>
      <!-- </van-pull-refresh> -->
      </div>
      <Type></Type>
      <HotArea></HotArea>
      <Ticket v-show="false"></Ticket>
      <Activity></Activity>
      <div class="shopTitle">
        <h3>
          <!-- <sicon name="home" scale="1.6"></sicon> -->
          <span>附近维修店</span>
        </h3>
      </div>
      <shop-list></shop-list>
      <div class="space"></div>
      <div id="allmap"></div>
      </cube-scroll>
    </div>
    
   
    <location v-on:changeCity="changeCity" v-if="location"  v-on:back="back"/>
  </div>
</template>

<script>
  import Nav from '../common/components/navigation.vue'
  import HomeHeader from './components/header.vue'
  import Swipe from './components/swipe.vue'
  import Type from './components/type.vue'
  import HotArea from './components/hotArea.vue'
  import Ticket from './components/tickets.vue'
  import Activity from './components/activity.vue'
  import shopList from '../common/components/shopListHome'
  import { PullRefresh } from 'vant'
  import location from './pages/location.vue'
  import scroll from '../common/base/scroll'
  import wx from "weixin-js-sdk";

  export default {
    components: {
      scroll,
      Nav,
      HomeHeader,
      Swipe,
      Type,
      HotArea,
      Ticket,
      Activity,
      shopList,
      location,
      [PullRefresh.name]: PullRefresh
    },
    data () {
      return {
        isLoading: false,
        sessionPaySuccess: 0,
        activate: true,
        location: false,
        city: ''
      }
    },
    mounted () {
      this.initPosition();
    },
    methods: {
      back () {
        this.location = !this.location;
      },
      onRefresh() {
        setTimeout(() => {
          this.prompt('刷新成功', 'success').show();
          this.isLoading = false;
        }, 500);
      },
      changeCity (data) {
        this.city = data;
        this.location = !this.location;
        if (!localStorage.getItem('recentCity')) {
          let recentCity = [this.city];
          localStorage.setItem('recentCity', JSON.stringify(recentCity));
        }else{
          let recentCity = JSON.parse(localStorage.getItem('recentCity'));
        }
        sessionStorage.setItem('nowcity', this.city);
        
      },
      showMsg (data) {
        // console.log(data);
        this.location = !this.location;
      },
      initPosition () {
        /*
        let map = new BMap.Map("allmap");
        let point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,12);

        let _this = this;
        
        let geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            _this.city = r.address.city;
            sessionStorage.setItem('nowcity', _this.city);
            sessionStorage.setItem('nowposition', JSON.stringify(r.address));
            localStorage.setItem('lng', r.point.lng);
            localStorage.setItem('lat', r.point.lat);
            // alert('所在城市:' + r.address.city);
            // alert('经纬度' + r.point.lng + r.point.lat)
          }
          else {
            // alert('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true})  
*/
        var map = new BMap.Map("allmap");
          var point = new BMap.Point(116.331398,39.897445);
          map.centerAndZoom(point,12);

          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              var mk = new BMap.Marker(r.point);
              map.addOverlay(mk);
              map.panTo(r.point);
              alert('您的位置：'+r.point.lng+','+r.point.lat);
            }
            else {
              alert('failed'+this.getStatus());
            }        
          },{enableHighAccuracy: true})
      }
    }
  }
</script>

<style scoped>
  .header{
    width: 100%;
    position: fixed;
    z-index: 99;
    top: 0;
    height: auto;
  }
  .homeScroll{
    width: 100%;
    height: 91vh;
  }
  .homeContent{
    padding-top: 53px;
  }
  .space {
    width: 100%;
    height: 8vh;
  }
  .shopTitle{
    width: auto;
    margin-top: 1vh;
    height: 5vh;
  }
  .shopTitle h3{
    width: auto;
    height: 5vh;
    line-height: 5vh;
    text-align: center;
  }
  .shopTitle h3 span{
    position: relative;
  }
  .shopTitle h3 span::before{
    content: "";
    width: 50px;
    height: 1px;
    border-top: 1px solid #ccc;
    position: absolute;
    left: -60px;
    top: 8px;
  }
  .shopTitle h3 span::after{
    content: "";
    width: 50px;
    height: 1px;
    border-top: 1px solid #ccc;
    position: absolute;
    margin-left: 10px;
    top: 8px;
   }
  .shopTitle h3 svg{
    color: #eea17a;
    margin-right: 2px;
  }
  .shopTitle h3 svg,  .shopList .shopTitle h3 span{
    vertical-align: middle;
    display: inline-block;
    line-height: 5vh;
    font-size: 13px;
  }
</style>
