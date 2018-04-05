<template>
  <div class="classList">
    <div class="cover">
      <div class="img">
        <img :src="cover" alt="">
      </div>
    </div>
    <div class="content">
      <div class="contentBox">
        <p>{{name}}</p>
        <p>{{type}}-{{number}}人在学</p>
        <p class="fee" v-if="fee == '0'">免费</p>
        <p class="fee" v-else>￥{{fee}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calss-list',
    props: {
      cover: String,
      name: String,
      type: String,
      number: Number,
      fee: Number
    }
  }

</script>

<style>
  .classList {
    width: auto;
    height: 120px;
    padding: 0 8px;
    margin: 15px 15px;
    background-color: #fff;
    display: flex;
    box-shadow: 0 2px 6px #d4e5f8;
  }
  .classList .cover {
    flex: 1;
    position: relative;
  }
  .classList .cover .img{
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    
    border-radius: 5px;
    overflow: hidden;
  }
  .classList .cover .img img{
    width: 100%;
  }
  .classList .content {
    flex: 2;
    height: auto;
    position: relative;
  }
  .classList .content .contentBox{
    width: 90%;
    padding-left: 12px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #414141;
  }
  .classList .content .contentBox p{
    font-size: 13px;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>

