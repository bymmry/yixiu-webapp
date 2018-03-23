<template>
  <transition name="slide">
    <div class="shopDetail" ref="shopDetail">
      <div class="shopTitle">
        <div class="back" @click="back"><sicon name="back" scale="1.5"></sicon><span>返回</span></div>
        <div class="shopName">
          <h2>{{shopInfo.name}}</h2>
        </div>
        <div class="more"><sicon name="more" scale="1.5"></sicon></div>
      </div>
      <div class="shopDes">
        <div class="shopMain">
          <div class="shopMainImg">
            <img :src="shopInfo.cover" alt="">
          </div>
          <div class="shopMainContent">
            <p><span><b>营业时间：</b>每日{{shopInfo.businessHours[0]}}{{shopInfo.businessHours[1]}}</span></p>
            <p>
              <span>
                <b>联系方式：</b>
                <a :href="telContactNumber">{{shopInfo.contactNumber}}</a>
              </span>
            </p>
            <p><span><b>服务方式：</b></span></p>
            <p><span><span v-for="(ser,i) in serviceWays" :key="i">{{ser}} </span></span></p>
            <!-- <p><span>店铺地址：</span></p> -->
          </div>
        </div>
        <p class="address"><span><b>店铺地址：</b>{{shopInfo.address}}</span></p>
      </div>
      <div class="steps">
        <van-steps :active="active" active-color="#fb8e53">
          <van-step>选择品牌</van-step>
          <van-step>选择型号</van-step>
          <van-step>选择颜色</van-step>
          <van-step>选择问题</van-step>
          <van-step>下单</van-step>
        </van-steps>
      </div>
      <div class="stepsContent">
        <choose-brand :class="{'isShowStep': active !== 0}" v-on:returnBrand="getBrand"></choose-brand>
        <choose-model :class="{'isShowStep': active !== 1}"
                      :brand="chooseInfo.brand.data"
                      v-if="chooseInfo.brand.val"
                      v-on:goBackPrevStep="prevStep"
                      v-on:returnModel="getModel"
        ></choose-model>
        <choose-color :class="{'isShowStep': active !== 2}"
                      :model="chooseInfo.model.data"
                      v-if="chooseInfo.model.val"
                      v-on:goBackPrevStep="prevStep"
                      v-on:returnColor="getColor"
        ></choose-color>
        <choose-problem :class="{'isShowStep': active !== 3}"
                        :color="chooseInfo.color.data"
                        :phoneModel="chooseInfo.model.data._id"
                        v-if="chooseInfo.color.val"
                        v-on:goBackPrevStep="prevStep"
                        v-on:returnProblem="getProblem"
        ></choose-problem>
        <choose-infos :class="{'isShowStep': active !== 4}"
                      :chooseData="chooseInfo"
                      :TotalFee="TotalFee"
                      :serverList="serverList"
                      :serverId="serverId"
                      :serviceWay="shopInfo.serviceWay"
                      v-if="chooseInfo.problem.val"
                      v-on:goBackPrevStep="prevStep"
        ></choose-infos>
      </div>
    </div>
  </transition>
</template>

