<template>
  <div>
    <div class="couponsTag-container" v-if="coupons.used==true">
      <div class="couponsTag-left">
        <div class="couponsTag-lines"></div>
        <div class="couponsTag-gradient">
          <h2 v-if="coupons.disount===0">¥ {{ coupons.value }}元</h2>
          <h2 v-else-if="coupons.denominations===0">{{ coupons.disount }} 折</h2>
          <p v-if="coupons.origin_condition===0">无门槛使用</p>
          <p v-else>满{{ coupons.origin_condition }}元可使用</p>
        </div>
      </div>
      <div class="couponsTag-right">
        <h2>{{coupons.name}}</h2>
        <span>{{coupons.start_at}} - {{coupons.end_at}}</span>
      </div>
    </div>
    <div class="couponsTag-container" v-else>
      <div class="couponsTag-left">
        <div class="couponsTag-lines-no"></div>
        <div class="couponsTag-gradient gradient-no">
          <h2 v-if="coupons.disount===0">¥ {{ coupons.value }}元</h2>
          <h2 v-else-if="coupons.denominations===0">{{ coupons.disount }} 折</h2>
          <p v-if="coupons.origin_condition===0">无门槛使用</p>
          <p v-else>满{{ coupons.origin_condition }}元可使用</p>
        </div>
      </div>
      <div class="couponsTag-right">
        <h2>{{coupons.name}}</h2>
        <span>{{coupons.start_at}} - {{coupons.end_at}}</span>
        <p>{{coupons.reason}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  //vant


  export default {
    data() {
      return {
        coupons:{}
      }
    },
    props: {
      couponsData:{
        type: Object,
      }
    },
    components: {
      
    },
    methods: {
      //按照指定格式输出时间
      datestr(x,y) {
          var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
          return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
      }
    },
    created: function() {
      //设置couponsData 用来调用
      let couponsData = this.couponsData;
      let addCoupons = {}   //存储需要的coupons数据再赋值给data里的coupons

      //将时间戳与时间转换
      let starTime = new Date();  
      let endTime = new Date();  
      starTime.setTime(couponsData.start_at * 1000); 
      endTime.setTime(couponsData.end_at * 1000); 

      //调用datestr转换格式
      starTime = this.datestr(starTime,"yyyy.MM.d")
      endTime = this.datestr(endTime,"yyyy.MM.d")

      addCoupons.used = couponsData.used;     //是否可使用
      addCoupons.id = couponsData.id;         //优惠券时间
      addCoupons.name = couponsData.name;     //优惠券名字
      addCoupons.disount = couponsData.disount/10;     //优先权折扣   0为使用优惠券金额   
      addCoupons.denominations = couponsData.denominations/100;     //优惠券金额   0为使用优惠券折扣
      addCoupons.origin_condition = couponsData.origin_condition/100;   //满减条件    0为金额限制
      addCoupons.start_at = starTime;     //开始时间
      addCoupons.end_at = endTime;        //结束时间
      addCoupons.reason = couponsData.reason;     //无法使用原因
      addCoupons.value = couponsData.value/100;   //优惠券金额

      this.coupons = addCoupons;    

    }
  }
</script>

<style scoped>
  .couponsTag-container{
    display: flex;
    height: 100px;
    margin: 0 15px 10px;
    color: #333;
  }
  .couponsTag-left{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    line-height: 1;
    min-width: 126px;
  }
  .couponsTag-right{
    height: 100%;
    display: flex;
    padding: 0 15px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 0 4px 4px 0;
  }
  .couponsTag-lines{
    height: 100%;
    min-width: 18px;
    background: url(https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/couponsConor.png) no-repeat;
    background-size: 18px 100px;
  }
  .couponsTag-lines-no{
    height: 100%;
    min-width: 18px;
    background: url(https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/no-couponsConor.png) no-repeat;
    background-size: 18px 100px;
  }
  .couponsTag-gradient{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
            flex: 1;
    color: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-left: -1px; /* hack for flex space */
    text-align: center;
    padding-right: 16px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
            flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
            justify-content: center;
    background-image: -webkit-linear-gradient(45deg, #ff6868, #ff8c8c);
    background-image: linear-gradient(45deg, #ff6868, #ff8c8c);
  }
  .gradient-no{
    background-image: -webkit-linear-gradient(45deg, #a4a9b2, #b7bcc3);
    background-image: linear-gradient(45deg, #a4a9b2, #b7bcc3);
  }
  .couponsTag-gradient h2{
    font-size: 22px;
    font-weight: normal;
    margin: 0 0 10px;
  }
  .couponsTag-gradient p{
    margin: 0;
    font-size: 4vw;
    font-weight: 300;
    max-width: 90px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .couponsTag-right{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 0 15px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    border-radius: 0 4px 4px 0;
  }
  .couponsTag-right h2{
    line-height: 1.4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
    opacity: .8;
    font-size: 16px;
    font-weight: normal;
  }
  .couponsTag-right span,
  .couponsTag-right p
  {
    line-height: 1.4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
    font-size: 12px;
    margin: 5px 0 0;
  }
    
  
</style>