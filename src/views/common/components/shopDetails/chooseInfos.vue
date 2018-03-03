<template>
    <div class="chooseInfos">
      <div class="information">
        <ul>
          <li><span class="name">手机品牌</span><span class="value">{{chooseData.brand}}</span></li>
          <li><span class="name">手机型号</span><span class="value">{{chooseData.model}}</span></li>
          <li><span class="name">手机颜色</span><span class="value">{{chooseData.color}}</span></li>
          <li><span class="name">维修选项</span><span class="value">{{chooseData.problem}}</span></li>
        </ul>
        <div class="coupon">
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />
          <!-- 优惠券列表 -->
          <div class="couponList" v-if="showList" position="bottom">
            <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChange"
              @exchange="onExchange"
            />
          </div>
        </div>
      </div>
      <div class="stepButton">
        <div class="stepPrev">
          <van-button @click="goBack" bottom-action>
            <sicon name="back" scale="1.8"></sicon><span>上一步</span>
          </van-button>
        </div>
        <div class="stepNext">
          <van-button @click="nextStep" bottom-action>
            <sicon name="nextStep" scale="1.8"></sicon><span>确认下单</span>
          </van-button>
        </div>
      </div>
    </div>
</template>

<script>
  import { CouponCell, CouponList, Button } from 'vant';
  const coupon = {
    available: 1,
    discount: 0,
    denominations: 150,
    origin_condition: 0,
    reason: '',
    value: 150,
    name: '优惠券名称',
    start_at: 1489104000,
    end_at: 1514592000
  }
  export default {
    name: 'choose-infos',
    data() {
      return {
        coupon: {},
        showList: false,
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon]
      }
    },
    props: {
      chooseData: {
        type: Object,
        default: null
      }
    },
    created() {
      // this.coupon = coupon;
    },
    mounted() {
      console.log(this.chooseData)
    },
    watch: {
      chooseData: function (val) {
        this.chooseData = val;
      }
    },
    components: {
      [Button.name]: Button,
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList
    },
    methods: {
      goBack: function () {
        this.$emit("goBackPrevStep", true)
      },
      nextStep: function () {
      //  确认下单
      },
      onChange(index) {
        this.showList = false;
        this.chosenCoupon = index;
      },
      onExchange(code) {
        this.coupons.push(this.coupon);
      }
    }
  };
</script>

<style scoped>
  .chooseInfos .information{
    width: auto;
    height: auto;
  }
  .chooseInfos .information ul{
    width: 100%;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .chooseInfos .information ul li{
    width: auto;
    margin: 0 15px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #393939;
    border-bottom: 1px solid #e5e5e5;
  }
  .chooseInfos .information ul li:last-child{
    border: none;
  }
  .chooseInfos .information ul li span{
    display: inline-block;
  }

  .chooseInfos .information ul li span.value{
    float: right;
  }

  .couponList{
    position: fixed;
    top: 10vh;
    bottom: 8vh;
    left: 0;
    right: 0;
    z-index: 12;
  }

  .chooseInfos .stepButton{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 0;
  }
  .chooseInfos .stepButton > div{
    width: 100%;
    flex: 1;
    padding: 0 5px;
  }
  .chooseInfos .stepButton > div button{
    border-radius: 4px;
  }
  .chooseInfos .stepButton > div.stepPrev button{
    background-color: #4a4c5b;
  }
  .chooseInfos .stepButton > div button svg{
    vertical-align: middle;
    margin-right: 10px;
  }
  .chooseInfos .stepButton > div button span{
    vertical-align: middle;
  }
</style>
