<template>
  <div class="box">
    <div class="time">
      <div class="time-date">{{date}}</div>
      <div>{{time}}</div>
    </div>
    <div class="line"><sicon name="express-top" scale="1.7" color="#4D4545"></sicon></div>
    
    <div class="text">{{ list.remark }}</div>
  </div>
</template>

<script>
  import { Icon } from 'vant';
  export default {
    data(){
      return {
        time:"",
        date:""
      }
    },
    props:{
      list:Object
    },
    components: {
    	[Icon.name]:Icon
    },
    methods:{
      timeReg(){
        let reg = /\d{4}-\d{2}-\d{2}/
        let reg2 = / \d{2}:\d{2}:\d{2}/
        let retime = this.list.datetime.replace(reg,"")
        let redate = this.list.datetime.replace(reg2,"")

        let reg3 = /\d{4}-/
        let reg4 = /\d{2}:/

        this.time = retime.replace(reg4,"")
        this.date = redate.replace(reg3,"")

      }
    },
    created(){
      this.timeReg();
    }
  }
</script>

<style scoped>
  .box{
    color: #4D4545;
    display: flex;
    flex-direction: row;
    /*padding-bottom: 20px;*/
  }
  .time{
    width: 17vw;
    font-size: 3.5vw;
    margin-left: 3vw;
    text-align: right;
  }
  .time-date{
    margin-top: 2px;
    margin-bottom: 4px;
    font-size: 5vw;
  }
  .line{
    position: relative;
    margin:0 5vw;
    min-height: 14vh;
    border-left: 1px solid rgb(203, 203, 203);
  }
  .line svg{
    position: absolute;
    left: -8px;
  }
  .text{
    width: 65vw;
    font-size: 4.5vw;
    margin-top: 2px;
  }
</style>