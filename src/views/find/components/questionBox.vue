<template>
  <div class="questionBox-container">
    <!-- 内容部分 -->
    <div class="questionBox-content">
      <div class="questionTitle">
        {{ question.title }}
      </div>
      <div class="questionTitle-hidden" v-if="overtitle">...</div>
      <div class="questionContent">
        <img v-if="question.imgurl !== 0" :src="question.imgurl">
        <div class="questionText">{{ question.content }}</div>
      </div>
      <div class="questionContent-hidden" v-if="overcontent">...</div>
      <div class="questionFooter">
        <div>{{ question.reply }} 回复</div>
        <div>点击查看更多</div>
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
        overtitle: false,   // 标题是否超过2行
        overcontent: false,   // 内容是否超过3行
      }
    },
    props: {
      question: Object //传入的单个提问块
    },
    components: {

    },
    methods: {

    },
    created: function(){
      //判断标题是否过长
      if (this.question.title.length>=40) {
        this.overtitle = true;
      }
      if (this.question.content.length>=70) {
        this.overcontent = true;
      }
    }
  }
</script>

<style scoped>
  .questionBox-container{
    position: relative;
    max-height: 59vh;
    min-height: 283px;
    padding: 1.6vh 4vw 3.1vh 4vw;
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
    max-height: 16.5vw;
    font-size: 4vw;
    line-height: 5.5vw;
    color: #404040;
    overflow: hidden;
  }
  .questionFooter{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2.8vh;
    margin-bottom: 2.9vh;
    font-size: 4vw;
    color: #919191;
  }
</style>