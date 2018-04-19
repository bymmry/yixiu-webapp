<template>
  <div class="listView" ref="listView">
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
          <span class="theDistance" v-if="distances">{{distances[i]}}</span>
        </p>
        <p class="shopMainOtherType">
          <!-- <span v-for="(ser,s) in serWays[i]" :key="s">{{ser}}</span> -->
          <span>{{item.address}}</span>
        </p>
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
        distances:"",
        serWays: []
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
      },
      shopNum: Number
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
    activated() {
      this.nowData = 0;
    },
    methods: {
      selectItem: function (item) {
        this.$emit("select", item);
      },
      loadMore: function () {
        this.nowData = this.shopNum;
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
            res.data.map((item) => {
              if(item.qualification){
                this.shopData.push(item);
                
                // this.shopData.push(...res.data);
                this.showMore = true;
              }
            });


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
            if(val.position.lat == "" || val.position.lng == ""){
              return 999999;
            }else{
              let dis = parseInt(that.getGreatCircleDistance(val.position.lat, val.position.lng, lat, lng));
              if(dis >= 1000){
                dis = parseInt(dis/1000);
                dis = `${dis}km`;
              }else{
                dis = `${dis}m`;
              }
              return dis;
            }
            
          }else{
            return 999999;
          }
        });

        this.serWays = data.map(function (val) {
          if(val.serviceWay){
            return val.serviceWay
          }else {
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
    flex: 2;
    padding-right: 10px;
  }
  .listView .shopMain .shopMainImg img{
    width: 100%;
    height: 100%;
  }
  .listView .shopMain .shopMainContent{
    flex: 5;
    height: 100%;
  }
  .listView .shopMain .shopMainContent h3{
    font-size: 15px;
    height: 20px;
    line-height: 20px;
    max-width: 130px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
  /* .listView .shopMain .shopMainOther{
    flex: 1;
  }
  .listView .shopMain .shopMainOther > div{
    height: 20px;
    font-size: 12px;
    text-align: right;
    color: #575757;
  }
  .listView .shopMain .shopMainOther > div.shopMainOtherInfo span{
    line-height: 28px;
  } */
  .listView .shopMain .shopMainContent > p.shopMainOtherType{
    width: 180px;
    position: relative;
    right: 0;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .listView .shopMain .shopMainContent > p.shopMainOtherType span{
    line-height: 28px;
    color: #eea17a;
  }
  .theDistance{
    float: right;
  }

  .loadMore{
    width: auto;
    text-align: center;
  }
  .loadMore button{
    width: 60vw;
  }
</style>
