<template>
  <div class="chooseInfos">
    <div class="information">
      <ul>
        <li>
          <span class="name">手机信息</span>
          <span class="value">{{chooseData.brand.val}} {{chooseData.model.val}} {{chooseData.color.val}}</span>
        </li>
        <li><span class="name">维修选项</span><span class="value">{{serverList}}</span></li>
        <li>
          <span class="name">手机号</span>
          <span class="value">
            <input placeholder="请输入手机号" v-model="phoneNumber" />
          </span>
          <span class="errorMessage">{{errorMessage}}</span>
        </li>
        <li>
          <span class="name">留言</span>
          <span class="value">
            <input placeholder="请输入留言" v-model="remack" />
          </span>
        </li>
        <li>
          <span class="name">预约时间</span>
          <span class="value">
            <cube-button @click="showTimePicker">请选择时间:{{time}}</cube-button>
          </span>
        </li>
        <li>
          <span class="name">服务方式</span>
          <span class="value">
            <cube-select
              v-model="serWay"
              placeholder="请选择服务方式"
              :options="theServiceWay"
              @change="selectServiceWay">
            </cube-select>
          </span>
        </li>
        <li v-if="isShowAddress">
          <span class="name">你的地址:</span>
          <span class="value">
            <input placeholder="请输入你的地址" v-model="address" />
          </span>
        </li>
      </ul>
      <!-- <div id="input">
        <van-field
          label="手机号"
          placeholder="请输入手机号"
          type="number"
          v-model="phoneNumber"
          :error-message="errorMessage"
        />
        <van-field
          label="留言"
          type="textarea"
          placeholder="请输入留言"
          rows="1"
          autosize
          v-model="remack"
        />
      </div> -->
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
        <sure-order :sureOrderData="sureOrderData" :data="chooseData" :TotalFee="TotalFee" :serverId="serverId"></sure-order>
        <!--<van-button @click="nextStep" bottom-action>-->
        <!--<sicon name="nextStep" scale="1.8"></sicon><span>确认下单</span>-->
        <!--</van-button>-->
      </div>
    </div>
  </div>
</template>

<script>
  import { CouponCell, CouponList, Popup, Toast, Button, Field } from 'vant';
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
        shopServer: [],
        sureOrderData: {}, 
        payment: 0, //实付金额
        TotalFee: 0,
        phoneNumber: "", // 电话号码
        errorMessage: "",
        serWay: "", //服务方式
        theServiceWay: [],
        time: "", // 时间选择
        timeNum: "",
        remack: "", //备注
        isShowAddress: false,
        address: ""
      }
    },
    props: {
      chooseData: {
        type: Object,
        default: null
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
      },
      serviceWay: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    mounted() {
      this.theServiceWay = this.serviceWay;
      let servers = this.chooseData.problem.data;
      let pro = servers.map(function (val) {
        return val.name;
      });
      for(let i=0; i<servers.length; i++){
        this.payment += servers[i].price;
      }
      this.TotalFee = this.payment;
      this.serverList = pro.join("/");
      this.setOrderData();

    },
    watch: {
      TotalFee: function (val) {
        this.setOrderData();
        return val;
      },
      payment: function (val) {
        return val;
      },
      serverList: function (val) {
        this.setOrderData();
        console.log(val);
      },
      remack: function (val) {
        this.setOrderData();
        return val;
      },
      phoneNumber: function (val) {
        let reg=/^1[345789]\d{9}$/ ;
        if (reg.test(val)){
          this.errorMessage = "";
          this.setOrderData();
        }else {
          this.errorMessage = "手机号格式错误";
        }
      },
      serverId: function (val) {
        return val;
      },
      address: function(val){
        this.setOrderData();
        return val;
      },
      time: function(val){
        console.log(val);
        this.setOrderData();
      }
    },
    components: {
      [Button.name]: Button,
      [Field.name]: Field,
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
        if (index !== -1){
          this.TotalFee = this.payment - this.coupons[index].value/100;
        }else {
          this.TotalFee = this.payment;
        }
      },
      onExchange(code) {
        this.coupons.push(this.coupon);
      },
      selectServiceWay: function(value, index, text) {
        if(value == "线上快递"){
          this.isShowAddress = true;
        }
        this.setOrderData();
      },
      setOrderData: function () {
        let shopId = this.$route.params.id;
        let userInfo = this.getUserInfo();
        this.sureOrderData = {
          type: 0,//订单类型 0.纯服务类型 1.服务和商品类型 2.纯商品类型
          user: userInfo._id,
          shop: shopId,
          serviceWay: this.serWay,//服务方式 1.上门服务 2.自行到店
          phone: this.phoneNumber,//联系电话
          address: this.address,//联系人地址
          // goods: this.shopId,//商品列表
          appointment: this.timeNum,
          service: this.serverId,//服务列表
          phoneModel: this.chooseData.model.data._id,//
          // card:[""],//优惠券列表
          remark: this.remack,//备注
          paymentType: 0, //付款方式 0:在线支付(目前只支持) 1:线下支付 2:修好后支付
          price: this.payment*100,//总金额(优惠前金额)
          payment: this.TotalFee*100//实付金额
        }
      },
      showTimePicker: function(){
        const d = new Date();
        const time = d.valueOf() + 1 * 60 * 60 * 1000;
        const timePicker = this.$createTimePicker({
          showNow: true,
          minuteStep: 10,
          delay: 15,
          day: {
            len: 5,
            filter: ['今天', '明天', '后天'],
            format: 'M月d日'
          },
          onSelect: (selectedTime, selectedText) => {
            this.timeNum = selectedTime;
            this.time = selectedText;
            this.setOrderData();
          },
          onCancel: () => {
            this.$createToast({
              type: 'correct',
              txt: 'Picker canceled',
              time: 1000
            }).show()
          }
        })

        timePicker.setTime(time)
        timePicker.show()
      }
    }
  };
</script>

<style scoped>
  .chooseInfos .information{
    width: auto;
    height: auto;
    max-height: 41vh;
    overflow-y: scroll;
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
  .chooseInfos .information ul li span.value input{
    text-align: right;
  }
  .chooseInfos .information ul li span.errorMessage{
    position: relative;
    /*top: 20px;*/
    float: right;
    color: red;
  }
  .chooseInfos .information ul li span.value button{
    height: 40px;
    background-color: #fff;
    color: #000;
    font-size: 13px;
  }
  .chooseInfos .information ul li span.value select{
    border: none;
   }

  .chooseInfos .stepButton{
    width: 100%;
    display: flex;
    position: absolute;
    bottom: 5px;
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
  #input div div input{
      text-align: right !important;
    }
</style>
