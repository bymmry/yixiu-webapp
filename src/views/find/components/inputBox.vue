<template>

  <!-- 接受一个参数 placeholder -->
  <!-- 第一次输入时正常，当输入文字后再把文字全部删除就会提示字数不够，直到重新输入2个字 -->
  <div>
    <input v-if="writed === false" class="inputbox" type="text" :placeholder="placeholder" v-model="newTitle" v-focus="!writed">
    <div v-else>
      <input class="inputbox redinput" type="text" :placeholder="placeholder" v-model="newTitle" v-focus="writed">
      <div class="notice">字数太少了吧</div>
    </div>
  </div>
</template>

<script>
  //vant
  // import { NavBar } from 'vant';

  export default {
    data(){
      return {
        newTitle: this.value,
        writed: false,
        number:0,
      }
    },
    props: {
      placeholder: String,
      value: String
    },
    watch:{
      newTitle: function(){
        
        if(this.number > 0 && this.newTitle.length==0){
          this.writed=true;
          this.number = 0;
        }
        if (this.newTitle.length>=2) {
          this.number += 1;
        }
        if (this.number > 0) {
          this.writed=false;
        }

        this.$emit("titleText",this.newTitle)
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style scoped>
  .inputbox{
    width: 100%;
    padding-bottom: 0.5vh;
    border-bottom: 2px solid #eee;
    color: rgb(32, 32, 32);
    font-size: 5vw;
    font-weight: 700;
    letter-spacing: 0.2vw;
  }
  .inputbox::-webkit-input-placeholder {   
    /* WebKit browsers */   
    color: #c0c0c0;   
  }   
  .inputbox:-moz-placeholder {   
    /* Mozilla Firefox 4 to 18 */   
    color: #c0c0c0;   
  }   
  .inputbox::-moz-placeholder {   
    /* Mozilla Firefox 19+ */   
    color: #c0c0c0;   
  }   
  .inputbox:-ms-input-placeholder {   
    /* Internet Explorer 10+ */   
    color: #c0c0c0;   
  }
  .inputbox:focus{
    border-bottom: 2px solid rgb(1, 135, 254);
  }

  .redinput{
    border-bottom: 2px solid rgb(234, 67, 59);
  }
  .redinput:focus{
    border-bottom: 2px solid rgb(234, 67, 59);
  }
  .notice{
    float: right;
    margin-top: 1.8vh;
    font-size: 3.7vw;
    color: rgb(234, 67, 59)
  }

</style>