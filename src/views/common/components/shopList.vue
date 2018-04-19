<template>
  <div class="shopList">
    <Search @sendShopList="sendShopList"  />

    <cube-scroll class="scroll" :data="shopData">
    <div class="shopSort">
      <ul ref="shopSort">
        <!-- <li @click="chooseMainType(0)" ref="shopSortItem" :class="{'active': currentIndex===0}"><span>{{nowColumnsType}}<sicon name="choose" scale="2"></sicon></span>
          <van-actionsheet v-model="isShowShopSort"
                           :actions="actions"
                           :close-on-click-overlay="isOverlayClose"
                           cancel-text="取消" />
        </li> -->
        <li @click="chooseMainType(0)" :class="{'active': currentIndex===0}"><span>综合排序</span></li>
        <li @click="chooseMainType(1)" :class="{'active': currentIndex===1}"><span>评分最高</span></li>
        <li @click="chooseMainType(2)" :class="{'active': currentIndex===2}"><span>距离最近</span></li>
        <li @click="chooseMainType(3)" :class="{'active': currentIndex===3}"><span>筛选<sicon name="screen" scale="1.5"></sicon></span>
         
        </li>
      </ul>
    </div>
    <div @click="selectShop"
         class="shopDes"
         ref="shopDes">
      <list-view @select="selectShop" :shopData="shopData" :reqData="reqData" :shopNum="shopNum"></list-view>
    </div>
    <div class="space"></div>
    </cube-scroll>
     <van-popup
            v-model="showFilter"
            position="top"
            :close-on-click-overlay=false
            class="filterBox"
          >
            <div class="filter">
              <div class="list"><van-checkbox v-model="filterData.score">评分最高</van-checkbox></div>
              <div class="list"><van-checkbox v-model="filterData.serviceFinishTime">速度最快</van-checkbox></div>
              <!-- <div class="list"><van-checkbox v-model="filterData.serviceFinishCount">修的最好</van-checkbox></div> -->
              <!-- <div class="list"><van-checkbox v-model="filterData.price">价格最低</van-checkbox></div> -->
              <div class="list"><van-checkbox v-model="filterData.distance">距离最近</van-checkbox></div>
              <div class="list"><van-checkbox v-model="filterData.pv">浏览量最高</van-checkbox></div>
              <div>
                <van-cell-group @click.stop="chooseMainType">
                  <van-cell><van-radio v-model="radio" name="1">上门维修</van-radio></van-cell>
                  <van-cell><van-radio v-model="radio" name="2">自行到店</van-radio></van-cell>
                  <van-cell><van-radio v-model="radio" name="3">线上快递</van-radio></van-cell>
                </van-cell-group>
              </div>
              <van-button @click="sureFliter">确定</van-button>
            </div>
          </van-popup>
  </div>
</template>

