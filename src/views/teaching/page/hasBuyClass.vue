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
        v-if="classListData.length != 0"
        v-for="(item, index) in classListData" 
        :key="index" 
        :cover="item.info.cover"
        :name="item.name+'（已购）'" 
        :level="item.level" 
        :number="item.number"
        :fee="item.price/100"
        v-on:click.native="gotoVideoDetail(item)"
        ></class-list>
        <div 
          v-if="classListData.length == 0"
          class="withoutClass"
          >
          <p>你还没有购买课程哦</p>
          <cube-button class="toTeaching" @click="toTeaching">点我购买课程</cube-button>
        </div>
    </cube-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import classList from '../components/classList';
let toast;
export default {
  data () {
    return {
      classListData: []
    };
  },

  components: {
    classList
  },
  async activated(){
    let userData = this.getUserInfo();
    let req = {
      collection: "TrainUser",
      user: userData._id
    }
    toast = this.$createToast({
      txt: '加载中...',
      type: 'loading',
      time: 25000
    });
    toast.show();
    let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
    if(res.code == 200){
      this.getVideoList(res.data);
    }
  },
  methods: {
    back: function () {
      this.$router.push("/teaching");
    },
    toTeaching(){
      this.$router.push("/teaching");
    },
    async getVideoList(data){
      this.classListData = [];
      if(data.length > 0){
        // for(let i=0; i < data.length; i++){
        //   let train
        // }
        data.map((item) => {
          let req = {
            collection: "Train",
            _id: item.train
          }
          this.getVideoData(req).then(res => {
            res.map(i =>{
              this.classListData.push(i);
            })
          })
          toast.hide();
        })
      }
    },
    async getVideoData(req){
      let res = await this.$api.sendData("https://m.yixiutech.com/sql/find", req);
      if(res.code == 200){
        return res.data;
      }
    },
    gotoVideoDetail(item){
      this.$router.push({
        name: "hasBuyClassDes",
        params: {
          data: item
        }
      })
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
  .buyClass .scroll{
    width: auto;
    height: 92vh;
    bottom: 0;
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
  .withoutClass{
    margin-top: 20%;
    text-align: center;
  }
  .withoutClass p{
    height: 50px;
  }
  .withoutClass .toTeaching{
    width: 50vw;
    margin: 0 auto;
  }
</style>