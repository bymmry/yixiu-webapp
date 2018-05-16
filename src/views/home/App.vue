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
          <span>翼修商户</span>
        </h3>
      </div>
      <shop-list ref="shopList" v-on:showFliterBox="showFliterBox" v-on:showPlaceSearch="showPlaceSearch" :filterDataPar="filterData"></shop-list>
      <div class="space"></div>
      <div id="allmap"></div>
      </cube-scroll>

      <!-- 筛选弹出层 -->
      <cube-popup type="my-popup" ref="fliterBox" class="fliterBox">
        
        <div class="filter">
          <div class="close" @click="closeFilterBox">
            <sicon name="close" scale="1.7"></sicon>
          </div>
              <div class="list"><van-checkbox v-model="filterData.score">评分最高</van-checkbox></div>
              <div class="list"><van-checkbox v-model="filterData.serviceFinishTime">速度最快</van-checkbox></div>
              <!-- <div class="list"><van-checkbox v-model="filterData.serviceFinishCount">修的最好</van-checkbox></div> -->
              <!-- <div class="list"><van-checkbox v-model="filterData.price">价格最低</van-checkbox></div> -->
              <div class="list"><van-checkbox v-model="filterData.distance">距离最近</van-checkbox></div>
              <div class="list"><van-checkbox v-model="filterData.pv">浏览量最高</van-checkbox></div>
              <div>
                <van-cell-group>
                  <van-cell><van-radio v-model="radio" name="1">上门维修</van-radio></van-cell>
                  <van-cell><van-radio v-model="radio" name="2">自行到店</van-radio></van-cell>
                  <van-cell><van-radio v-model="radio" name="3">线上快递</van-radio></van-cell>
                </van-cell-group>
              </div>
              <van-button @click="sureFliter">确定</van-button>

            </div>
      </cube-popup>
      
      <!-- 区域搜索弹出层 -->
      <cube-popup type="my-popup" ref="placeSearch">
        <div class="placeSearch">
          <div class="close" @click="closePlaceSearch">
            <span>区域搜索</span>
            <sicon name="close" scale="1.7"></sicon>
          </div>
          <place-search></place-search>
        </div>
        
      </cube-popup>
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
  import { PullRefresh, Checkbox, CheckboxGroup, Button, Radio, Cell, CellGroup } from 'vant'
  import location from './pages/location.vue'
  import scroll from '../common/base/scroll'
  import wx from "weixin-js-sdk";
  import placeSearch from '../common/components/placeSearch'

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
      placeSearch,
      [PullRefresh.name]: PullRefresh,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Button.name]: Button,
      [Radio.name]: Radio,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
    },
    data () {
      return {
        isLoading: false,
        sessionPaySuccess: 0,
        activate: true,
        location: false,
        city: '',
        filterData: {
          score: true, //评分
          serviceFinishTime: true, //速度
          serviceFinishCount: true, //修好数量
          price: true, //价格
          distance: true,//距离
          pv: true,//浏览量
        },
        radio: 1
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
            // alert('所在城市:' + JSON.stringify(r.address));
            // alert('经纬度' + r.point.lng + r.point.lat)
          }
          else {
            // alert('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true})  

        // navigator.geolocation.getCurrentPosition(function (position) {

        //   //得到html5定位结果
        //   var x = position.coords.longitude;
        //   var y = position.coords.latitude;

        //   alert(x+" "+y)
        //   // //由于html5定位的结果是国际标准gps，所以from=1，to=5
        //   // //下面的代码并非实际是这样，这里只是提供一个思路
        //   // BMap.convgps(x, y, 1, 5, function (convRst) {
        //   //     var point = new BMap.Point(convRst.x, convRst.y);

        //   //     //这个部分和上面的代码是一样的
        //   //     var marker = new BMap.Marker(point);
        //   //     map.addOverlay(marker);
        //   //     map.panTo(point);
        //   // })

        // })
      },
      showFliterBox(){
        console.log("showFliterBox");
        let fliterBox = this.$refs.fliterBox;
        fliterBox.show();
      },
      closeFilterBox(){
        let fliterBox = this.$refs.fliterBox;
        fliterBox.hide();
      },
      sureFliter(){
        let fliterBox = this.$refs.fliterBox;
        fliterBox.hide();

        let lng = localStorage.getItem('lng');
        let lat = localStorage.getItem('lat');
        let filterShop = {
          score: BooleanToNum(this.filterData.score), //评分
          serviceFinishTime: BooleanToNum(this.filterData.serviceFinishTime), //速度
          serviceFinishCount: BooleanToNum(this.filterData.serviceFinishCount), //修好数量
          price: BooleanToNum(this.filterData.price), //价格
          distance: BooleanToNum(this.filterData.distance),//距离
          pv: BooleanToNum(this.filterData.pv),//浏览量
          name: "",//商家名称
          categoryName: "",//服务分类名称
          serviceName: "",//服务名称
          position: {
            lng: lng,
            lat: lat
          },//用户定位信息的经纬度
          limit: 20,//一次获取列表的条数,系统默认为10
          skip: 0//跳过几个数据,系统默认为0
        };

        this.$refs.shopList.childFilter(filterShop);
        function BooleanToNum(bool) {
          return bool ? 1: -1;
        }
      },
      showPlaceSearch(show){
        console.log(show);
        if(show){
          let placeSearch = this.$refs.placeSearch;
          placeSearch.show();
        }
      },
      closePlaceSearch(){
        let placeSearch = this.$refs.placeSearch;
        placeSearch.hide();
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

  .filter{
    width: 100vw;
    height: 44vh;
    background-color: #fff;
    /* height: auto; */
  }
  .filter .close{
    width: auto;
    height: 30px;
    line-height: 30px;
    text-align: right;
    margin-right: 15px;
  }
  
  .filter > div.list{
    width: 35vw;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    padding: 0 5vw;
  }
  .filter > div.button{
    width: auto;
  }
  .filter button{
    float: right;
    width: 60vw;
    margin: 2vh 5vw;
    background-color: #f85;
    color: #fff;
  }
  .placeSearch{
    bottom: 0;
    width: 100vw;
    height: 85vh;
    border-radius: 5px;
    background: #fff;
  }
  .placeSearch .close{
    width: auto;
    height: 30px;
    line-height: 30px;
    padding: 10px;
  }
  .placeSearch .close svg{
    float: right;
    margin-top: 7px;
  }
</style>
