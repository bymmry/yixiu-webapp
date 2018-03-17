<template>
  <div class="imgBox">
    <div class="imgCover" @click="closeImg"></div>
    <img :src="imgurl" alt="">
    <van-button type="default" class="delbtn" size="small" @click="delphoto">删除该图片</van-button>
  </div>
</template>

<script>
  import { Button } from 'vant';
  export default {
    components: {
      [Button.name]:Button
    },
    props:{
      imgurl:String,
    },
    methods: {
     closeImg(){
      this.$emit("closeimg")
     },
     delphoto(){
      this.$emit("delimg");
     }
    }
  }
</script>

<style scoped>
  .imgBox{
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;
  }
  .imgCover{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(32, 32, 32,0.7);
    z-index: -1;
  }
  .delbtn{
    margin-top: 10px; 
    background: rgb(32, 32, 32);
    color: #fff;
  }
</style>