<!-- 已购买的课程 -->
<template>
  <div class="buyClass">
    <div class="header">
      <div class="back" @click="back">
        <sicon name="back" scale="1.7"></sicon>
        <span>返回</span>
      </div>
      <div class="title">
        <h3>我的课程</h3>
      </div>
      <div class="my">
      </div>
    </div>
    <cube-scroll :data="classListData" class="scroll">
      <class-list 
        v-for="(item, index) in classListData" 
        :key="index" 
        :cover="item.info.cover"
        :name="item.name" 
        :level="item.level" 
        :number="item.number"
        :fee="item.price/100"
        v-on:click.native="gotoVideoDetail(item)"
        ></class-list>
    </cube-scroll>
  </div>
</template>

<script>
import classList from '../components/classList';
export default {
  data () {
    return {
      classListData: []
    };
  },

  components: {
    classList
  },
  async created(){
    let userData = this.getUserInfo();
    let req = {
      collection: "TrainUser",
      user: userData._id
    }
    let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
    console.log(res);
  },
  methods: {
    back: function () {
      this.$router.push("/teaching");
    },
    gotoVideoDetail(){
      
    }
  }
}

</script>

<style scoped>
  .buyClass{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 115;
    background: #fff;
  }
  .header{
    display: flex;
    width: auto;
    height: 7vh;
    padding: 0 10px;
    background: #fff;
    border-bottom: 1px solid #eee;
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
  .header > div.my{
    flex: 3;
    text-align: center;
    /* position: relative; */
  }
</style>