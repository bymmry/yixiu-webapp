<template>
  <div class="newOption">
      <div class="optionBox">
        <div class="addphotoBox" @click="pushPhoto">
          <!-- <van-uploader :after-read="onRead" class="addphoto"> -->
            <sicon name="find-addphoto" scale="2.2"></sicon>
          <!-- </van-uploader> -->
        </div>
        <div class="anonymousBox" @click="changeAnonymous">
          <sicon name="find-unselect" scale="2.5" v-if="anonymous===false"></sicon>
          <sicon name="find-select" scale="2.5" color="rgb(68, 219, 94)" v-else></sicon>
          <div>匿名</div>
        </div>

      </div>
      
      
  </div>
</template>

<script>
  import { Uploader } from 'vant';
  export default {
    data(){
      return {
        anonymous:false,  //匿名
      }
    },
    components: {
      [Uploader.name]: Uploader,
    },
    methods: {
      //上传照片不可用，可用的时候用onRead函数
      pushPhoto(){
        this.functionunavailable();
      },
      //点击 上传图片
      onRead(file) {
        console.log(file);
      },
      //更改 是否匿名
      changeAnonymous(){
        this.functionunavailable();
        /*
        this.anonymous = !this.anonymous;
        this.$emit("changeanonymous",this.anonymous)
        */
      },

    }
  }
</script>

<style scoped>
  .newOption{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:flex-end;
    width: 94%;
    height: 27px;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .optionBox{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .anonymousBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.9vh 2vw;
    border-radius: 3px;
  }
  .anonymous{
    color: #0086ff
  }
  .addphotoBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 40px;
  }
  .addphoto{
    display: flex;
    align-items: center;
    justify-content: center;
    /*width:40px; */
    height: 100%;
  }
</style>