<template>
  <div class="questionTag">
    <p class="questiontitle">请加入问题标签: &nbsp;&nbsp;  (最少1个)</p>
    <input type="text" placeholder="标签1" v-model="tagArr[0]">
    <input type="text" placeholder="标签2" v-model="tagArr[1]">
    <input type="text" placeholder="标签3" v-model="tagArr[2]">
    <input type="text" placeholder="标签4" v-model="tagArr[3]">
    <input type="text" placeholder="标签5" v-model="tagArr[4]">
    <input type="text" placeholder="标签6" v-model="tagArr[5]">
  </div>
</template>

<script>
  //vant


  export default {
  	data(){
  		return {
  			tagArr: ["","","","","",""]
  		}
  	},
  	watch: {
      tagArr: function(){
      	this.$emit("changeTag",this.tagArr)
      }
    },
    components: {

    },
    methods: {
    }
  }
</script>

<style scoped>
	.questionTag{
		display: inline-block;
		margin-top: 20px;
		padding: 10px 10px;
	}
  .questionTag input{
    width: 40%;
    margin-bottom: 15px;
    margin-right: 5%;
    padding-left: 2px;
    padding-bottom: 2.4px;
    border-bottom: 2px solid #eee;
    color: rgb(32, 32, 32);
    font-size: 5vw;
    letter-spacing: 0.2vw;
  }
  .questionTag input::-webkit-input-placeholder {   
    /* WebKit browsers */   
    color: #c0c0c0;   
  }   
  .questionTag input:-moz-placeholder {   
    /* Mozilla Firefox 4 to 18 */   
    color: #c0c0c0;   
  }   
  .questionTag input::-moz-placeholder {   
    /* Mozilla Firefox 19+ */   
    color: #c0c0c0;   
  }   
  .questionTag input:-ms-input-placeholder {   
    /* Internet Explorer 10+ */   
    color: #c0c0c0;   
  }
  .questiontitle{
  	margin-bottom: 20px;
  }
</style>