<template>
  <div class="questionBox-container">
    <!-- 内容部分 -->
    <div class="questionBox-content">
      <div class="questionTitle">
        {{ question.title }}
      </div>
      <div class="questionTitle-hidden" v-if="overtitle">...</div>
      <div class="questionContent">
        <!-- <img v-if="question.imgurl !== ''" :src="question.imgurl"> -->
        <div class="questionText" v-html="question.desc"></div>
      </div>
      <div class="questionContent-hidden" v-if="overcontent">...</div>
      <div class="questionFooter">
        <div class="questionFooterLeft">
          <div>回复：{{ question.replyCount }}</div>
          <div>赏金：{{ question.reward ? question.reward/100 : 0 }} 元</div>
          <div>{{ createdtime }}</div>
        </div>
        <div>
          <div class="questionFooterRight">点击了解更多&nbsp;&nbsp;<sicon name="find-right" scale="3"></sicon></div>
          <div v-if="questionType === 'my'" :class="stateStyle[question.state]">{{ stateText[question.state] }}</div>
        </div>
        
      </div>
    </div>
    <!-- 底部的阴影 -->
    <div class="questionBox-shadow"></div>
  </div>
  
</template>

<script>
  //vant

  export default {
    data(){
      return {
        stateText:{
          0:"待审核",
          1:"已审核",
          2:"已采纳",
          3:"已关闭"
        },
        stateStyle:{
          0:"Qwait",
          1:"Qpass",
          2:"Qchosed",
          3:"Qclose"
        },
        createdtime: "",
        overtitle: false,   // 标题是否超过2行
        overcontent: false,   // 内容是否超过3行
      }
    },
    props: {
      questionType: String,  //传入的question类型 我的和全部
      question: Object //传入的单个提问块
    },
    components: {

    },
    methods: {
      datestr(x,y) {
        var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
        return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
      }
    },
    created: function(){
      //判断标题是否过长
      // console.log(this.question)
      let Time = new Date();  
      Time.setTime(this.question.createdAt * 1000); 
      this.createdtime = this.datestr(Time,"yyyy.MM.d");

      let stateText


      if (this.question.title.length>=40) {
        this.overtitle = true;
      }
      if (this.question.desc.length>=70) {
        this.overcontent = true;
      }
    }
  }
</script>

<style scoped>
  .questionBox-container{
    position: relative;
    max-height: 59vh;
    /*min-height: 283px;*/
    padding: 1.6vh 4vw 1.1vh 4vw;
    border-top: 0.1vh solid #e0deec;
    border-bottom: 0.1vh solid #e0deec;
    margin-bottom: 1.6vh;
    background: #fff;
  }
  .questionBox-content{
    position: relative;
  }
  .questionBox-shadow{
    position: absolute;
    left: 0;
    bottom: 1px;
    width: 100%;
    height: 1px;
    -moz-box-shadow:0vw 1vh 4vw #b6baba; 
    -webkit-box-shadow:0vw 1vh 4vw #b6baba; 
    box-shadow:0vw 1vh 4vw #b6baba;
  }
  .questionContent img{
    display: block;
    max-height: 34.5vh;
    min-height: 165.5px;
    max-width: 100%;
    margin:0 auto;
    margin-bottom: 1.5vh;
  }
  .questionTitle{
    font-size: 4.6vw;
    line-height: 6vw;
    max-height: 12vw;
    margin-bottom: 2.1vh;
    font-weight: 700;
    color: #1c1c1c;
    overflow: hidden;
  }
  .questionTitle-hidden{
    width: 4.5vw;
    height: 6vw;
    position: absolute;
    right: 4vw;
    margin-top: -8.1vw;
    background: #fff;
    z-index: 100;
  }
  .questionContent-hidden{
    width: 4.5vw;
    height: 6vw;
    position: absolute;
    right: -0.7vw;
    margin-top: -6vw;
    background: #fff;
    z-index: 100;
  }
  .questionText{
    max-height: 40vw;
    font-size: 4vw;
    line-height: 5.5vw;
    color: #404040;
    overflow: hidden;
  }
  .questionText >>> img{
    max-height: 8.9em;
    margin: 0 auto;
    max-width: 100%;
    display: block;
  }
  .questionFooter{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 4vh;
    margin-bottom: 2.9vh;
    font-size: 4vw;
    color: #919191;
  }
  .questionFooterLeft{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .questionFooterLeft :first-child{
    margin-bottom: 5px;
  }
  .questionFooterLeft :last-child{
    margin-top: 5px;
  }
  .questionFooterRight{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .Qwait{
    text-align: right;
    color: #FA9E05;
  }
  .Qpass{
    text-align: right;
    color: #4EF037;
  }
  .Qchosed{
    text-align: right;
    color: #00B7C2;
  }
  .Qclose{
    text-align: right;
    /*color: #FA9E05;*/
  }
</style>