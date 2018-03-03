<template>
  <div>
    <div class="couponsTag-container">
      <div class="couponsTag-left">
        <div class="couponsTag-lines"></div>
        <div class="couponsTag-gradient">
          <h2>¥ 15元</h2>
          <p>无门槛使用</p>
        </div>
      </div>
      <div class="couponsTag-right">
        <h2>优惠券名称</h2>
        <span>2017.03.10-2017.12.30</span>
      </div>
    </div>
  </div>
</template>

<script>
  //vant


  export default {
    data() {
      return {
        
      }
    },
    props: {
      
    },
    components: {
      
    },
    methods: {
      
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
  .couponsTag-gradient h2{
    font-size: 22px;
    font-weight: normal;
    margin: 0 0 10px;
  }
  .couponsTag-gradient p{
    margin: 0;
    font-size: 14px;
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
  .couponsTag-right span{
    line-height: 1.4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999;
    font-size: 12px;
    margin: 5px 0 0;
  }
    
  
</style>