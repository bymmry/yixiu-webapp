<template>
  <div class="questionBox-container">
    <!-- 内容部分 -->
    <div class="questionBox-content">
      <div class="tagBox">
        <div v-for="tag in this.question.tag" @click="searchBytag(tag)" class="tag" v-if="tag.length != 0">{{tag}}</div>
      </div>
      
      <div class="questionTitle">
        {{ question.title }}
      </div>
      <div class="questionContent">
        <!-- <img v-if="question.imgurl !== 0" :src="question.imgurl"> -->
        <div class="questionText" v-if="foldquestion != true" v-html="question.info"></div>
        <div class="questionText2" v-else v-html="question.info"></div>
      </div>
      <div class="foldquestionBtn" v-if="foldquestion != true" @click="changefoldquestion">展开问题描述 v</div>
      <div class="foldquestionBtn" v-else @click="changefoldquestion">收起问题描述 Λ</div>
      <div class="questionFooter">
        <div class="questionFooterLeft">
          <!-- <div>{{ question.followhuman ? question.followhuman : 0 }} 人关注&nbsp;·&nbsp;</div> -->
          <div>{{ question.replyCount }} 回复</div>
          <div class="money">赏金：{{ question.reward ? question.reward/100 : 0 }}元</div>
        </div>
        <div v-if="visitType==='my'">
          <van-button type="default" size="small" @click="changeQ">
            <van-icon name="passed" class="questionfollwi"/>
            修改问题
          </van-button>
        </div>
        <div v-else>
          <van-button type="default" size="small" v-if="question.folloed === true" @click="followQ">
            <van-icon name="passed" class="questionfollwi"/>
            已关注
          </van-button>
          <van-button type="primary" size="small" class="blueBtn" v-else @click="followQ">+&nbsp;关注问题</van-button>
        </div>
        
        
      </div>
    </div>
    <div class="addAnswer">
      <div class="answerOption AOline" @click="invitation">
        <van-icon name="contact" />邀请问答
      </div>
      <div class="answerOption" @click="newAnswer">
        <van-icon name="edit" />添加回答
      </div>
    </div>
    <!-- 底部的阴影 -->
    <div class="questionBox-shadow"></div>
  </div>
</template>

<script>
  //vant
  import { Button } from 'vant';
  import { Icon } from 'vant';
  import changequestion from './changequestion'
  export default {
    data(){
      return {
        visitType:"other",
        foldquestion: false,
      }
    },
    props: {
      question: Object //传入的单个提问块
    },
    components: {
      [Button.name]: Button,
      [Icon.name]: Icon,
      changequestion
    },
    methods: {
      //点击展开、折叠问题描述
      changefoldquestion () {
        this.foldquestion = !this.foldquestion;
      },
      //关注 or 取消关注 问题
      async followQ () {
        let result = await this.followQAjax();
        console.log(result)
        if (result === "no") {
          this.functionunavailable();
        }else {
          this.question.folloed = !this.question.folloed;
          if (this.question.folloed === true) {
            this.question.followhuman +=1;
          }else{
            this.question.followhuman -=1;
          }
        }
      },
      //关注 or 取消关注 的交互
      async followQAjax () {
        return "no";
      },
      //修改问题
      changeQ(){
        this.$router.push({ name: "changequestion", params:{oldquestion: this.question}});
      },
      //邀请问答
      async invitation() {
        if (this.question.state === 0) {
          const toast = this.$createToast({
            txt: '审核通过后才可使用',
            type: 'error',
            time: 1300
          })
          toast.show()
        }else if (this.question.state === 3) {
          const toast = this.$createToast({
            txt: '问题已关闭',
            type: 'error',
            time: 1300
          })
          toast.show()
        }else{
          this.functionunavailable()
        }
      },
      //新回答
      async newAnswer() {
        if (this.question.state === 0) {
          const toast = this.$createToast({
            txt: '审核通过后才可使用',
            type: 'error',
            time: 1300
          })
          toast.show()
        }else if (this.question.state === 3) {
          const toast = this.$createToast({
            txt: '问题已关闭',
            type: 'error',
            time: 1300
          })
          toast.show()
        }else{
          let userData = this.getUserInfo();
          if (userData) {
            this.$router.push({ name: "newanswer", params:{questionId: this.question._id}});
          }
        }
      },
      //点击标签进行搜索
      searchBytag(tag) {
        // console.log(tag)
        let tagSearch = {
          tag:[tag],
          // title:"",
          // desc:"",
          // info:"",
          state: [1,2],
          limit:10,
          skip:0
        }
        this.$router.push({ name: "search", params:{searchData: tagSearch}})
      }
    },
    created: function(){
      console.log(this.question);
      this.visitType = sessionStorage.getItem("visitType");
      if (this.visitType==="my") {
        this.$emit("type",this.visitType)
      }
    }
  }
