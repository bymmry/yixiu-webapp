<template>
    <div class="header">
      <div class="back" @click="back">
        <sicon name="back" scale="1.7"></sicon>
        <span>返回</span>
      </div>
      <div class="title">
        <h3>工程师培训</h3>
      </div>
      <div class="more"></div>
    </div>
</template>

<script>
  export default {
    name: 'theHeader',
    methods: {
      back: function () {
        this.$router.push("/home");
      }
    }
  };
</script>

<style scoped>
  .header{
    display: flex;
    width: auto;
    height: 7vh;
    padding: 0 10px;
  }
  .header > div{
    line-height: 7vh;
  }
  .header > div.back{
    flex: 3;
    font-size: 13px;
    color: #535456;
  }
  .header > div svg, .header > div.back span{
    vertical-align: middle;
  }
  .header > div.title{
    flex: 15;
  }
  .header > div.title > h3{
    text-align: center;
    color: #f85;
  }
  .header > div.more{
    flex: 3;
    text-align: center;
  }
</style>
