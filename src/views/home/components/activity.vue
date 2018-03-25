<template>
  <div class="activity">
    <h3 class="activity__title">
      <span>火热活动</span>
    </h3>
    <div class="imgs">
      <div class="left">
        <img src="https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/hot1.jpg" alt="">
      </div>
      <div class="right">
        <img src="https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/hot2.jpg" alt="">
        <img src="https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/hot3.jpg" alt="">
        <img src="https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/hot4.jpg" alt="">
        <img src="https://allenyu-1252092265.cos.ap-chongqing.myqcloud.com/hot5.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    	
    },
  }
</script>

<style scoped>
  .activity {
    width: 100%;
    text-align: center;
    margin-top: 1vh;
    height: auto;

    border-bottom: 10px solid #efefef;
  }
  .activity h3{
    width: auto;
    height: 5vh;
    line-height: 5vh;
  }
  .activity h3 span{
    position: relative;
  }
  .activity h3 span::before{
    content: "";
    width: 50px;
    height: 1px;
    border-top: 1px solid #ccc;
    position: absolute;
    left: -60px;
    top: 8px;
  }
  .activity h3 span::after{
    content: "";
    width: 50px;
    height: 1px;
    border-top: 1px solid #ccc;
    position: absolute;
    margin-left: 10px;
    top: 8px;
   }
   .imgs{
     display: flex;
     width: 90%;
     height: auto;
     margin: 1vh auto;
   }
   .imgs .left{
     flex: 1;
   }
   .imgs .left img{
     width: 96%;
     padding: 2%;
   }
   .imgs .right{
     flex: 1;
   }
   .imgs .right img{
     width: 46%;
     float: left;
     padding: 2%;
   }
</style>