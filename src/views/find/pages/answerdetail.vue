<template>
  <div class="answer-container">
    <van-nav-bar
      fixed
      style="z-index:100"
      class="titleshadow"
    >
      <div slot="left" @click="prepage" class="prepage">
        <sicon name="find-leftArr" scale="1.7"></sicon>
        返回
      </div>
      <div slot="title" class="detailTitle">{{ answerdetail.father }}</div>
      </van-search>
    </van-nav-bar>
    
    <topNav></topNav>

    <div class="answercontent" v-html="answerdetail.content">
    
    </div>

    <div class="answerend">该文发表与&nbsp;--&nbsp;{{ createdtime }}</div>

    <div class="answerFooter">
      <div class="supportArea">
        <div class="supportBtn" @click="clickSupport(answerdetail._id)" v-if="like===false">
          <sicon name="find-support" scale="1.7"></sicon>
          {{ answerdetail.like }}
        </div>
        <div class="supportBtn liked" disabled v-else>
          <sicon name="find-support" scale="1.7"></sicon>
          {{ answerdetail.like }}
        </div>
        <div class="supportBtn" @click="clickUnSupport">
          <sicon name="find-unsupport" scale="1.7"></sicon>
          0
        </div>
        
      </div>
      <div class="otherBtn">
        <div class="funcBtn" @click="clickCollect">
          <sicon name="my-collect" scale="2"></sicon>
          收藏
        </div>
        <div class="funcBtn" @click="seereply">
          <sicon name="find-talk" scale="2"></sicon>
          <div>{{ answerdetail.comment }}</div>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
  //vant
  import { NavBar } from 'vant';
  import topNav from "../components/topNav";
  import { likethis } from '../../common/api'

  export default {
    data(){
      return {
        createdtime:"", //发表时间
        like:false,
        answerdetail:{
          //{
            // _id: "",   //该回复的id
            // question: "",  //该问题的id
            // content:"",    //回答的内容
            // author:"",     //回答人的id
            // adopt:false,   //该回答是否被采纳
            // reply:[],    //该回答的子评论
            // createdAt: 0  //创建时间  时间戳
            // father:"",  问题的题目
            // like:0      点赞数
            // comment: 0   //子评论数，基于reply的长度
          //}
        }
      }
    },
    components: {
      [NavBar.name]: NavBar,
      topNav
    },
    methods: {
      prepage(){
        this.$router.go(-1)
      },
      //点击不支持
      clickUnSupport(){
        this.functionunavailable();
      },
      //点击支持
      clickSupport(id){
        const toast = this.$createToast({
          mask: true,
          message: '加载中...'
        })
        toast.show();
        likethis(id)
        .then(res => {
          toast.hide();
          const tip = this.$createToast({
            txt: 'you like it!',
            type: 'success',
            time: 1300
          })
          //使用show调出方法
          tip.show()
          this.like = true;
          this.answerdetail.like += 1;
        },(err => {
          console.log(err);
        }))
      },
      //点击收藏
      clickCollect(){
        this.functionunavailable();
      },
      //查看回复
      seereply(){
        let answerData = this.answerdetail;
        answerData = JSON.stringify(answerData);
        sessionStorage.setItem("answerData", answerData);

        this.$router.push({ name: "reply" })

        // this.$router.push({ name: "reply", params:{ answerData, answerData }})
      },
      //时间戳转换
      datestr(x,y) {
        var z ={y:x.getFullYear(),M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
        return y.replace(/(y+|M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-(v.length>2?v.length:2))});
      },
    },
    created:function(){
      this.answerdetail = this.$route.params.answerData;
      let Time = new Date();  
      Time.setTime(this.answerdetail.createdAt * 1000); 
      this.createdtime = this.datestr(Time,"yyyy.MM.d");

      this.answerdetail.comment = this.answerdetail.reply.length ? this.answerdetail.reply.length :0
      console.log(this.answerdetail)
    },
  }
</script>

<style scoped>
  .prepage{
    display: flex;
    flex-direction: row;
    align-items:center;
    width: 16vw;
    color: rgb(98, 164, 255);
    margin-left: -2vw;
  }
  .answer-container{
    /*min-height: 80vh;*/
    margin-bottom: 10vh;
  }
  .titleshadow{
    -moz-box-shadow:0vw -0.5vh 3vw #b6baba; 
    -webkit-box-shadow:0vw -0.5vh 3vw #b6baba; 
    box-shadow:0vw -0.5vh 3vw #b6baba;
  }
  .detailTitle{
    display: inline-block;
    width: 60vw;
    color: #646464;
    white-space:nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .answercontent{
    padding: 3.2vh 3.2vw;
    /*width: 93.6vw;*/
  }
  .answercontent >>> img{
    display: block;
    max-width: 93.6vw;
  }
  .answerFooter{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 27px;
    border-top: 0.3vw solid #ebebeb;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .supportArea{
    display: flex;
    justify-content:center;
    width: 50%;
  }
  .supportBtn{
    margin-right: 2vw;
    display: flex;
    flex-direction: row;
    align-items:center;
    padding: 1.9vh 2vw;
    border-radius: 4px;
    background: #ebebeb;
    color: #999;
  }
  .supportBtn svg{
    display: inline-block;
    margin-right: 2vw;
  }
  .otherBtn{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items:center;
  }
  .funcBtn{
    display: flex;
    justify-content:center;
    flex-direction: column;
    align-items:center;
    margin-left: 6.8vw;
    font-size: 4vw;
    color: #333;
  }
  .funcBtn svg{
    margin-bottom: 0.6vh;
  }
  .liked{
    background: #FF8264;
    color: #fff;
  }
  .answerend{
    float: right;
    margin-right: 10px;
    margin-top: 30px;
    font-size: 13px;
  }
</style>