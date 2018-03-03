<template>
  <div class="shopList">
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
    <scroll :data="shopData" class="shopDes" ref="shopDes">
      <div @click="selectShop" class="shopMain">
        <div class="shopMainImg">
          <img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/shopImg.png " alt="">
        </div>
        <div class="shopMainContent">
          <h3>翼修旗舰店</h3>
          <p>
            <span>评分4.9</span>
            <span>修好189单</span>
          </p>
          <p>均价￥199</p>
        </div>
        <div class="shopMainOther">
          <div class="more"><sicon name="more" scale="1.5"></sicon></div>
          <div class="shopMainOtherInfo">
            <span>45分钟 | 633米</span>
          </div>
          <div class="shopMainOtherType">
            <span>上门服务</span>
          </div>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import { Actionsheet, Popup, Picker } from 'vant';
  import Scroll from '../base/scroll';

  export default {
    name: 'shop-list',
    components: {
      [Actionsheet.name]:Actionsheet,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      Scroll
    },
    data() {
      return {
        shopData: [{
          shopOne:{
            id: 0,
            name: "213"
          }
        }],
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
    methods: {
      chooseMainType: function (index) {
        this.currentIndex = index;
        if (index === 0){
          this.chooseType();
        }
        console.log();
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
      },
      selectShop: function () {
        this.$router.push({
          path: `/shopList/1`
        })
      }
    }
  };
</script>

<style scoped>
  .shopList{
    width: 100%;
    height: auto;
  }
  .shopList .shopSort{
    width: 100%;
    height: 10vh;
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


  .shopDes{
    width: 100%;
    height: 82vh;
  }
  .shopDes .shopMain{
    width: auto;
    height: 60px;
    padding: 10px 10px;
    display: flex;
  }
  .shopDes .shopMain > div{
    display: inline-block;
  }
  .shopDes .shopMain .shopMainImg{
    flex: 1;
    padding-right: 10px;
  }
  .shopDes .shopMain .shopMainImg img{
    width: 100%;
    height: 100%;
  }
  .shopDes .shopMain .shopMainContent{
    flex: 1.5;
    height: 100%;
  }
  .shopDes .shopMain .shopMainContent h3{
    font-size: 15px;
    height: 20px;
    line-height: 20px;
  }
  .shopDes .shopMain .shopMainContent p, .shopDes .shopMain .shopMainContent p{
    height: 20px;
  }
  .shopDes .shopMain .shopMainContent p, .shopDes .shopMain .shopMainContent span{
    font-size: 12px;
    line-height: 28px;
    color: #575757;
  }
  .shopDes .shopMain .shopMainContent span{
    margin-right: 10px;
  }
  .shopDes .shopMain .shopMainOther{
    flex: 1;
  }
  .shopDes .shopMain .shopMainOther > div{
    height: 20px;
    font-size: 12px;
    text-align: right;
    color: #575757;
  }
  .shopDes .shopMain .shopMainOther > div.more{
  }
  .shopDes .shopMain .shopMainOther > div.shopMainOtherInfo span{
    line-height: 28px;
  }
  .shopDes .shopMain .shopMainOther > div.shopMainOtherType span{
    line-height: 28px;
    color: #eea17a;
  }

</style>
