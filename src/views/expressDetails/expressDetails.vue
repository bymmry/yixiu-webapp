<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="物流详情"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <div>快递公司：{{emailData.company}}</div>
    <div>快递单号：{{emailData.no}}</div>
    
    <div>
      <list-area v-for="(list,index) in emailData.list" :list="list" :key="index"></list-area>
    </div>

  </div>

</template>

<script>
  import { NavBar } from 'vant';
  import { getemail } from '../common/api'
  import listArea from "./components/list"


  export default {
    data () {
      return {
        emailData:{
          company:"EMS",
          com:"ems",
          no:"1186465887499",
          status:"1",
          list:[
              {
                  datetime:"2016-06-15 21:44:04",
                  remark:"离开郴州市 发往长沙市【郴州市】",
                  zone:""
              },
              {
                  datetime:"2016-06-15 21:46:45",
                  remark:"郴州市邮政速递物流公司国际快件监管中心已收件（揽投员姓名：侯云,联系电话:）【郴州市】",
                  zone:""
              },
              {
                  datetime:"2016-06-16 12:04:00",
                  remark:"离开长沙市 发往贵阳市（经转）【长沙市】",
                  zone:""
              },
              {
                  datetime:"2016-06-17 07:53:00",
                  remark:"到达贵阳市处理中心（经转）【贵阳市】",
                  zone:""
              },
              {
                  datetime:"2016-06-18 07:40:00",
                  remark:"离开贵阳市 发往毕节地区（经转）【贵阳市】",
                  zone:""
              },
              {
                  datetime:"2016-06-18 09:59:00",
                  remark:"离开贵阳市 发往下一城市（经转）【贵阳市】",
                  zone:""
              },
              {
                  datetime:"2016-06-18 12:01:00",
                  remark:"到达 纳雍县 处理中心【毕节地区】",
                  zone:""
              },
              {
                  datetime:"2016-06-18 17:34:00",
                  remark:"离开纳雍县 发往纳雍县阳长邮政支局【毕节地区】",
                  zone:""
              },
              {
                  datetime:"2016-06-20 17:55:00",
                  remark:"投递并签收，签收人：单位收发章 *【毕节地区】",
                  zone:""
              }
          ]
        },
        finddata:{}
      }
    },
    components: {
      [NavBar.name]: NavBar,
      listArea
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.go(-1)
      },
      gettheemail(){
        getemail(this.finddata)
        .then(res => {
          console.log(res);
          this.emailData = res;
        },(err => {
          console.log(err);
        }))
      }
    },
    created() {
      this.finddata = this.$route.params.finddata;
      console.log(this.finddata)
      this.gettheemail();
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