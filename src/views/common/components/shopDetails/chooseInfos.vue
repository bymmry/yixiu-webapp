<template>
  <div class="chooseInfos">
    <div class="information">
      <ul>
        <li><span class="name">手机品牌</span><span class="value">{{chooseData.brand.val}}</span></li>
        <li><span class="name">手机型号</span><span class="value">{{chooseData.model.val}}</span></li>
        <li><span class="name">手机颜色</span><span class="value">{{chooseData.color.val}}</span></li>
        <li><span class="name">维修选项</span><span class="value">{{serverList}}</span></li>
      </ul>
      <div class="coupon">
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <!-- 优惠券列表 -->
        <van-popup v-model="showList" position="bottom">
          <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
          />
        </van-popup>
      </div>
    </div>
    <div class="stepButton">
      <div class="stepPrev">
        <van-button @click="goBack" bottom-action>
          <sicon name="back" scale="1.8"></sicon><span>上一步</span>
        </van-button>
      </div>
      <div class="stepNext">
        <sure-order :data="chooseData" :TotalFee="TotalFee" :serverId="serverId"></sure-order>
        <!--<van-button @click="nextStep" bottom-action>-->
        <!--<sicon name="nextStep" scale="1.8"></sicon><span>确认下单</span>-->
        <!--</van-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { CouponCell, CouponList, Popup, Toast, Button } from 'vant';
  import sureOrder from "../sureOrder"
  const coupon = {
    available: 1,
    discount: 0,
    denominations: 150,
    origin_condition: 0,
    reason: '',
    value: 150,
    // name: '优惠券',
    start_at: 1489104000,
    end_at: 1514592000
  };
  export default {
    name: 'choose-infos',
    data() {
      return {
        coupon: {},
        showList: false,
        chosenCoupon: -1,
        coupons: [coupon],
        disabledCoupons: [coupon],
        shopServer: []
      }
    },
    props: {
      chooseData: {
        type: Object,
        default: null
      },
      TotalFee: {
        type: Number,
        default: 0
      },
      serverList: {
        type: String,
        default: ""
      },
      serverId: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    mounted() {
      console.log(this.chooseData);
      let servers = this.chooseData.problem.data;
      let pro = servers.map(function (val) {
        return val.name;
      });
      let TotalFee = 0;
      for(let i=0; i<servers.length; i++){
        TotalFee += servers[i].price;
      }
      this.serverList = pro.join("/");
    },
    watch: {
      TotalFee: function (val) {
        return val;
      },
      serverList: function (val) {
        console.log(val);
      },
      serverId: function (val) {
        return val;
      }
    },
    components: {
      [Button.name]: Button,
      [CouponCell.name]: CouponCell,
      [CouponList.name]: CouponList,
      [Popup.name]: Popup,
      [Toast.name]: Toast,
      sureOrder
    },
    methods: {
      goBack: function () {
        this.$emit("goBackPrevStep", true)
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