<script>
  import { Step, Steps } from 'vant';
  import chooseBrand from './shopDetails/chooseBrand'
  import chooseModel from './shopDetails/chooseModel'
  import chooseColor from './shopDetails/chooseColor'
  import chooseProblem from './shopDetails/chooseProblem'
  import chooseInfos from './shopDetails/chooseInfos'
  import { getShopData } from '../api'

  export default {
    name: 'shop-detail',
    components: {
      [Steps.name]: Steps,
      [Step.name]: Step,
      chooseBrand,
      chooseModel,
      chooseColor,
      chooseProblem,
      chooseInfos
    },
    data() {
      return {
        active: 0,
        chooseInfo: {
          brand: {
            val: "",
            data: {}
          },
          model: {
            val: "",
            data: {}
          },
          color: {
            val: "",
            data: {}
          },
          problem: {
            val: "",
            data: {}
          },
        },
        TotalFee: 0,
        serverList: "",
        serverId: "",
        shopInfo: {},
        lastChooseInfo: {},
        serviceWays: [],
        telContactNumber: ""
      }
    },
    watch: {
      TotalFee: function (val) {
        return val;
      },
      serverList: function (val) {
        return val;
      },
      serverId: function (val) {
        return val;
      }
    },
    created() {
      let shopId = this.$route.params.id;
      if (!shopId) {
        this.$router.push('/home');
        return
      }
      if(shopId){
        getShopData(shopId).then((res) => {
          console.log(res);
          if (!res.data._id) {
            this.$router.push('/home');
            return
          }
          if(res.code === 200){
            this.shopInfo = res.data;
            this.telContactNumber = `tel:${this.shopInfo.contactNumber}`;
            this.serviceWays = this.shopInfo.serviceWay;
            console.log(...this.serviceWays)
          }
        }, function (err) {
          console.log(err);
        })
      }
    },
    mounted() {

      let y =document.body.clientHeight;
      console.log(this.$refs.shopDetail);
      this.$refs.shopDetail.style.height = y + 'px';
      this.$refs.shopDetail.style.overflowY = 'scroll';
    },
    methods: {
      back: function () {
        this.$router.back();
      },
      getBrand: function (brand) {
        if(brand){
          this.chooseInfo.brand.val = brand.name;
          this.chooseInfo.brand.data = brand;
          this.nextStep();
        }
      },
      getModel: function (model) {
        if(model){
          this.chooseInfo.model.val = model.name;
          this.chooseInfo.model.data = model;
          this.nextStep();
        }
      },
      getColor: function (color) {
        if(color){
          this.chooseInfo.color.val = color;
          this.chooseInfo.color.data = color;

          this.nextStep();
        }
      },
      getProblem: function (problem) {
        if(problem){
          this.chooseInfo.problem.data = problem;
          this.chooseInfo.problem.val = problem.TotalFee;
          this.TotalFee = problem.TotalFee;
          let pro = problem.map(function (val) {
            return val.name;
          });
          this.serverList = pro.join("/");
          this.serverId = [];
          this.serverId = problem.map(function (val) {
            return val._id;
          });
          this.nextStep();
        }
      },
      prevStep: function (ret) {
        if (ret){
          if (this.active>0){
            this.active--;
          }
        }
      },
      nextStep: function () {
        this.active++;
        if(this.active === 4){
          console.log("last step");
          console.log(this.chooseInfo);
          this.lastChooseInfo = this.chooseInfo
        }
      }
    }
  };
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .shopDetail{
    position: fixed;
    top: 0;
    min-height: 530px;
    overflow-y: scroll;
    bottom: 8vh;
    width: 100%;
    z-index: 10;
    background-color: #fff;
  }
  .shopDetail .shopTitle{
    display: flex;
    width: auto;
    padding: 0 10px;
    height: 10vh;
    min-height: 58px;
  }
  .shopDetail .shopTitle > div{
    line-height: 10vh;
  }
  .shopDetail .shopTitle > div.back{
    flex: 1;
    font-size: 13px;
    color: #535456;
  }
  .shopDetail .shopTitle > div.back svg,   .shopDetail .shopTitle > div.back span{
    vertical-align: middle;
  }
  .shopDetail .shopTitle > div.shopName{
    flex: 2;
    text-align: center;
  }
  .shopDetail .shopTitle > div.shopName > h2{
    font-size: 15px;
    color: #aeaeae;
  }
  .shopDetail .shopTitle > div.more{
    flex: 1;
    text-align: right;
  }

  .shopDetail .shopDes .shopMain{
    width: auto;
    height: 14vh;
    min-height: 100px;
    padding: 0 10px;
    display: flex;
  }
  .shopDetail .shopDes .shopMain .shopMainImg{
    flex: 3;
    padding-right: 10px;
  }
  .shopDetail .shopDes .shopMain .shopMainImg img{
    width: 100%;
    height: 100%;
  }
  .shopDetail .shopDes .shopMain .shopMainContent{
    flex: 4;
    height: 100%;
  }
  .shopDetail .shopDes .shopMain .shopMainContent p{
    height: 25%;
    font-size: 13px;
  }
 .shopDetail .shopDes p.address{
    width: auto;
    font-size: 13px;
    padding: 5px 10px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  span > b{
    color: #f85;
  }

  .shopDetail  .steps{
    width: auto;
    height: auto;
    padding-top: 2vh;
  }
  .shopDetail .stepsContent{
    width: auto;
    height: auto;
  }
  .isShowStep{
    display: none;
  }
</style>
