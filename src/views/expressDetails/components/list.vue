<template>
  <div class="box">
    <div class="time">{{ list.datetime }}</div>
    <div class="line"></div>
    <div class="text">{{ list.remark }}</div>
  </div>
</template>

<script>
  export default {
    props:{
      list:Object
    },
    components: {
    	
    },
    methods:{
      timeReg(){
        let reg = /\d{4}-\d{2}-\d{2}/
        let reg2 = / \d{2}:\d{2}:\d{2}/
        let time = this.list.datetime.replace(reg,"")
        let date = this.list.datetime.replace(reg2,"")
        console.log(time);
        console.log(date);
      }
    },
    created(){
      this.timeReg();
    }
  }
</script>

<style scoped>
  .box{
    display: flex;
    flex-direction: row;
  }
  .time{
    width: 25vw;
    font-size: 5vw;
    margin-left: 3vw;
  }
  .line{
    margin:0 5vw;
    height: 10vh;
    border-left: 1px solid rgb(203, 203, 203);
  }
  .text{
    width: 60vw;
  }
</style>