</script>

<style scoped>
  .questionBox-container{
    position: relative;
    padding: 8.6px 0;
    padding-bottom: 0;
    border-top: 0.1vh solid #e0deec;
    border-bottom: 0.1vh solid #e0deec;
    background: #fff;
  }
  .questionBox-content{
    position: relative;
    padding: 0 4vw;
  }
  .questionBox-shadow{
    position: absolute;
    left: 0;
    bottom: 1px;
    width: 100%;
    height: 1px;
    -moz-box-shadow:0vw 1vh 4vw #b6baba; 
    -webkit-box-shadow:0vw 1vh 4vw #b6baba; 
    box-shadow:0vw 1vh 4vw #b6baba;
  }
  .questionContent img{
    display: block;
    max-height: 34.5vh;
    max-width: 100%;
    margin:0 auto;
    margin-bottom: 1.5vh;
  }
  .questionTitle{
    font-size: 5vw;
    line-height: 6vw;
    margin-bottom: 3.9vw;
    font-weight: 700;
    color: #1c1c1c;
  }
  .questionTitle-hidden{
    width: 4.5vw;
    height: 6vw;
    position: absolute;
    right: 4vw;
    margin-top: -8.1vw;
    background: #fff;
    z-index: 100;
  }
  .questionContent-hidden{
    width: 4.5vw;
    height: 6vw;
    position: absolute;
    right: -0.7vw;
    margin-top: -6vw;
    background: #fff;
    z-index: 100;
  }
  .questionText{
    font-size: 4vw;
    line-height: 5.5vw;
    max-height: 88px;
    color: #404040;
    white-space:nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .questionText2{
    font-size: 4vw;
    line-height: 5.5vw;
    color: #404040;
  }
  .questionText >>> img,
  .questionText2 >>> img{
    max-width: 100%;
    max-height: 60vh;
    display: block;
    margin: 0 auto;
  }
  .foldquestionBtn{
    display: inline-block;
    margin-top: 1.6vh;
    margin-left: 1.4vw;
    font-size: 4vw;
    color: #979797;
  }
  .questionFooter{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 2.8vh;
    margin-bottom: 2.1vh;
    font-size: 4vw;
    color: #919191;
  }
  .questionFooterLeft{
    display: flex;
    flex-direction: row;
  }
  .blueBtn{
    background-color: #0086ff;
    border: 1px solid #317bcd;
  }
  .addAnswer{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    min-height: 48.6px;
    width: 100%;
    border-top: 0.2vw solid #e8e8e8;
  }
  .answerOption{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
    padding: 3vh 0;
    text-align: center;
  }
  .answerOption i{
    margin-right: 1vw;
  }
  .AOline{
    border-right: 0.2vw solid #e8e8e8;
  }
  .tagBox{
    display: flex;
    flex-direction:row;
    padding-bottom: 11.5px;
  }
  .tag{
    padding: 6.7px 8px;
    background: rgb(229, 242, 255);
    border-radius: 10px;
    color: #588D9C;
    margin-right: 8px;
    font-size: 4vw;
  }
  .money{
    margin-left: 7px;
  }
</style>