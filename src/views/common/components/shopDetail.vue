<template>
  <transition name="slide">
    <div class="shopDetail">
      <div class="shopTitle">
        <div class="back" @click="back"><sicon name="back" scale="1.5"></sicon><span>返回</span></div>
        <div class="shopName">
          <h2>翼修旗舰店</h2>
        </div>
        <div class="more"><sicon name="more" scale="1.5"></sicon></div>
      </div>
      <div class="shopDes">
        <div class="shopMain">
          <div class="shopMainImg">
            <img src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/shopImg.png " alt="">
          </div>
          <div class="shopMainContent">
            <p><span>营业时间：{{shopData.shopInfo.time}}</span></p>
            <p><span>联系方式：{{shopData.shopInfo.phone}}</span></p>
            <p><span>服务方式：{{shopData.shopInfo.server}}</span></p>
            <p><span>店铺地址：{{shopData.shopInfo.address}}</span></p>
          </div>
        </div>
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
                      :brand="chooseInfo.brand"
                      v-if="chooseInfo.brand"
                      v-on:goBackPrevStep="prevStep"
                      v-on:returnModel="getModel"
        ></choose-model>
        <choose-color :class="{'isShowStep': active !== 2}"
                      :model="chooseInfo.model"
                      v-if="chooseInfo.model"
                      v-on:goBackPrevStep="prevStep"
                      v-on:returnColor="getColor"
        ></choose-color>
        <choose-problem :class="{'isShowStep': active !== 3}"
                        :color="chooseInfo.color"
                        v-if="chooseInfo.color"
                        v-on:goBackPrevStep="prevStep"
                        v-on:returnProblem="getProblem"
        ></choose-problem>
        <choose-infos :class="{'isShowStep': active !== 4}"
                      :chooseData="chooseInfo"
                      v-if="chooseInfo.problem"
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
    props: {
      shopData: {
        type: Object,
        default: function() {
          return {
            shopInfo: {
              "time": "每日8:00~23:00",
              "phone": "18798767765",
              "server": "上门自修，自行到店",
              "address": ""
            }
          }
        }
      }
    },
    data() {
      return {
        active: 0,
        chooseInfo: {
          brand: "",
          model: "",
          color: "",
          problem: ""
        },
      }
    },
    methods: {
      back: function () {
        this.$router.back();
      },
      getBrand: function (brand) {
        if(brand){
          this.chooseInfo.brand = brand;
          this.nextStep();
        }
      },
      getModel: function (model) {
        if(model){
          this.chooseInfo.model = model;
          this.nextStep();
        }
      },
      getColor: function (color) {
        if(color){
          this.chooseInfo.color = color;
          this.nextStep();
        }
      },
      getProblem: function (problem) {
        if(problem){
          this.chooseInfo.problem = problem;
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
      }
    }
  };
</script>

<style scoped>
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }

  .shopDetail{
    position: fixed;
    top: 0;
    bottom: 9vh;
    width: 100%;
    z-index: 10;
    background-color: #fff;
  }
  .shopDetail .shopTitle{
    display: flex;
    width: auto;
    padding: 0 10px;
    height: 10vh;
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

  .shopDetail  .steps{
    width: auto;
    height: auto;
    padding-top: 4vh;
  }
  .shopDetail .stepsContent{
    width: auto;
    height: auto;
  }
  .isShowStep{
    display: none;
  }
</style>
