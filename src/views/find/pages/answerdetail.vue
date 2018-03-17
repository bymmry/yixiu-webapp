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

    <div class="answerend">该文发表于&nbsp;--&nbsp;{{ createdtime }}</div>

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
        <div class="funcBtn" @click="clickAdopt" v-if="answerdetail.choseA === true">
          <sicon name="find-adopt" scale="2"></sicon>
          采纳
        </div>
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
    
    <van-popup v-model="popupshow" class="popup">
      <div class="popupTitle">确定采纳这个答案？</div>
      <div class="popupBtn">
        <van-button type="primary" @click="popupChoseNO">否</van-button>
        <van-button type="danger" @click="popupChoseYES">是</van-button>
      </div>
      
    </van-popup>

  </div>
</template>

<script>
  //vant
  import { NavBar,Toast,Button,Popup } from 'vant';
  import topNav from "../components/topNav";
  import { likethis,adoptThis  } from '../../common/api'

  export default {
    data(){
      return {
        popupshow: false,
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
            // comment: 0   //子评论数,基于reply的长度
          //}
        }
      }
    },
    components: {
      [NavBar.name]: NavBar,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Toast.name]: Toast,
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
        const toast = Toast.loading({
          mask: true,
          message: '加载中...'
        });
        likethis(id)
        .then(res => {
          toast.clear();
          Toast.success('you like it!');
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
      //采纳答案
      clickAdopt(){
        this.popupshow = true;
      },
      //取消采纳
      popupChoseNO(){
        this.popupshow = false;
      },
      //采纳
      popupChoseYES(){
        const toast = this.$createToast({
          time: 0,
          txt: '正在采纳'
        })
        toast.show();
        let choseData = {
          question: this.answerdetail.question,  //问题的_id
          _id: this.answerdetail._id   //回复数据的id
        }
        // console.log(choseData)
        adoptThis(choseData)
        .then(res => {
          toast.hide()
          if (res.errMsg=="问题已经采纳过回复,请勿重复采纳") {
            const tip = this.$createToast({
              txt: '一个问题只能采纳一个回答！',
              type: 'fail',
              time: 1300
            })
            tip.show()
          }else{
            const tip = this.$createToast({
              txt: '采纳成功!',
              type: 'correct',
              time: 1300
            })
            tip.show()
            setTimeout(() => {
              this.$router.push({ path: "/find/questiondetail"})
            },1600)
          }          
        },(err => {
          console.log(err);
          const tip = this.$createToast({
            txt: '采纳失败!',
            type: 'fail',
            time: 1000
          })
          tip.show()
        }))
      },
    },
    created:function(){
      document.body.scrollTop = 0;
      this.answerdetail = this.$route.params.answerData;
      let Time = new Date();  
      Time.setTime(this.answerdetail.createdAt * 1000); 
      this.createdtime = this.datestr(Time,"yyyy.MM.d");

      for(let index in this.answerdetail.image){
        this.answerdetail.content = this.answerdetail.content.concat(`<img src='${this.answerdetail.image[index]}'>`)
      }

      this.answerdetail.comment = this.answerdetail.reply.length ? this.answerdetail.reply.length : 0;

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
    margin-bottom: 10vh;
    /*padding-top: 30px;*/
    padding-bottom: 15vh;
    overflow: hidden;
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
    padding: 3.2vh 7.2vw;
    /*width: 93.6vw;*/
  }
  .answercontent >>> img{
    display: block;
    max-width: 80%;
    max-height: 60vh;
    margin: 15px auto;
  }
  .answerFooter{
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items:center;
    justify-content:center;
    width: 94%;
    height: 27px;
    border-top: 0.3vw solid #ebebeb;
    padding: 2vh 3vw 2vh 3vw;
    background: #fff;
    z-index: 100;
  }
  .supportArea{
    display: flex;
    /*justify-content:center;*/
    padding-left: 10px;
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
    margin-right: 14px;
    margin-top: 30px;
    font-size: 13px;
  }
  .popup{
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    width: 80%;
    height: 30%;
  }
  .popupBtn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .popupTitle{
    margin-bottom: 3vh;
  }
  .popupBtn{
    width: 80%;
  }
  .popupBtn button{
    width: 40%;
  }
</style>