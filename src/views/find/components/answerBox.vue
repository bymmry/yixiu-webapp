<template>
  <div class="questionBox-container">
  <img v-if="answer.adopt === true" class="choseBg" src="https://paraslee-img-bucket-1253369066.cos.ap-chengdu.myqcloud.com/crown.png">
    <!-- 内容部分 -->
    <div class="questionBox-content">
      <div class="questionTitle">
        <div class="answerAvator">
          <img :src="answer.avator">
        </div>
        {{ answer.username }}
      </div>
      <div class="questionContent">
        <img v-if="answer.imgurl !== 0" :src="answer.imgurl">
        <div class="questionText">{{ answer.content }}</div>
      </div>
      <div class="questionContent-hidden" v-if="foldquestion == true">...</div>
      <div class="questionFooter">
        <div class="questionFooterLeft">
          <div>{{ answer.replay }} 评论&nbsp;·&nbsp;</div>
          <div>{{ answer.time }}前</div>
        </div>
        <div>点击查看详情</div>
      </div>
    </div>
    <!-- 底部的阴影 -->
    <div class="questionBox-shadow"></div>
  </div>
  
</template>

<script>
  //vant

  import { Icon } from 'vant';
  export default {
    data(){
      return {
        foldquestion: true
      }
    },
    props: {
      answer: Object //传入的单个提问块
    },
    components: {
      [Icon.name]: Icon,
    },
    methods: {

    },
    created: function(){
      console.log(this.answer)
      let Time = new Date();  
      Time.setTime(this.answer.createdAt * 1000); 
      this.createdtime = this.datestr(Time,"yyyy.MM.d");

      this.getusermessage(this.answer.author);
    }
  }
</script>

<style scoped>
  .questionBox-container{
    position: relative;
    /*max-height: 59vh;*/
    padding: 3.6vh 4vw 0vh 4vw;
    border-top: 0.1vh solid #e0deec;
    border-bottom: 0.1vh solid #e0deec;
    margin-bottom: 1.6vh;
    background: #fff;
    /*overflow: hidden;*/
  }
  .choseBg{
    position: absolute;
    right: 0vw;
    top: 0vh;
    width: 12vw;
    height: 12vw;
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
    max-height: 25.4vh;
    max-width: 100%;
    margin:0 auto;
    margin-bottom: 1.5vh;
  }
  .questionTitle{
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 4.5vw;
    line-height: 6vw;
    max-height: 12vw;
    margin-bottom: 2.6vh;
    color: #959595;
    overflow: hidden;
  }
  .answerAvator{
    width: 6vw;
    height: 6vw;
    border-radius: 50%;
    margin-right: 1.9vw;
    overflow: hidden;
  }
  .answerAvator img{
    width: 100%;
    height: 100%;
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
    align-items: center;
    margin-top: 2.8vh;
    margin-bottom: 2.1vh;
    font-size: 4vw;
    color: #919191;
  }
  .questionFooterLeft{
    display: flex;
    flex-direction: row;
  }
  .blueBtn{
    background-color: #0086ff;
    border: 1px solid #317bcd;
  }
</style>