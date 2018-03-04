<template>
    <div class="header">
      <div class="back" @click="back">
        <sicon name="back" scale="1.7"></sicon>
        <span>返回</span>
      </div>
      <div class="search">
        <van-search placeholder="搜索订单" background="#fff" v-model="value" />
      </div>
      <div class="more"><sicon name="more" scale="1.7"></sicon></div>
    </div>
</template>

<script>
  import { Search } from 'vant';
  export default {
    name: 'theHeader',
    components: {
      [Search.name]: Search
    },
    data() {
      return {
        value: ""
      }
    },
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
  .header > div.search{
    flex: 15;
  }
  .header > div.search > div{
    padding-top: 6px;
  }
  .header > div.more{
    flex: 2;
    text-align: center;
  }
</style>
