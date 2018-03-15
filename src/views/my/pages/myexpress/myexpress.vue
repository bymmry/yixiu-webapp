<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="物流查询"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <van-field v-model="name" label="快递公司" placeholder="" class="orderinput" @click="showChose" />
    <van-field v-model="order" label="快递单号" placeholder="请输入快递单号" class="orderinput"/>

    <van-button type="primary" class="findBtn" @click="toexpressDetai">查询</van-button>

    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :title="'选择公司'"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>

  </div>

</template>

<script>
  import { Button } from 'vant';
  import { Field } from 'vant';
  import { NavBar } from 'vant';
  import { Popup } from 'vant';
  import { Picker } from 'vant';
  import { gettracking } from '../../../common/api'

  export default {
    data () {
      return {
        show:false,
        name:"",
        order:"",
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        newcolumns:[],
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Field.name]: Field,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
      [Button.name]: Button,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      //显示选择快递公司
      showChose(){
        this.show = true;
        this.getexpress();
      },
      onCancel(){
        this.show = false;
      },
      //选择一个后
      onConfirm(picker, value, index) {
        this.name = picker;
        this.show = false;
      },
      toexpressDetai(){
        this.$router.push({ path: "/expressDetails" })
      },
      //获取用户信息
      getexpress(){
        gettracking()
        .then(res => {
          for(let index in res.data){
            this.newcolumns[index] = res.data[index].com
          }
          this.columns = this.newcolumns
        },(err => {
          console.log(err);
        }))
      },
    },
    created() {
      
    }
  }
</script>

<style scoped>
  .myinfo-container{
    overflow: hidden;
    width: 100vw;
  }
  .orderinput{
    border-bottom: 1px solid rgb(244, 244, 244);
  }
  .topblank{
    margin-top: 15vh;
  }
  .findBtn{
    width: 90vw;
    margin-left: 5vw;
    margin-top: 5vh;
  }

</style>