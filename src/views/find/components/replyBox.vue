<template>
  <div class="replyBox-container">
    <div class="avator">
      <img :src="avator">
    </div>
    <div class="message">
      <div class="username">{{ name }}</div>
      <div class="messagetext">{{ reply.content }}</div>
      <div class="messageFooter">
        <div class="messageTime">{{ reply.time }}</div>
        <div class="messageBtnBox">
          <div class="messageBtn" @click="replyuser">
            <sicon name="find-talk" scale="2"></sicon>
            回复
          </div>
        </div>
      </div>
      
    </div>
  </div>
  
</template>

<script>
  //vant

  import { Icon } from 'vant';
  import { getuserinforById } from '../../common/api';
  

  export default {
    data(){
      return {
        avator:"",
        name:""
      }
    },
    props:{
      reply: Object
    },
    methods: {
      replyuser(){
        this.$emit("replyuser", [this.name,this.reply._id]);
      }, 
      getusermessage(id){
        getuserinforById(id)
        .then(res => {
          this.name = res.data.name
          this.avator = res.data.wx.avatarUrl;
          // console.log(this.reply)
          // console.log(res)
        },(err => {
          // console.log(err);
        }))
      },
      datestr(x,y) {
        var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
        return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
      },
    },
    created() {
      this.getusermessage(this.reply.author)

      let Time = new Date();  
      Time.setTime(this.reply.updatedAt * 1000); 
      this.reply.time = this.datestr(Time,"yyyy.MM.d");
    }
  }
</script>

<style scoped>
  .replyBox-container{
    display: flex;
    flex-direction: row;
    /*min-height: 20vh;*/
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
    margin-bottom: 15px;
  }
  .messagetext{
    color: #5a5a5a;
    margin-bottom: 10px;
  }
  .messageFooter{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #979797;
    margin-bottom: 10px;
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