<script>
  import { Toast, Actionsheet, Popup, Picker, Checkbox, CheckboxGroup, Button, Radio, Cell, CellGroup } from 'vant';
  import  Search from './search.vue';
  import Scroll from '../base/scroll';
  import { getShopList, getShopListSort } from '../api';
  import listView from "./listView"

  export default {
    name: 'shop-list',
    components: {
      [Toast.name]: Toast,
      [Actionsheet.name]:Actionsheet,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Radio.name]: Radio,
      Scroll,
      listView,
      Search
    },
    props: {
      searchData: {
        type: Array,
        default: null
      },
    },
    data() {
      return {
        shopData: [],
        shopNum: 0,
        actions: [
          {
            name: '综合排序',
            id: 0,
            callback: this.chooseSort
          },
          {
            name: '评分最高',
            id: 1,
            callback: this.chooseSort
          },
          {
            name: '速度最快',
            id: 2,
            callback: this.chooseSort
          },
          {
            name: '价格最低',
            id: 3,
            callback: this.chooseSort
          }
        ],
        currentIndex: 0,
        isShowShopSort: false,
        nowColumnsType: '综合排序',
        isOverlayClose: false,
        piker: {
          columnsTypes: ['综合排序','评分最高','速度最快','价格最低'],
          itemHeight: 40,
          visibleItemCount: 4
        },
        showFilter: false,
        checked: true,
        filterData: {
          score: true, //评分
          serviceFinishTime: true, //速度
          serviceFinishCount: true, //修好数量
          price: true, //价格
          distance: true,//距离
          pv: true,//浏览量
        },
        radio: 1,
        reqData: {},
      }
    },
    created() {
      let url = decodeURIComponent(window.location.href).split("?");
      Toast.loading({
        duration: 0,
        message: '加载中...'
      });
      if (url.length === 2){
        const categoryName = url[1];
        console.log(categoryName);
        let req = {
          categoryName: categoryName
        };
        this.getShopList(req);
      }else {
        getShopList().then((res) => {
          if(res.code === 200){
            this.shopData = res.data;
            Toast.clear();
            if (this.searchData === null){
              console.log("searchData is null")
            }else {
              console.log(this.searchData);
              this.shopData = this.searchData;
            }
          }
        }, function (err) {
          console.log(err);
        });
      }
    },
    methods: {
      chooseMainType: function (index) {
        this.shopNum = 0;
        let filterShop = {};
        this.currentIndex = index;
        if (index === 0){ //综合排序
          // this.chooseType();
          // return;
        }else if(index ===3 ){ //筛选
          this.filterShop();
          return;
        }else if(index === 1){ //修的最好
          filterShop = {
            serviceFinishCount: 1
          }
        }else if(index === 2){ //julizuijin
          filterShop = {
            distance: 1
          }
        }
        Toast.loading({
          duration: 0,
          message: '加载中...'
        });
        this.getShopList(filterShop);
      },
      chooseType: function () {
        if(this.isShowShopSort){
          this.isShowShopSort = !this.isShowShopSort;
        }else {
          this.isShowShopSort = true;
        }

      },
      chooseSort: function (item) {
        console.log(item);
        this.nowColumnsType = item.name;
        this.isShowShopSort = !this.isShowShopSort;
        let req = {};
        switch (item.id){
          case 0:
            req = {
              score: -1,//评分
              serviceFinishTime: 1,//完成时间/(速度)
              serviceFinishCount: 1,//修好数量
              price: 1//均价
            };
            break;
          case 1:
            req = {
              score: -1,//评分
            };
            break;
          case 2:
            req = {
              serviceFinishTime: 1,//完成时间/(速度)
            };
            break;
          case 3:
            req = {
              price: 1//均价
            };
            break;
        }
        this.getShopList(req);
      },
      selectShop: function (shop) {
        console.log(shop);
        let shopId = shop._id;
        if(shopId){
          this.$router.push({
            // path: `/shop/${shop._id}`,
            path: `/theShopDes/${shop._id}`,
            params: {
              id: shopId
            }
          })
        }
      },
      sendShopList (list) {
        this.shopData = list;
      },
      filterShop: function () {
        this.showFilter = true;
      },
      sureFliter: function () {
        this.showFilter = false;
        this.currentIndex = 3;
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
          limit: 10,//一次获取列表的条数,系统默认为10
          skip: 0//跳过几个数据,系统默认为0
        };

        this.getShopList(filterShop);
        function BooleanToNum(bool) {
          return bool ? 1: -1;
        }
      },
      getShopList: function (req) {
        Toast.loading({
          duration: 0,
          message: '加载中...'
        });
        this.reqData = "";
        this.reqData = req;
        getShopListSort(req).then((res) => { //综合排序请求数据
          this.shopData = [];
          res.data.map((item) => {
            let dis = this.getDistance(item);
            item = Object.assign({}, item, {distance: dis});
            if(item.qualification){
              this.shopData.push(item);
            }
          });
          
          //排序 ， 距离
          if(req.distance == 1){
            console.log(this.shopData);
            this.shopData = this.shopData.sort(compare("distance"));
            console.log(this.shopData);
            

            function compare(property){
              return function(a,b){
                let value1 = a[property];
                let value2 = b[property];
                return value1 - value2;
              }
            }
          }
          
          Toast.clear();
        }, err => {
          console.log(err);
        });
        // Toast.clear();
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
        
      }
    }
  };
</script>

<style scoped>
  .scroll{
    width: 100%;
    height: 81vh;
  }

  .shopList .shopSort{
    width: 100%;
    height: 7vh;
    min-height: 40px;
    line-height: 50px;
    font-size: 13px;
  }
  .shopList .shopSort ul{
    width: 100%;
    height: 100%;
    display: flex;
    color: #191919;
  }
  .shopList .shopSort ul li{
    flex: 1;
  }
  .shopList .shopSort ul li span{
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .shopList .shopSort ul li span svg{
    vertical-align: middle;
  }

  .shopList .shopSort ul li.active{
    color: #eea17a;
  }

  .space {
    width: 100%;
    height: 8vh;
  }

  .filterBox{
    width: 100vw;
    padding-top: 5vh;
  }
  .filter{
    width: 100vw;
    background-color: #fff;
    height: auto;
  }
  .filter > div.list{
    width: 35vw;
    display: inline-block;
    padding: 10px 5vw;
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

</style>
