<template>
  <div class="listView" ref="listView">
    <!-- <cube-scroll 
            class="ordersScroll" 
            :options="options" 
            :data="shopData" 
            ref="scroll" 
            @pulling-down="onPullingDown"
            @pulling-up="loadMore">
    <div> -->
    <div v-if="shopData.length"
      class="shopMain"
      @click="selectItem(item)"
      v-for="(item,i) in shopData"
      :key="i"
    >
      <div class="shopMainImg">
        <img v-lazy="item.cover" alt="">
      </div>
      <div class="shopMainContent">
        <h3>{{item.name}}</h3>
        <p>
          <span>评分{{item.score}}</span>
          <span>成交{{item.serviceFinishCount}}单</span>
        </p>
        <p>均价￥{{item.price}}</p>
      </div>
      <div class="shopMainOther">
        <div class="more"><sicon name="more" scale="1.5"></sicon></div>
        <div class="shopMainOtherInfo">
          <span v-if="distances">{{item.serviceFinishTime}}分钟 | {{distances[i]}}</span>
        </div>
        <div class="shopMainOtherType">
          <span>上门服务</span>
        </div>
      </div>
    </div>
    <div class="loadMore">
      <van-button v-show="showMore" @click="loadMore">点击加载更多</van-button>
      <p>{{moreText}}</p>
    </div>
    <!-- </div>
    </cube-scroll> -->
  </div>
</template>

<script>
  import { Button } from 'vant';
  import {getShopListSort} from '../api';
  export default {
    name: 'listView',
    data() {
      return {
        showMore: false,
        nowData: 0,
        moreText: "",
        options: {
          pullDownRefresh: {
            threshold: 90,
            stop: 40,
            txt: '刷新成功'
          },
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: 'Load more',
              noMore: '没有更多了'
            }
          }
        },
        distances:""
      }
    },
    props: {
      shopData: {
        type: Array,
        default: []
      },
      reqData: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    watch: {
      shopData: function (val) {
        if(val){
          this.showMore = true;
          this.moreText = "";
        }
        this.getDistance(val);
      }
    },
    components: {
      [Button.name]: Button
    },
    methods: {
      selectItem: function (item) {
        this.$emit("select", item);
      },
      loadMore: function () {
        this.showMore = false;
        this.nowData += this.shopData.length;
        //ajax请求
        console.log(this.reqData);
        let more = {
          skip: this.nowData
        };
        let req = Object.assign(this.reqData,more);
        console.log(req);
        getShopListSort(req).then(res => {
          console.log(res.data);
          if(res.data.length === 0){
            this.moreText = "没有更多了"
          }else {
            this.shopData.push(...res.data);
            this.showMore = true;
          }
        }, err => {
          console.log(err);
        })
      },
      onPullingDown: function() {
        setTimeout(() => {
          this.$refs.ordersList.forceUpdate()
        }, 1000)
      },
      getDistance: function(data){
        let that = this;
        let lng = localStorage.getItem('lng');
        let lat = localStorage.getItem('lat');
        this.distances = data.map(function (val) {
          if(val.position){
            let dis = parseInt(that.getGreatCircleDistance(val.position.lat, val.position.lng, lat, lng));
            if(dis >= 1000){
              if(dis >= 9999999){
                dis = "太远啦"
              }else{
                dis = parseInt(dis/1000);
                dis = `${dis}km`;
              }
            }else{
              dis = `${dis}m`;
            }
            return dis;
          }else{
            return "";
          }
        })
      }
    }
  };
</script>

<style scoped>
  /* .listView{
    height: 100vh;
  }
  .listView .ordersScroll{
    height: 100%;
  } */
  .listView .shopMain{
    width: auto;
    height: 60px;
    padding: 0 10px 20px 10px;
    display: flex;
  }
  .listView .shopMain > div{
    display: inline-block;
  }
  .listView .shopMain .shopMainImg{
    flex: 1;
    padding-right: 10px;
  }
  .listView .shopMain .shopMainImg img{
    width: 100%;
    height: 100%;
  }
  .listView .shopMain .shopMainContent{
    flex: 1.5;
    height: 100%;
  }
  .listView .shopMain .shopMainContent h3{
    font-size: 15px;
    height: 20px;
    line-height: 20px;
  }
  .listView .shopMain .shopMainContent p, .shopDes .shopMain .shopMainContent p{
    height: 20px;
  }
  .listView .shopMain .shopMainContent p, .shopDes .shopMain .shopMainContent span{
    font-size: 12px;
    line-height: 28px;
    color: #575757;
  }
  .listView .shopMain .shopMainContent span{
    margin-right: 10px;
  }
  .listView .shopMain .shopMainOther{
    flex: 1;
  }
  .listView .shopMain .shopMainOther > div{
    height: 20px;
    font-size: 12px;
    text-align: right;
    color: #575757;
  }
  .listView .shopMain .shopMainOther > div.more{
  }
  .listView .shopMain .shopMainOther > div.shopMainOtherInfo span{
    line-height: 28px;
  }
  .listView .shopMain .shopMainOther > div.shopMainOtherType span{
    line-height: 28px;
    color: #eea17a;
  }

  .loadMore{
    width: auto;
    text-align: center;
  }
  .loadMore button{
    width: 60vw;
  }
</style>
