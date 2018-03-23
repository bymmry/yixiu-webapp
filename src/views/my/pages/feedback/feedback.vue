<template>
  <div class="myinfo-container">
    <van-nav-bar
      title="问题反馈"
      left-text="返回"
      fixed
      left-arrow
      @click-left="prepage"
    />
    <!-- 顶部留白 -->
    <div class="topblank"></div>

    <div class="messageTag">
      <!-- 信息标题 -->
      <div class="myinfo-title-container">
        <div class="myinfo-title">请选择问题类型</div>
        <van-tag plain type="primary" v-if="radio!=''">{{ radio }}</van-tag>
        <van-button size="small" @click="showChose"> + </van-button>
      </div>
      <div class="row-line"></div>

      <van-popup v-model="show" position="bottom">
        <van-radio-group v-model="radio" @change="closeShow">
          <van-cell-group>
            <label v-for="(item,index) in list" :for="item">
              <van-cell><van-radio :name="item" :id="item">{{item}}</van-radio></van-cell>
            </label>
            
          </van-cell-group>
        </van-radio-group>
      </van-popup>
      
      <textarea v-model='text' class="coverArea" placeholder="在这里描述您遇到的问题"></textarea>

    </div>

    <van-button size="large" type="primary" @click="output">提交</van-button>
  </div>

</template>

<script>
  import { NavBar,Button,Toast, Radio, RadioGroup, Popup, Cell, CellGroup, Tag } from 'vant'
  import { getuserinforByopenId } from '../../../common/api'

  export default {
    data () {
      return {
        id:"",
        show:false,
        list: ['功能意见', '界面意见', '性能问题', '网络问题', '新的需求', '其他问题'],
        radio: "",
        text:""
      }
    },
    components: {
      [Button.name]: Button,
      [NavBar.name]: NavBar,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Popup.name]: Popup,
      [Tag.name]: Tag,
      [Toast.name]: Toast,
    },
    methods: {
      //导航栏 前往个人中心
      prepage(){
        this.$router.push({ path: "/my" })
      },
      //获取用户信息
      async getUserinfo(userData){
        getuserinforByopenId(userData.wx.openid)
        .then(res => {
          this.id = res.data._id;
        },(err => {
          console.log(err);
        }))
      },
      showChose(){
        this.show=true;
      },
      closeShow(){
        this.show=false;
      },
      output(){
        if (this.radio=="") {
          Toast.fail('请选择问题类型');
        }else if (this.text=="") {
          Toast.fail('请输入问题描述');
        }else{
          Toast.loading({
            mask: true,
            message: '提交中...'
          });
          setTimeout(function(){
            Toast.success('提交成功');
          },1000)
        }
      }
    },
    created() {
      let userData = this.getUserInfo();

      this.getUserinfo(userData);
    }
  }
</script>

<style scoped>
  .myinfo-container{
    min-height: 90vh;
    padding: 2vh 3vw 5vh 3vw;
    background: #fff;
  }
  .topblank{
    margin-top: 45.6px;
  }
  .messageTag{
    padding: 3vh 4vw 4vh 4vw;
  }
  .myinfo-title-container{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    margin-bottom: 2vh;
    padding-left: 10px;
  }
  .myinfo-title{
    color: #727272;
    font-size: 4vw;
  }
  .myinfo-title-change{
    color: #139bff;
    font-size: 5vw;
  }
  .row-line{
    width: 100%;
    height: 0.3vh;
    margin-top: 15px;
    margin-bottom: 10px;
    background: #ecebeb;
  }
  .myinfo-message{
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .coverArea{
    width: 100%;
    min-height: 40vh;
    font-size: 14px;
    margin-top: 17px;
    line-height: 16px;
    overflow: auto;
    word-break: break-all;
    outline: none;
    user-select: text;
    white-space: pre-wrap;
    text-align: left;
    background: #fff;
    border: 1px solid rgb(224, 224, 224);
    z-index: 10;
    padding: 10px;
    box-sizing: border-box;
    &[contenteditable=true]{
      user-modify: read-write-plaintext-only;
      &:empty:before {
        content: attr(placeholder);
        display: block;
        color: #ccc;
      }
    }
  }
  .coverArea:focus{
    border-color: rgb(255, 103, 0);
  }

</style>