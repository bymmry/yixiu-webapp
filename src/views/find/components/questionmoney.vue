<template>
  <div class="questionMoney">
    <p class="questiontitle">
      请输入 
      <span style="color:#FF5722">悬赏金额</span> 
      <van-tag plain type="danger">赏金将从积分中扣除</van-tag>
    </p>
    <input type="text" placeholder="整数" v-model="money"><span style="font-size: 8vw;"></span>
    <p>你的总积分为：{{allmoney}}</p> <span class="notice" v-if="noticeshow">没有足够的积分</span>
  </div>
</template>

<script>
  //vant

  import { Tag } from 'vant';
  
  export default {
    props:{
      oldMoney: Array
    },
  	data(){
  		return {
  			money: 0,
        allmoney:0,
        noticeshow:false,
        UID:"",
  		}
  	},
  	watch: {
      money: function(){
        if (this.money<=this.allmoney) {
          this.$emit("changeMoney",this.money)
          this.noticeshow=false;
        }else{
          this.noticeshow=true;
          this.$emit("cantpush")
        }
      }
    },
    components: {
      [Tag.name]: Tag,
    },
    methods: {
      getMymoney(){
        let userData = this.getUserInfo();
        this.allmoney = userData.points;
      }
    },
    created(){
      this.getMymoney();
      this.money = this.oldMoney ? this.oldMoney : this.money
    }
    
  }
</script>

<style scoped>
	.questionMoney{
    width: 100%;
		display: inline-block;
		margin-top: 10px;
    border-top: 0.3px solid #ebebeb;
		padding: 10px 10px;
    padding-top: 20px
	}
  .questionMoney input{
    width: 80%;
    margin-bottom: 15px;
    margin-right: 2%;
    padding-left: 2px;
    padding-bottom: 2.4px;
    border-bottom: 2px solid #FF5722;
    color: rgb(32, 32, 32);
    font-size: 8vw;
    letter-spacing: 0.2vw;
    text-align: center;
  }
  .questionMoney input::-webkit-input-placeholder {   
    /* WebKit browsers */   
    color: #c0c0c0;   
  }   
  .questionMoney input:-moz-placeholder {   
    /* Mozilla Firefox 4 to 18 */   
    color: #c0c0c0;   
  }   
  .questionMoney input::-moz-placeholder {   
    /* Mozilla Firefox 19+ */   
    color: #c0c0c0;   
  }   
  .questionMoney input:-ms-input-placeholder {   
    /* Internet Explorer 10+ */   
    color: #c0c0c0;   
  }
  .questiontitle{
  	margin-bottom: 20px;
  }
  .notice{
    font-size: 12px;
    color: red;
  }
</style>