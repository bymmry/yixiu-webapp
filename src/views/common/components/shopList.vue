<template>
  <div class="shopList">
    <Search @sendShopList="sendShopList"  />
    <div class="shopTitle">
      <h3><sicon name="home" scale="1.6"></sicon><span>附近维修店</span></h3>
    </div>
    <div class="shopSort">
      <ul ref="shopSort">
        <li @click="chooseMainType(0)" ref="shopSortItem" :class="{'active': currentIndex===0}"><span>{{nowColumnsType}}<sicon name="choose" scale="2"></sicon></span>
          <van-actionsheet v-model="isShowShopSort"
                           :actions="actions"
                           :close-on-click-overlay="isOverlayClose"
                           cancel-text="取消" />
        </li>
        <li @click="chooseMainType(1)" :class="{'active': currentIndex===1}"><span>修的最好</span></li>
        <li @click="chooseMainType(2)" :class="{'active': currentIndex===2}"><span>距离最近</span></li>
        <li @click="chooseMainType(3)" :class="{'active': currentIndex===3}"><span>筛选<sicon name="screen" scale="1.5"></sicon></span></li>
      </ul>
    </div>
    <div @click="selectShop"
         class="shopDes"
         ref="shopDes">
      <list-view @select="selectShop" :shopData="shopData"></list-view>
    </div>
    <div class="space"></div>
  </div>
</template>

<script>
  import { Actionsheet, Popup, Picker } from 'vant';
  import  Search from './search.vue';
  import Scroll from '../base/scroll';
  import { getShopList, getShopListSort } from '../api';
  import listView from "./listView"

  export default {
    name: 'shop-list',
    components: {
      [Actionsheet.name]:Actionsheet,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
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
        actions: [
          {
            name: '综合排序',
            callback: this.chooseSort
          },
          {
            name: '评分最高',
            callback: this.chooseSort
          },
          {
            name: '速度最快',
            callback: this.chooseSort
          },
          {
            name: '价格最低',
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
      }
    },
    created() {
      getShopList().then((res) => {
        if(res.code === 200){
          this.shopData = res.data;
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
    },
    methods: {
      chooseMainType: function (index) {
        this.currentIndex = index;
        if (index === 0){ //综合排序
          this.chooseType();
        }else {
          getShopListSort(index).then((res) => {
            console.log(res);
          });
        }



      },
      chooseType: function () {
        if(this.isShowShopSort){
          this.isShowShopSort = !this.isShowShopSort;
        }else {
          this.isShowShopSort = true;
        }
      },
      chooseSort: function (item) {
        this.nowColumnsType = item.name;
        this.isShowShopSort = !this.isShowShopSort;

        getShopListSort(this.nowColumnsType).then((res) => { //综合排序请求数据
          console.log(res);
        });
      },
      selectShop: function (shop) {
        console.log(shop);
        let shopId = shop._id;
        if(shopId){
          this.$router.push({
            path: `/shop/${shop._id}`,
            params: {
              id: shopId
            }
          })
        }
      },
      sendShopList (...list) {
        this.shopData = list;
      }
    }
  };
</script>

<style scoped>
  .shopList{
    width: 100%;
    height: auto;
  }
  .shopList .shopTitle{
    width: auto;
    height: 5vh;
  }
  .shopList .shopTitle h3{
    width: auto;
    text-align: center;
  }
  .shopList .shopTitle h3 svg{
    color: #eea17a;
    margin-right: 2px;
  }
  .shopList .shopTitle h3 svg,  .shopList .shopTitle h3 span{
    vertical-align: middle;
    display: inline-block;
    line-height: 5vh;
    font-size: 13px;
  }
  .shopList .shopSort{
    width: 100%;
    height: 7vh;
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

</style>
