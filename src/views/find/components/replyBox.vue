<template>
  <div class="replyBox-container">
    <div class="avator">
      <img :src="reply.avator">
    </div>
    <div class="message">
      <div class="username">{{ reply.name }}</div>
      <div class="messagetext">{{ reply.content }}</div>
      <div class="messageFooter">
        <div class="messageTime">{{ reply.time }}</div>
        <div class="messageBtnBox">
          <div class="messageBtn" @click="replyuser">
            <sicon name="find-talk" scale="2"></sicon>
            回复
          </div>
          <div class="messageBtn" @click="likethis">
            <sicon name="find-support" scale="1.7"></sicon>
            {{ reply.like }}
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
  //vant

  import { Icon } from 'vant';
  import { likethis } from '../../common/api'
  export default {
    data(){
      return {
      }
    },
    props:{
      reply: Object
    },
    components: {

    },
    methods: {
      replyuser(){
        this.$emit("replyuser", this.reply.name)
      },
      likethis(){
        this.functionunavailable();
        /*
        likethis(postdata)
        .then(res => {
          toast.hide();
          this.questionData = res.data;
          console.log(res.data)
        },(err => {
          console.log(err);
        }))
        */
      }
    },
    created: function(){
    }
  }
</script>

<style scoped>
  .replyBox-container{
    display: flex;
    flex-direction: row;
    min-height: 20vh;
    padding: 3vh 2vw 3vh 2.7vw;
    background: #fff;
    
  }
  .avator{
    width: 11vw;
    height: 11vw;
    border-radius: 50%;
    margin-right: 3vw;
    overflow: hidden;
  }
  .avator img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .message{
    width: 88%;  
    display: flex;
    flex-direction: column;
    border-bottom: 0.3vw solid #d1d1d1;
  }
  .username{
    color: #1b1b1b;
    margin-bottom: 2.8vh;
  }
  .messagetext{
    color: #5a5a5a;
    margin-bottom: 3vh;
  }
  .messageFooter{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #979797;
    margin-bottom: 4vh;
  }
  .messageBtnBox{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .messageBtn{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 6vw;
  }
  .messageBtn svg{
    margin-right: 1vw;
  }
</style>